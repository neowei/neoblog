var c = require('../config.js');
// var c = new config();

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var nano = require('gulp-cssnano');
var gzip = require('gulp-gzip');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');

var buildscss = function(project) {
    var destpath = c.csspath + project;
    var buildscss = c.buildscss + project + '/main_' + c.environment + '.scss';
    if (c.isdev) {
        return gulp.src(buildscss).pipe(sass()).pipe(autoprefixer({
            browsers : [ 'last 2 versions' ],
            cascade : false
        })).pipe(sourcemaps.init()).pipe(concat('main.css')).pipe(gulp.dest(destpath)).pipe(rename({
            suffix : '.min'
        })).pipe(nano()).pipe(sourcemaps.write('.')).pipe(gulp.dest(destpath)).pipe(notify({
            message : "build-scss task filename: <%= file.relative %> complete "
        }));
    } else if (c.istest) {
        return gulp.src(buildscss).pipe(sass()).pipe(autoprefixer({
            browsers : [ 'last 2 versions' ],
            cascade : false
        })).pipe(sourcemaps.init()).pipe(concat('main.css')).pipe(gulp.dest(destpath)).pipe(rename({
            suffix : '.min'
        })).pipe(nano()).pipe(sourcemaps.write('.')).pipe(gulp.dest(destpath)).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        }));
    } else if (c.isprod) {
        return gulp.src(buildscss).pipe(sass()).pipe(autoprefixer({
            browsers : [ 'last 2 versions' ],
            cascade : false
        })).pipe(concat('main.css')).pipe(gulp.dest(destpath)).pipe(rename({
            suffix : '.min'
        })).pipe(nano()).pipe(gulp.dest(destpath)).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        }));
    }
}
gulp.task('build-scss', function() {
    if (c.iswatch) {
        gulp.watch(c.watchscss, function(e) {
            if (e.path.indexOf('www_m') > 10) {
                buildscss('www_m').pipe(livereload());
            } else if (e.path.indexOf('www') > 10) {
                buildscss('www').pipe(livereload());
            } else if (e.path.indexOf('backend') > 10) {
                buildscss('backend').pipe(livereload());
            }
        });
    }
    buildscss('www');
    buildscss('backend');
    buildscss('www_m');
});

gulp.task('build-csslib', [ 'build-scss' ], function() {
    gulp.src(c.buildcsslib).pipe(autoprefixer()).pipe(gulpif(!c.isprod, sourcemaps.init())).pipe(concat('neowei-style.css')).pipe(gulp.dest(c.csspath)).pipe(rename({
        suffix : '.min'
    })).pipe(nano()).pipe(gulpif(!c.isprod, sourcemaps.write('.'))).pipe(gulp.dest(c.csspath)).pipe(gulpif(c.isprod || c.istest, gzip({
        gzipOptions : {
            level : 9
        }
    }))).pipe(gulp.dest(c.csspath)).pipe(gulpif(c.isdev, notify({
        message : 'build-css task filename: <%= file.relative %> complete'
    })));
});
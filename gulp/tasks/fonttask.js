var c = require('../config.js');
// var c = new config();

var gulp = require('gulp');
var gulpif = require('gulp-if');
var gzip = require('gulp-gzip');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var buildfont = function(srcpath, isbuild) {
    var destpath = isbuild === true ? c.fontpath : c.getDestpath('fonts', srcpath);
    if (c.isdev) {
        return gulp.src(srcpath).pipe(gulp.dest(destpath)).pipe(notify({
            message : 'build-font task filename: <%= file.relative %> complete'
        })).pipe(livereload());
    } else if (c.istest || c.isprod) {
        return gulp.src(srcpath).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        })).pipe(gulp.dest(destpath));
    }
};
gulp.task('build-font', function() {
    if (c.iswatch) {
        gulp.watch(c.watchfont, function(e) {
            buildfont(e.path, false).pipe(livereload());
        });
    }
    buildfont(c.buildfont, true);
});

gulp.task('build-fontlib', function() {
    gulp.src(c.buildfontlib).pipe(gulp.dest(c.fontpath)).pipe(gulpif(c.isprod || c.istest, gzip({
        gzipOptions : {
            level : 9
        }
    }))).pipe(gulpif(c.isprod || c.istest, gulp.dest(c.fontpath))).pipe(gulpif(c.isdev, notify({
        message : 'build-fontlib task filename: <%= file.relative %> complete'
    })));
});
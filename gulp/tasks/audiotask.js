var c = require('../config.js');
// var c = new config();

var gulp = require('gulp');
var gulpif = require('gulp-if');
var gzip = require('gulp-gzip');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var buildaudio = function(srcpath, isbuild) {
    var destpath = isbuild === true ? c.audiopath : c.getDestpath(srcpath, c.audiopath, '/src/audio/');
    if (c.isdev) {
        return gulp.src(srcpath).pipe(gulp.dest(c.audiopath)).pipe(notify({
            message : 'build-audio task filename: <%= file.relative %> complete'
        }));
    } else if (c.istest || c.isprod) {
        return gulp.src(srcpath).pipe(gulp.dest(c.audiopath)).pipe(gulp.dest(c.audiopath)).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        })).pipe(gulp.dest(c.audiopath));
    }
};
gulp.task('build-audio', function() {
    if (c.iswatch) {
        gulp.watch(c.watchaudio, function(e) {
            buildaudio(e.path, false).pipe(livereload());
        });
    }
    buildaudio(c.buildaudio, true);
});

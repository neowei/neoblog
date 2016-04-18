var c = require('../config.js');
//var c = new config();

var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
    return gulp.src([ c.csspath, c.jspath, c.imgpath, c.fontpath, c.audiopath ], {
        read : false
    }).pipe(rimraf({
        force : true
    })).pipe(notify({
        message : 'clean task complete'
    }));
});

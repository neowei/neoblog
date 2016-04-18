var c = require('../config.js');
// var c = new config();

var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var buildimg = function(srcpath, isbuild) {
    var destpath = isbuild === true ? c.imgpath : c.getDestpath('images', srcpath);
    if (c.isdev) {
        return gulp.src(srcpath).pipe(gulp.dest(destpath)).pipe(notify({
            message : 'build-img task filename: <%= file.relative %> complete'
        }));
    } else if (c.istest || c.isprod) {
        return gulp.src(srcpath).pipe(imagemin({
            optimizationLevel : 9,
            progressive : true,
            interlaced : true
        })).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        })).pipe(gulp.dest(destpath));
    }
};

gulp.task('build-img', function() {
    if (c.iswatch) {
        gulp.watch(c.watchimg, function(e) {
            buildimg(e.path, false).pipe(livereload());
        });
    }
    return buildimg(c.buildimg, true);
});
var c = require('../config.js');
// var c = new config();

var gulp = require('gulp');
var htmlhint = require("gulp-htmlhint");
var livereload = require('gulp-livereload');

var buildhtml = function(srcpath) {
    return gulp.src(srcpath).pipe(htmlhint('.htmlhintrc')).pipe(htmlhint.reporter());
};
gulp.task('build-html', function() {
    if (c.iswatch) {
        gulp.watch(c.viewpath, function(e) {
            gulp.src(e.path).pipe(livereload());
        });
        gulp.watch(c.watchhtml, function(e) {
            gulp.src(e.path).pipe(htmlhint('.htmlhintrc')).pipe(htmlhint.reporter());
        });
    }
    buildhtml(c.buildhtml);
});
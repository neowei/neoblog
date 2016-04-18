var gulp = require('gulp-help')(require('gulp'));
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
// var $ = require('gulp-load-plugins')();

require('./gulp/tasks/csstask.js');
require('./gulp/tasks/jstask.js');
require('./gulp/tasks/imgtask.js');
require('./gulp/tasks/fonttask.js');
require('./gulp/tasks/audiotask.js');
require('./gulp/tasks/othertask.js');
require('./gulp/tasks/htmltask.js');

function errrHandler(e) {
    // 控制台发声,错误时beep一下
    gutil.beep();
    gutil.log(e);
}

var gulptask = function() {
    gulp .pipe( plumber( errorHandler: errrHandler ) ).start('build-html', 'build-csslib', 'build-scss', 'build-jslib', 'build-js', 'build-img', 'build-font', 'build-fontlib', 'build-audio');
};
gulp.task('development-watch', [], function() {
    gulptask();
    livereload.listen();
});

gulp.task('development', [ 'clean' ], gulptask);

gulp.task('production', [ 'clean' ], gulptask);

gulp.task('testing', [ 'clean' ], gulptask);


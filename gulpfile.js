var gulp = require('gulp-help')(require('gulp'));
var livereload = require('gulp-livereload');

require('./gulp/tasks/csstask.js');
require('./gulp/tasks/jstask.js');
require('./gulp/tasks/imgtask.js');
require('./gulp/tasks/fonttask.js');
require('./gulp/tasks/audiotask.js');
require('./gulp/tasks/othertask.js');
require('./gulp/tasks/htmltask.js');

var gulptask = function() {
    gulp.start('build-csslib', 'build-scss', 'build-jslib', 'build-js', 'build-img', 'build-font', 'build-fontlib', 'build-audio');
    //'build-html', 
};

gulp.task('development-watch', [], function() {
    gulptask();
    livereload.listen();
});

gulp.task('development', [ 'clean' ], gulptask);

gulp.task('production', [ 'clean' ], gulptask);

gulp.task('testing', [ 'clean' ], gulptask);


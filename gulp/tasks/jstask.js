var c = require('../config.js');
// var c = new config();

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var gzip = require('gulp-gzip');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var path = require("path");
var fs = require("fs");

var buildjs = function(srcpath, isbuild) {
    var destpath = isbuild === true ? c.jspath : c.getDestpath('js', srcpath);
    if (c.isdev) {
        return gulp.src(srcpath).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(destpath)).pipe(rename({
            suffix : '.min'
        })).pipe(sourcemaps.init()).pipe(uglify()).pipe(gulp.dest(destpath)).pipe(sourcemaps.write('.', {
            includeContent : true
        })).pipe(gulp.dest(destpath)).pipe(notify({
            message : 'build-js task filename: <%= file.relative %> complete'
        }));
    } else if (c.istest) {
        return gulp.src(srcpath).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(beautify({
            indentSize : 2
        })).pipe(gulp.dest(destpath)).pipe(rename({
            suffix : '.min'
        })).pipe(sourcemaps.init()).pipe(uglify()).pipe(sourcemaps.write('.', {
            includeContent : true
        })).pipe(gulp.dest(destpath)).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        })).pipe(gulp.dest(destpath));
    } else if (c.isprod) {
        return gulp.src(srcpath).pipe(rename({
            suffix : '.min'
        })).pipe(uglify()).pipe(gulp.dest(destpath)).pipe(gzip({
            gzipOptions : {
                level : 9
            }
        })).pipe(gulp.dest(destpath));
    }
};
gulp.task('build-js', function() {
    if (c.iswatch) {
        gulp.watch(c.watchjs, function(e) {
            buildjs(e.path, false).pipe(livereload());
        });
    }
    buildjs(c.buildjs, true);
});
 
gulp.task('build-jslib', function() {
    var buildjslib = function(buildpath, filename) {
        gulp.src(buildpath).pipe(gulpif(!c.isprod, sourcemaps.init())).pipe(concat(filename)).pipe(gulpif(!c.isprod, gulp.dest(c.jspath))).pipe(rename({
            suffix : '.min'
        })).pipe(uglify()).pipe(gulpif(!c.isprod, sourcemaps.write('.'))).pipe(gulp.dest(c.jspath)).pipe(gulpif(!c.isdev, gzip({
            gzipOptions : {
                level : 9
            }
        }))).pipe(gulpif(!c.isdev, gulp.dest(c.jspath))).pipe(gulpif(c.isdev, notify({
            message : 'build-jslib task filename: <%= file.relative %> complete'
        })));
    };
    // buildjslib(c.buildjsframeworkmobile, 'egobus-framework-mobile.js');
    buildjslib(c.buildjsframework, 'egobus-framework.js');
    buildjslib(c.buildjscommon, 'egobus-common.js');
});

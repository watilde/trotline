var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var watch  = require('gulp-watch');
var path   = './lib/*.js';

gulp.task('watch', function() {
  gulp.watch(path, ['test']);
});

gulp.task('test', function() {
  return gulp.src(path)
    .pipe(jshint());
});

gulp.task('default', ['test', 'watch']);

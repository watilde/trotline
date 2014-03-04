var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var watch  = require('gulp-watch');
var yuidoc = require("gulp-yuidoc");

var path   = {
  main: ['./lib/main.js', './lib/trotline/*.js']
};

gulp.task('test', function() {
  return gulp.src(path.main)
    .pipe(jshint());
});

gulp.task('docs', function() {
  return gulp.src(path.main)
    .pipe(yuidoc())
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['test', 'docs']);

gulp.task('watch', function() {
  gulp.watch(path.main, ['build']);
});

gulp.task('default', ['build', 'watch']);

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var watch  = require('gulp-watch');

gulp.task('default', function() {
  gulp.src('./lib/*.js')
    .pipe(watch())
    .pipe(jshint());
});

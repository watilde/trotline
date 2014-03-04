var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var watch  = require('gulp-watch');
var yuidoc = require("gulp-yuidoc");
require('gulp-grunt')(gulp);

var path   = {
  main: ['./lib/main.js', './lib/trotline/*.js']
};

// Test
gulp.task('test', function() {
  return gulp.src(path.main)
    .pipe(jshint());
});

// Create docs using yuidoc
gulp.task('docs', function() {
  return gulp.src(path.main)
    .pipe(yuidoc())
    .pipe(gulp.dest('./docs'));
});

// Push using grunt-gh-pages
gulp.task('gh-pages', function (cb) {
  gulp.run('grunt-gh-pages', cb);
});

gulp.task('build', ['test', 'docs']);
gulp.task('deploy', ['build', 'gh-pages']);

gulp.task('watch', function() {
  gulp.watch(path.main, ['build']);
});

gulp.task('default', ['build', 'watch']);

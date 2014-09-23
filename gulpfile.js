var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var watch  = require('gulp-watch');
var yuidoc = require("gulp-yuidoc");
var clean  = require('gulp-clean');
require('gulp-grunt')(gulp);

var path = {
  main: ['./lib/*.js', './lib/trotline/*.js'],
  docs: './docs'
};

gulp.task('foo', function() {
  console.log(gulp.src('https://google.com'));
});
// Test
gulp.task('test', function() {
  return gulp.src(path.main)
    .pipe(jshint());
});

// Clean
gulp.task('clean', function() {
  return gulp.src(path.docs, {read: false})
    .pipe(clean());
});

// Create docs using yuidoc
gulp.task('docs', function() {
  return gulp.src(path.main)
    .pipe(yuidoc())
    .pipe(gulp.dest(path.docs));
});

// Push using grunt-gh-pages
gulp.task('gh-pages', function (cb) {
  gulp.run('grunt-gh-pages', cb);
});


// Command Line Interfaces
gulp.task('build', ['test', 'clean', 'docs']);
gulp.task('deploy', ['build', 'gh-pages']);
gulp.task('watch', function() {
  gulp.watch(path.main, ['build']);
});
gulp.task('default', ['build', 'watch']);

var gulp   = require('gulp');
 gutil = require('gulp-util');
gulp.task('html', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dest/html'));


});
gulp.task('css', function() {
  return gulp.src('src/css/*.css')
  .pipe(gulp.dest('dest/css'));
});
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('dest/js'));
});
gulp.task('default',["html","css","js"],function() {
  return gutil.log('Gulp is running!')
});

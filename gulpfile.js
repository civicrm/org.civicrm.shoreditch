var gulp = require('gulp');
var bulk = require('gulp-sass-bulk-import');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('scss/*.scss')
    .pipe(bulk())
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['vendor/']
    }).on('error', sass.logError))
    .pipe(rename(function (path) {
        path.basename = 'bootstrap-civicrm-' + path.basename;
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);;

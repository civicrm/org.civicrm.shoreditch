var gulp = require('gulp');
var bulk = require('gulp-sass-bulk-import');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
// The "postcss-prefix-selector" uses ES6 promises
require('es6-promise').polyfill();
// Used to add necessary prefixes at the css level
var postcssPrefix = require('postcss-prefix-selector');
// Used to remove duplicated css rules
var postcssDiscardDuplicates = require('postcss-discard-duplicates');

gulp.task('sass-bootstrap', function () {
  gulp.src('scss/bootstrap/bootstrap.scss')
    .pipe(bulk())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('css/'));
});

gulp.task('sass-civicrm', function () {
  gulp.src('scss/civicrm/civicrm.scss')
    .pipe(bulk())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([postcssPrefix({
      prefix: '.crm-container ',
      exclude: [/page-civicrm/, /crm-container/]
    }), postcssDiscardDuplicates]))
    .pipe(gulp.dest('css/'));
});

gulp.task('sass', ['sass-bootstrap', 'sass-civicrm']);

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

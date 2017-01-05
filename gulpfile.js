var gulp = require('gulp');
var bulk = require('gulp-sass-bulk-import');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var stripCssComments = require('gulp-strip-css-comments');
// The "postcss-prefix-selector" uses ES6 promises
require('es6-promise').polyfill();
// Used to add necessary prefixes at the css level
var postcssPrefix = require('postcss-prefix-selector');
// Used to remove duplicated css rules
var postcssDiscardDuplicates = require('postcss-discard-duplicates');

gulp.task('sass-bootstrap', function (next) {
  gulp.src('scss/bootstrap/bootstrap.scss')
    .pipe(bulk())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(gulp.dest('css/')).on('end', next);
});

gulp.task('sass-civicrm', function (next) {
  gulp.src('scss/civicrm/custom-civicrm.scss')
    .pipe(bulk())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([postcssPrefix({
      prefix: '.crm-container ',
      exclude: [/page-civicrm/, /crm-container/, /civicrm-menu/, /#root-menu-div/]
    }), postcssDiscardDuplicates]))
    .pipe(gulp.dest('css/')).on('end', next);
});

gulp.task('sass', ['sass-bootstrap', 'sass-civicrm']);

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

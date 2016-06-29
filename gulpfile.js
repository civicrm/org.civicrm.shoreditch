require('es6-promise').polyfill();
var gulp = require('gulp');
var bulk = require('gulp-sass-bulk-import');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
// Used to add necessary prefixes at the css level
var postcssPrefix = require('postcss-prefix-selector');
// Used to remove duplicated css rules
var postcssDiscardDuplicates = require('postcss-discard-duplicates');

gulp.task('sass', function () {
  gulp.src('scss/style.scss')
    .pipe(bulk())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename(function (path) {
      path.basename = 'bootstrap-civicrm-' + path.basename;
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('global-sass', function () {
  gulp.src('scss/global-theme-overrides/global-custom.scss')
    .pipe(bulk())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(rename(function (path) {
      path.basename = 'global-custom';
    }))
    .pipe(postcss([postcssPrefix({
      prefix: '.crm-container ',
      exclude: [/ui-dialog/, /ui-datepicker/, /select2/, /logged-in/, /cke/, // absolute positioned elements
        /^\.crm-container/] // avoid repeating the namespace
    }), postcssDiscardDuplicates]))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

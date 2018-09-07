var gulp = require('gulp');
var bulk = require('gulp-sass-glob');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssPrefix = require('postcss-prefix-selector');
var postcssDiscardDuplicates = require('postcss-discard-duplicates');
var stripCssComments = require('gulp-strip-css-comments');
var transformSelectors = require('gulp-transform-selectors');
var civicrmScssRoot = require('civicrm-scssroot')();

var bootstrapNamespace = '#bootstrap-theme';
var outsideNamespaceRegExp = /^\.___outside-namespace/;

gulp.task('sass:sync', civicrmScssRoot.update);

gulp.task('sass:bootstrap', gulp.series('sass:sync', function buildBootstrapCSS () {
  return gulp.src('scss/bootstrap/bootstrap.scss')
    .pipe(bulk())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: civicrmScssRoot.getPath(),
      precision: 10
    }).on('error', sass.logError))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(postcss([postcssPrefix({
      prefix: bootstrapNamespace + ' ',
      exclude: [/^html/, /^body/, /\.ta-hidden-input/, outsideNamespaceRegExp]
    })]))
    .pipe(transformSelectors(namespaceRootElements, { splitOnCommas: true }))
    .pipe(transformSelectors(removeOutsideNamespaceMarker, { splitOnCommas: true }))
    .pipe(gulp.dest('css/'));
}));

gulp.task('sass:civicrm', gulp.series('sass:sync', function buildCiviCRMCSS () {
  return gulp.src('scss/civicrm/custom-civicrm.scss')
    .pipe(bulk())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: civicrmScssRoot.getPath(),
      precision: 10
    }).on('error', sass.logError))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(postcss([postcssPrefix({
      prefix: '.crm-container ',
      exclude: [/^body/, /popover/, /tooltip/, /page-civicrm/, /crm-container/,
        /ui-datepicker/, /civicrm-menu/, /#root-menu-div/, /jstree-contextmenu/,
        outsideNamespaceRegExp]
    }), postcssDiscardDuplicates]))
    .pipe(transformSelectors(removeOutsideNamespaceMarker, { splitOnCommas: true }))
    .pipe(gulp.dest('css/'));
}));

gulp.task('sass', gulp.parallel('sass:bootstrap', 'sass:civicrm'));

gulp.task('watch', function () {
  gulp.watch(civicrmScssRoot.getWatchList(), gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('sass'));

/**
 * Apply the namespace on html and body elements
 *
 * @param  {string} selector the current selector to be transformed
 * @return string
 */
function namespaceRootElements (selector) {
  var regex = /^(body|html)/;

  if (regex.test(selector)) {
    selector = selector.replace(regex, function (match) {
      return match + bootstrapNamespace;
    }) + ',\n' + selector.replace(regex, bootstrapNamespace);
  }

  return selector;
}

/**
 * Deletes the special class that was used as marker for styles that should
 * not be nested inside the bootstrap namespace from the given selector
 *
 * @param  {String} selector
 * @return {String}
 */
function removeOutsideNamespaceMarker (selector) {
  return selector.replace(outsideNamespaceRegExp, '');
}

const gulp = require('gulp');
const argv = require('yargs').argv;
const PluginError = require('plugin-error');

// sass
{
  const bulk = require('gulp-sass-glob');
  const sass = require('gulp-sass');
  const postcss = require('gulp-postcss');
  const postcssPrefix = require('postcss-prefix-selector');
  const postcssDiscardDuplicates = require('postcss-discard-duplicates');
  const stripCssComments = require('gulp-strip-css-comments');
  const transformSelectors = require('gulp-transform-selectors');
  const civicrmScssRoot = require('civicrm-scssroot')();

  const bootstrapNamespace = '#bootstrap-theme';
  const outsideNamespaceRegExp = /^\.___outside-namespace/;

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
      .pipe(postcss([
        postcssPrefix({
          prefix: `${bootstrapNamespace} `,
          exclude: [
            /^html/, /^body/, /\.popover/, /\.tooltip/, /\.ta-hidden-input/,
            outsideNamespaceRegExp
          ]
        })
      ]))
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
      .pipe(postcss([
        postcssPrefix({
          prefix: '.crm-container ',
          exclude: [
            /^body/, /page-civicrm/, /crm-container/, /ui-datepicker/, /civicrm-menu/,
            /#root-menu-div/, /jstree-contextmenu/, outsideNamespaceRegExp]
        }),
        postcssDiscardDuplicates
      ]))
      .pipe(transformSelectors(removeOutsideNamespaceMarker, { splitOnCommas: true }))
      .pipe(gulp.dest('css/'));
  }));

  gulp.task('sass', gulp.parallel('sass:bootstrap', 'sass:civicrm'));

  gulp.task('watch', () => {
    gulp.watch(civicrmScssRoot.getWatchList(), gulp.parallel('sass'));
  });

  /**
   * Apply the namespace on html and body elements
   *
   * @param  {String} selector the current selector to be transformed
   * @return {String}
   */
  function namespaceRootElements (selector) {
    const regex = /^(body|html)/;

    if (regex.test(selector)) {
      selector = selector.replace(regex, match => {
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
}

// release
{
  const git = require('simple-git/promise')(__dirname);
  const replace = require('gulp-replace');

  gulp.task('release:create-branch', () => {
    return git.checkoutLocalBranch(releaseBranchName());
  });

  gulp.task('release:update-info', () => {
    return gulp.src(['info.xml'])
      .pipe(replace(/<version>([^>]+)<\/version>/g, `<version>${argv.ver}</version>`))
      .pipe(replace(/<releaseDate>([^>]+)<\/releaseDate>/g, `<releaseDate>${formatTodayDate()}</releaseDate>`))
      .pipe(gulp.dest('.'));
  });

  gulp.task('release:commit-changes', () => {
    return git.add(['info.xml', '*.css'])
      .then(() => {
        return git.commit(`Update css and info files for v${argv.ver}`, null, {
          '--no-verify': null
        });
      });
  });

  gulp.task('release:params-check', done => {
    if (typeof argv.ver === 'undefined') {
      throw new PluginError('release', {
        message: 'Please specify the version using --ver (example: "--ver 1.1.0")',
        showProperties: false
      });
    }

    done();
  });

  gulp.task('release:push', () => {
    return git.push(['-u', 'origin', releaseBranchName()]);
  });

  gulp.task('release', gulp.series(
    'release:params-check',
    'release:create-branch',
    'sass',
    'release:update-info',
    'release:commit-changes',
    'release:push',
    function releasePrepared (done) {
      const compareUrl = `https://github.com/civicrm/org.civicrm.shoreditch/compare/${releaseBranchName()}`;

      console.log(`Branch ${releaseBranchName()} prepared and pushed upstream`);
      console.log(`Please check ${compareUrl}`);
      done();
    }
  ));

  /**
   * Build the YYYY-MM-DD string of today's date
   *
   * @return {String}
   */
  function formatTodayDate () {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  /**
   * Returns the name of the -rc branch, based on the version number
   * passed as a parameter
   *
   * @return {String}
   */
  function releaseBranchName () {
    return `v${argv.ver}-rc`;
  }
}

gulp.task('default', gulp.parallel('sass'));

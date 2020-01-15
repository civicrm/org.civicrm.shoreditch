const gulp = require('gulp');
const argv = require('yargs').argv;
const path = require('path');
const PluginError = require('plugin-error');

// tasks for copying the bootstrap-sass package's assets from the node_modules/
// folder to the base/ folder, so that they can be served in the browser and
// referenced by other extensions if needed.
//
// The following is copied:
// * fonts: glyphicons font files
// * js: components (alert, modal, etc) scripts
// * sass: sass partials that make up bootstrap-sass styleshee
{
  gulp.task('copy:fonts', () => {
    return copyFiles('fonts/bootstrap/*', 'base/fonts');
  });

  gulp.task('copy:js', () => {
    return copyFiles('javascripts/bootstrap/*', 'base/js');
  });

  gulp.task('copy:sass', () => {
    return copyFiles('stylesheets/bootstrap/**/*', 'base/scss/vendor/bootstrap');
  });

  gulp.task('copy', gulp.parallel('copy:sass', 'copy:js', 'copy:fonts'));

  /**
   * Copies the source files in the destination folder
   *
   * @param  {String} source
   * @param  {String} dest
   * @return {Object}
   */
  function copyFiles (source, dest) {
    return gulp.src(
      path.join(__dirname, 'node_modules/bootstrap-sass/assets', source)
    ).pipe(gulp.dest(dest));
  }
}

// sass
{
  const bulk = require('gulp-sass-glob');
  const sass = require('gulp-sass');
  const postcss = require('gulp-postcss');
  const postcssPrefix = require('postcss-prefix-selector');
  const postcssDiscardDuplicates = require('postcss-discard-duplicates');
  const stripCssComments = require('gulp-strip-css-comments');
  const transformSelectors = require('gulp-transform-selectors');

  const bootstrapNamespace = '#bootstrap-theme';
  const outsideNamespaceRegExp = /^\.___outside-namespace/;

  var includePaths = [
    __dirname,
    path.join(__dirname, 'scss')
  ];

  gulp.task('sass:bootstrap', function buildBootstrapCSS () {
    return gulp.src('scss/bootstrap/bootstrap.scss')
      .pipe(bulk({
        includePaths: includePaths
      }))
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: includePaths,
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
  });

  gulp.task('sass:civicrm', function buildCiviCRMCSS () {
    return gulp.src('scss/civicrm/custom-civicrm.scss')
      .pipe(bulk({
        includePaths: includePaths
      }))
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: includePaths,
        precision: 10
      }).on('error', sass.logError))
      .pipe(stripCssComments({ preserve: false }))
      .pipe(postcss([
        postcssPrefix({
          prefix: '.crm-container ',
          exclude: [
            /^body/, /page-civicrm/, /crm-container/, /ui-datepicker/, /civicrm-menu/,
            /jstree-contextmenu/, outsideNamespaceRegExp]
        }),
        postcssDiscardDuplicates
      ]))
      .pipe(transformSelectors(removeOutsideNamespaceMarker, { splitOnCommas: true }))
      .pipe(gulp.dest('css/'));
  });

  gulp.task('sass', gulp.parallel('sass:bootstrap', 'sass:civicrm'));

  gulp.task('watch', () => {
    gulp.watch([
      'base/scss/**/*.scss',
      'scss/angular/**/*.scss',
      'scss/jquery/**/*.scss'
    ], gulp.parallel('sass'));
    gulp.watch('scss/bootstrap/**/*.scss', gulp.parallel('sass:bootstrap'));
    gulp.watch('scss/civicrm/**/*.scss', gulp.parallel('sass:civicrm'));
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
      throw new PluginError('release:params-check', {
        message: 'Please specify the version using --ver (example: "--ver 1.1.0")',
        showProperties: false
      });
    }

    done();
  });

  gulp.task('release:worktree-check', () => {
    return git.raw([
      'ls-files',
      '-v'
    ])
      .then(files => {
        return !!files.split('\n').filter(file => {
          return file.indexOf('S css/') === 0;
        }).length;
      })
      .then(areMinFilesSkipped => {
        if (areMinFilesSkipped) {
          throw new PluginError('release:worktree-check', {
            message: `The .css files are currently ignored in your local repo, unable to create the release commit.
    Please run \`git update-index --no-skip-worktree css/*\` before running the release command again.`,
            showProperties: false
          });
        }
      });
  });

  gulp.task('release:push', () => {
    return git.push(['-u', 'origin', releaseBranchName()]);
  });

  gulp.task('release', gulp.series(
    'release:params-check',
    'release:worktree-check',
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
    return `${argv.ver}-rc`;
  }
}

gulp.task('default', gulp.parallel('sass'));

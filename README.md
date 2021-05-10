# org.civicrm.shoreditch (developmental)

The "Shoreditch" extension is a theme for CiviCRM based on a contemporary [flat design](https://en.wikipedia.org/wiki/Flat_design) and
the [Bootstrap v3](https://getbootstrap.com/docs/3.3/) framework.

Please note that this extension is currently in **alpha stage** and under **active development**. Significant elements may change.

## Requirements
* Drupal 7
* CiviCRM `v5.31`+. In version `v5.31.0` CiviCRM introduces Theming (https://docs.civicrm.org/dev/en/latest/framework/theme) which makes Shoreditch no longer support the obsolete way of theme inclusion (since Shoreditch `v0.1-alpha34`) and drop the support for earlier CiviCRM versions.
* [uk.squiffle.kam](https://github.com/aydun/uk.squiffle.kam) if the CiviCRM version is lower than `v5.12`
* "CiviCRM Theme" module enabled
* The [CiviAdmin Companion Drupal theme](https://github.com/compucorp/shoreditch-companion-d7-theme) is optional but recommended (only for Shoreditch `v0.1-alpha33`+)

### For development
* NodeJS `v14.16.0`

## Supported CMSs
At the moment the theme is being developed to work only in Drupal 7. WordPress and Joomla are not currently supported.

## Installation (git/cli)
```bash
# Navigate to your extension directory, e.g.
cd sites/default/files/civicrm/ext

# Download and enable the extension
git clone https://github.com/civicrm/org.civicrm.shoreditch
cv en org.civicrm.shoreditch
```

### CiviAdmin Companion Drupal theme
If you also intend to use the [CiviAdmin Companion Drupal theme](https://github.com/compucorp/shoreditch-companion-d7-theme), please go to its repo and follow the installation instructions there

_(only for Shoreditch `v0.1-alpha33`+)_

### Development / Bleeding edge version
If you are [developing](CONTRIBUTING.md#code-contributions) for the theme or if want the very latest (but untested) version of the theme on your site, run
```bash
cd org.civicrm.shoreditch
npm i
```

Once all the packages are installed `gulp sass` will be automatically invoked, which will build the stylesheets with the latest version of the source code.

## Components
The theme includes two major components:

 * "`bootstrap.css`" is a build of Bootstrap based on the standard Bootstrap style-guide. It can be used with other CiviCRM extensions which satisfy the Bootstrap style-guide.
 * "`custom-civicrm.css`" is a supplement to "civicrm.css". It uses the same visual conventions and SCSS metadata, but it applies to existing core screens.

### Using `bootstrap.css`

This extension provides the CSS for Bootstrap.  Other extensions should output compliant HTML, e.g.

```html
<div id="bootstrap-theme">
  ...
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">Hello World</h3>
    </div>
    <div class="panel-body">
      This is the Hello World example.
    </div>
  </div>
  ...
</div>
```

Note the use of `id="bootstrap-theme"`.  To avoid conflicts with CMS UIs, the CSS rules are
restricted to `#bootstrap-theme`.

## Contributing
Want to report a bug, suggest enhancements, or contribute to the project? Please read [here](CONTRIBUTING.md)!

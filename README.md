# org.civicrm.shoreditch (developmental)

The "Shoreditch" extension is a theme for CiviCRM based on a contemporary [flat design](https://en.wikipedia.org/wiki/Flat_design) and
the [Bootstrap v3](https://getbootstrap.com/docs/3.3/) framework.

Please note that this extension is currrently in **alpha stage** and under **active development**. Significant elements may change.

## Supported CMSs
At the moment the theme is being developed to work only in Drupal. WordPress and Joomla are not currently supported.

## Components
The theme includes two major components:

 * "`bootstrap.css`" is a build of Bootstrap based on the standard Bootstrap style-guide. It can be used with other CiviCRM extensions which satisfy the Bootstrap style-guide.
 * "`custom-civicrm.css`" is an optional replacement for "civicrm.css". It uses the same visual conventions and SCSS metadata, but it applies to existing core screens.

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

### Using `custom-civicrm.css`

This extension includes an optional file `custom-civicrm.css` which can replace the default
`civicrm.css`.  This uses the same CSS classes as traditional CiviCRM screens, but the
look-and-feel matches the Bootstrap look-and-feel.  It is implemented with the same SCSS variables
and mixins. To use it, navigate to **Administer -> System Settings -> Resource URLs** And click on
"Shoreditch" as the Custom CSS Url option.

Or from the command line:

```
cv api setting.create customCSSURL=$(cv url -x shoreditch/css/custom-civicrm.css --out=list)
```

## Contributing
Want to report a bug, suggest enhancements, or contribute to the project? Please read [here](CONTRIBUTING.md)!

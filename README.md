# org.civicrm.bootstrapcivicrm (developmental)

The Bootstrap extension provides a copy of [Bootstrap CSS](http://getbootstrap.com/)
for use with CiviCRM.

> This extension is under **active development**. Significant elements may change.

## Example

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
restricted to `#bootstrap-them`.

## `civicrm.css`

This extension includes an optional file `custom-civicrm.css` which can replace the default
`civicrm.css`.  This uses the same CSS classes as traditional CiviCRM screens, but the
look-and-feel matches the Bootstrap look-and-feel.  It is implemented with the same SCSS variables
and mixins. To use it, update the setting `customCSSURL`, e.g.

```
cv api setting.create customCSSURL="<fixme>/org.civicrm.bootstrapcivicrm/css/custom-civicrm.css"
```

## Build

If you are doing development with the SCSS content, then you'll need to install
[NodeJS](https://nodejs.org/) and run `npm install`, as in:

```
npm install -g gulp
npm install
gulp
```

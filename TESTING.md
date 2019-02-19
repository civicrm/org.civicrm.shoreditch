# Testing

In order to make sure that your work does not introduce regression issues or unexpected changes, there are two tools that you are encouraged to use: [org.civicrm.styleguide](https://github.com/civicrm/org.civicrm.styleguide/) and [BackstopJS](https://github.com/garris/BackstopJS).

The styleguide provides you with a page that showcases the entire base Bootstrap theme + custom modifiers in a single page, so that you can check how they look like in Shoreditch and how your changes affect the theme and its components.

To run BackstopJS on the styleguide, follows the [instructions](https://github.com/compucorp/org.civicrm.styleguide/blob/master/README.md#backstopjs) included in the extension. Make sure to always use BackstopJS on the styleguide whenever you work on `bootstrap.css`.

To run BackstopJS on the existing core screens, you can temporarily use [this setup](https://github.com/compucorp/backstopjs-config). Of course this should be used only if you are introducing changes to `custom-civicrm.css`.

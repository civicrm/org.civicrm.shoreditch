# Contributing to the Shoreditch theme
First of all, thank you for considering contributing to the Shoreditch theme!

## Things to know before you start
1. Bear in mind that the theme is currently in an **alpha stage** and at such many (even fundamental) things can be subject to change!
2. Please read the [README](https://github.com/compucorp/org.civicrm.shoreditch/blob/staging/README.md) to get an overview of what the theme is and how it works.
3. The [org.civicrm.styleguide](https://github.com/civicrm/org.civicrm.styleguide/) extension is a very useful companion to the theme, please make sure to have it installed and enabled locally when working on Shoreditch.

### Main folders
* `base/` Where vanilla Bootstrap is located. Contains the original Bootstrap SASS partials (`scss/vendor/bootstrap/`) but also custom partials (`scss/overrides`) and mixins (`scss/mixins`) that allow using Bootstrap alongside the original CiviCRM style
* `css/` Contains the two post-processed css files, `bootstrap.css` and `custom-civicrm.css`
* `fonts/` Font files used by the theme
* `js/` Any custom javascript code that the theme relies on
* `scss/` Contains the SASS partials that make up Shoreditch. It's split into two sub-folders
  * `scss/civicrm` Contains the style that the theme applies to the existing core screens, in order to make them look like as if they were also Bootstrap-based pages.
  * `scss/bootstrap` Contains the custom Bootstrap theme. In here not only the base Bootstrap theme is customized, but also Bootstrap elements are augmented with new modifiers, and completely custom component are added.

## Guidelines for `custom-civicrm.css`
Any style changes that are aimed at making the core screens look like they are part of the Bootstrap theme, should go here.

TBD

## Guidelines for `bootstrap.css`
While `custom-civicrm.css` can be thought of as the "legacy mode" of Shoreditch, this component can be considered as the actual theme.

There are three main types of changes you might want to introduce to the theme
1. **Tweak the overall look-and-feel.** *(i.e., color palette, border radius, line height)* These are usually accomplished by working on the `overrides/_variables.scss` partial, as Bootstrap "exposes" many basic traits of the style as SASS variables.
2. **Customize a Bootstrap component** *(i.e., changing the padding of `.panel`, adding a custom variation of `.btn`)* You  can do that in the `overrides/_variables.scss` file, or if Bootstrap doesn't provide a SASS variable for the change you need to implement, you can write the overriding style in the `overrides/style/_{component}.scss` partial.
3. **Add a custom component** *(i.e., wizard component)* There are some component in CiviCRM that do not have any equivalent in the Bootstrap component library, and as such they have to be written from scratch. Those components go in the `components/` folder, each in an individual partial.


### Things to keep in mind

#### Keep the exceptions to a minimum
Shoreditch is first and foremost a customized Bootstrap theme, and as such it should not deviate from the original Bootstrap as much as possible.

Any custom variable, override, modifier, or component should be considered exceptions to the basic theme and should be justified and carefully planned, as each adds complexity that over time would make the theme harder to maintain and to work on.

#### Use original Bootstrap variables as much as possible
Bootstrap comes packaged with plenty of SASS variables that covers many of the traits of the whole theme and of the individual components (like `$padding-base-vertical`, `$modal-inner-padding`, `$badge-font-weight`, etc), so always make sure to check first if the changes that you want to implement can be done so by simply tweaking a variable value.

#### Prefix the custom variables
Sometimes you might need to add custom SASS variables to the `overrides/_variable.scss` partial. In order to differentiate them from the original variables, always prefix them with `$crm-` (`$crm-badge-min-width`, `$crm-gray-lightest`, etc).

#### Match the overriding partials with the original partials
The `overriding/style` folder contains the partials that are meant to override and augment the original style, and the partials are organized so that they reflect the structure in `base/vendor/bootstrap/`.

If you need to add a partial in `overriding/style` make sure that it is matching one of the originals.

#### CSS naming convention
For custom modifiers, stick with the dasherized bootstrap convention. So `.panel-bigger`, `.badge-square`, etc

For custom components, use the [BEM](http://getbem.com/) convention, making sure to prefix the block name with `crm_`. So `.crm_custom-component`, `.crm_foo__bar--baz`, etc.

#### Add a custom component as a last resort
Adding a custom components to achieve a specific design should be considered as a last resort, when no suitable Bootstrap component had been found that could either be used as-is or being augmented with a custom modifier.

#### No ad-hoc changes
The theme is meant to be as generic as possible, and as such no site/extension specific changes and/or components should be added to it.

## Testing
In order to make sure that your work does not introduce regression issues or unexpected changes, there are two tools that you are encouraged to use: [org.civicrm.styleguide](https://github.com/civicrm/org.civicrm.styleguide/) and [BackstopJS](https://github.com/garris/BackstopJS).

The styleguide provides you with a page that showcases the entire base Bootstrap theme + custom modifiers in a single page, so that you can check how they look like in Shoreditch and how your changes affect the theme and its components.

To run BackstopJS on the styleguide, follows the [instructions](https://github.com/compucorp/org.civicrm.styleguide/blob/staging/README.md#backstopjs) included in the extension. Make sure to always use BackstopJS on the styleguide whenever you work on `bootstrap.css`.

To run BackstopJS on the existing core screens, you can temporarily use [this setup](https://github.com/compucorp/backstopjs-config). Of course this should be used only if you are introducing changes to `custom-civicrm.css`.

## Submitting a PR
When your work is complete and you have tested it locally, you can open a PR against the `develop` branch.

In the PR give a description of what you changed (and why!), and attach before & after screenshots to show the effects of your changes.

Currently you are also required, for any work done on the style, to attach a screenshot of the BackstopJS report, showing how many tests passed, how many failed and which ones.

The PR will then undergo code review and, once the changes are accepted, it will be merged and become part of the theme's next release!

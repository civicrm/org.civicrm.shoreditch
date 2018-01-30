# Contributing
First of all, thank you for considering contributing to the Shoreditch theme!

## Things to know before you start
1. Bear in mind that the theme is currently in an **alpha stage** and at such many (even fundamental) things can be subject to change!
2. Please read the [README](https://github.com/compucorp/org.civicrm.shoreditch/blob/staging/README.md) to get an overview of what the theme is and how it works.
3. The [org.civicrm.styleguide](https://github.com/civicrm/org.civicrm.styleguide/) extension is a very useful companion to the theme, please make sure to have it installed and enabled locally when working on Shoreditch.

## Reporting a bug / Suggesting enhancements
Both bugs and enhancements are tracked as [GitHub issues](https://github.com/civicrm/org.civicrm.shoreditch/issues).

If you want to report a bug, open an issue and apply the "bug" label to it. Please use a clear and descriptive title, provide screenshots (if it relates to styling issues) and report on what OS/browser the bug is reproducible.

If you want to suggest an enhancement, open an issue and apply the "enhancement" label to it. Please use a clear and descriptive title and provide a description of the suggested enhancement and why it would be beneficial for the theme.

## Code contributions
If you'd like to contribute to the project, please make sure to familiarize with the [coding guidelines](CODING.md) and with how to appropriately [test](TESTING.md) your style changes before submitting your contribution!

### Git commit messages guidelines
* Use the present tense ("Customize .panel-primary" not "Customized .panel-primary")
* Use the imperative mood ("Add padding to .panel" not "Adds padding to .panel")
* First line should have a length of max 72 characters
* Reference any issues or pull requests that you think is useful to mention

### Submitting a PR
When your work is complete and you have tested it locally, you can open a PR against the `master` branch.

In the PR give a description of what you changed (and why!), and attach before & after screenshots to show the effects of your changes.

Currently you are also required, for any work done on the style, to attach a screenshot of the BackstopJS report (see [here](TESTING.md)), showing how many tests passed, how many failed and which ones.

The PR will then undergo code review and, once the changes are accepted, it will be merged and become part of the theme's next release!

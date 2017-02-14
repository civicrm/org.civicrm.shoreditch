/**
 * This script is responsible for highlighting results on the 'Advanced Search' page
 * @see org.civicrm.london/scss/civicrm/advanced-search/pages/_results.scss
 */

CRM.$(function() {
  'use strict';

  /**
   * Checks if the "org.civicrm.london" is installed
   * @return {Promise} Resolves to a boolean
   */
  function isLondonInstalled() {
    return CRM.api3('Extension', 'get', {
      sequential: 1
    }).then(function(result) {
      return result.values.filter(function(extension) {
        return extension.key === 'org.civicrm.london' && extension.status === 'installed';
      }).length > 0;
    });
  }

  isLondonInstalled().then(function(installed) {
    if (installed) {
      CRM.$('.crm-search-results table.selector').on('change', 'td input.select-row.crm-form-checkbox', function() {
        var $this = CRM.$(this);
        $this.closest('tr').toggleClass('highlight', $this.prop('checked'));
      });
    }
  });
});

(function ($) {
  $(document).ready(function () {
    closeSearchFiltersByDefault();
  });

  /**
   * Closes the search filters by default by trigerring click event on accordion header.
   */
  function closeSearchFiltersByDefault () {
    $('.crm-accordion-wrapper:not(.collapsed) .crm-accordion-header').click();
  }
}(CRM.$));

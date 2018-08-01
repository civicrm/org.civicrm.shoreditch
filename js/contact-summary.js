(function ($) {
  $(document).ready(function () {
    moveUserPictureNextToContactTitle();
  });

  /**
   * Prepends the container image div on .crm-summary-contactname-block
   */
  function moveUserPictureNextToContactTitle () {
    $('.crm-summary-contactname-block').prepend($('#crm-contact-thumbnail'));
  }
}(CRM.$));

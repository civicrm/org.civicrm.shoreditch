(function ($) {
  $(document).ready(function () {
    moveUserPictureNextToContactTitle();
  });

  /**
   * Moves image el left to the Contact title on contact Summary page
   */
  function moveUserPictureNextToContactTitle () {
    $('.crm-summary-contactname-block').prepend($('#crm-contact-thumbnail'));
  }
}(CRM.$));

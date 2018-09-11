(function ($) {
  $(document).ready(function () {
    moveUserPictureNextToContactTitle();
  });

  /**
   * Moves the user image to the left of the contact name
   */
  function moveUserPictureNextToContactTitle () {
    $('.crm-summary-contactname-block').prepend($('#crm-contact-thumbnail'));
  }
}(CRM.$));

(function ($) {
  $(document).ready(function () {
    moveUserPictureNextToContactTitle();
  });

  /**
   * Deletes User Image parent div (#crm-contact-thumbnail) and move the user picture next to contatct tile.
   * Also adds class "crm-summary-contactphoto" to it.
   */
  function moveUserPictureNextToContactTitle () {
    $('#contactname-block').prepend($('#crm-contact-thumbnail').find('img').addClass('crm-summary-contactphoto'));
    $('#crm-contact-thumbnail').remove();
  }
}(CRM.$));

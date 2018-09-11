(function ($) {
  var profilePicWrapper = '#crm-contact-thumbnail';

  $(document).ready(function () {
    usePictureAsBackground();
    moveUserPictureNextToContactTitle();
  });

  /**
   * Moves the user image to the left of the contact name
   */
  function moveUserPictureNextToContactTitle () {
    $('.crm-summary-contactname-block').prepend($(profilePicWrapper));
  }

  /**
   * Makes the user picture the background image of the <a>
   * element that links to the picture itself
   *
   * Having it as a background allows for support of different
   * picture ratios that would otherwise get stretched with a <img> element
   */
  function usePictureAsBackground () {
    var $wrapper = $(profilePicWrapper);
    var $picture = $wrapper.find('.crm-contact_image');
    var pictureSrc = $picture.find('img').attr('src');

    $picture.find('a').css('background-image', 'url(' + pictureSrc + ')');
    $picture.find('img').remove();
  }
}(CRM.$));

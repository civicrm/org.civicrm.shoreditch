(function () {
  document.addEventListener('DOMContentLoaded', function () {
    manipulateProfilePicture();
  });

  /**
   * Performs DOM manipulation on the profile picture element, if present
   */
  function manipulateProfilePicture () {
    var picWrapper = document.querySelector('#crm-contact-thumbnail');

    if (!picWrapper) {
      return;
    }

    usePictureAsBackground();
    moveUserPictureNextToContactTitle();

    /**
     * Moves the picture to the left of the contact name
     */
    function moveUserPictureNextToContactTitle () {
      var header = document.querySelector('.crm-summary-contactname-block');

      header.insertBefore(picWrapper, header.firstElementChild);
    }

    /**
     * Makes the picture the background image of the <a>
     * element that links to the picture itself
     *
     * Having it as a background allows for support of different
     * picture ratios that would otherwise get stretched with a <img> element
     */
    function usePictureAsBackground () {
      var picture = picWrapper.querySelector('.crm-contact_image');
      var src = picture.querySelector('img').getAttribute('src');

      picture.querySelector('a').style.backgroundImage = 'url(' + src + ')';
      picture.querySelector('a').removeChild(picture.querySelector('img'));
    }
  }
}());

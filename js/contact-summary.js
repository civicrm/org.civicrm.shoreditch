(function () {
  var profilePicWrapper = '#crm-contact-thumbnail';

  document.addEventListener('DOMContentLoaded', function () {
    usePictureAsBackground();
    moveUserPictureNextToContactTitle();
  });

  /**
   * Moves the user image to the left of the contact name
   */
  function moveUserPictureNextToContactTitle () {
    var header = document.querySelector('.crm-summary-contactname-block');
    var wrapper = document.querySelector(profilePicWrapper);
    var block = document.querySelector('.crm-summary-block');

    header.insertBefore(wrapper, block);
  }

  /**
   * Makes the user picture the background image of the <a>
   * element that links to the picture itself
   *
   * Having it as a background allows for support of different
   * picture ratios that would otherwise get stretched with a <img> element
   */
  function usePictureAsBackground () {
    var wrapper = document.querySelector(profilePicWrapper);
    var picture = wrapper.querySelector('.crm-contact_image');
    var src = picture.querySelector('img').getAttribute('src');

    picture.querySelector('a').style.backgroundImage = 'url(' + src + ')';
    picture.querySelector('a').removeChild(picture.querySelector('img'));
  }
}());

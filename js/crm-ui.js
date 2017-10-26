/**
 * This script is responsible for any common UI tweaks needed via script.
 */

(function ($, _) {  

  /**
  * Substitutes main menu arrow image with FontAwesome caret icon
  */
  function substituteMenuArrows() {
    $('#root-menu-div .menu-item-arrow').each(function ($element) {
      var $arrow = $(this);

      $arrow.before('<i class="fa fa-caret-right menu-item-arrow"></i>');
      $arrow.remove();
    });
  }

  $(document).ready(function () {
    substituteMenuArrows();
  });
}(CRM.$, CRM._));

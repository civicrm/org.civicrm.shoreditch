/**
 * This script is responsible for any common UI tweaks needed via script.
 */

(function ($, _) {  
  $(document).ready(function () {
    $('#root-menu-div .menu-item-arrow').each(function ($element) {
      var $arrow = $(this);

      $arrow.before('<i class="fa fa-caret-right menu-item-arrow"></i>');
      $arrow.remove();
    });
  });
}(CRM.$, CRM._));

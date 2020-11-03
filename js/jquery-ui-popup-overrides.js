/**
 * This script is responsible for making the jQuery UI popups take full height
 * of the screen in fullscreen mode.
 */

(function ($) {
  $(document).on('dialogopen', function(e) {
    var $elem = $(e.target);
    var $elemParent = $elem.parent();

    if ($elemParent.hasClass('crm-container') && $elem.dialog('option', 'resizable')) {
      $('.crm-dialog-titlebar-resize', $elemParent).click(function(e) {
        if (!$elem.data('origSize')) {
          $elem.parent('.ui-dialog').removeClass('fullscreen');
        } else {
          var menuHeight = $('#civicrm-menu').outerHeight();
          var titleBarHeight = $elemParent.find('.ui-dialog-titlebar').outerHeight();
          var buttonContainerHeight = $elemParent.find('.ui-dialog-buttonpane').outerHeight();
          var windowHeight = $(window).outerHeight();
          var contentHeight = windowHeight - (titleBarHeight + menuHeight + buttonContainerHeight);

          $elem.parent('.ui-dialog').addClass('fullscreen');
          $elem[0].style.setProperty('height', contentHeight + 'px', 'important' );
        }
      });
    }
  });
})(CRM.$);

/**
 * This script is responsible for making the jQuery UI popups take full height
 * of the screen in fullscreen mode.
 */

(function ($) {
  $(document).on('dialogopen', function(e) {
    var $el = $(e.target);

    if ($el.parent().hasClass('crm-container') && $el.dialog('option', 'resizable')) {
      $('.crm-dialog-titlebar-resize', $el.parent()).click(function(e) {
        if (!$el.data('origSize')) {
          $el.parent('.ui-dialog').removeClass('fullscreen');
        } else {
          var menuHeight = $('#civicrm-menu').outerHeight();
          var titleBarHeight = $el.parent().find('.ui-dialog-titlebar').outerHeight();
          var buttonContainerHeight = $el.parent().find('.ui-dialog-buttonpane').outerHeight();
          var windowHeight = $(window).outerHeight();
          var contentHeight = windowHeight - (titleBarHeight + menuHeight + buttonContainerHeight);

          $el.parent('.ui-dialog').addClass('fullscreen');
          $el[0].style.setProperty('height', contentHeight + 'px', 'important' );
        }
      });
    }
  });
})(CRM.$);

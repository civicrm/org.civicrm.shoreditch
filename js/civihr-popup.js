/*
Prevent Popups to overflow tables.
*/
CRM.$(function($) {
  'use strict';

  // .btn-slide is a continer of popup and a button triggering it
  $('.btn-slide').attrchange(function(e) {
    var $button = $(this), $body = $('body'), $popup, buttonOffset;

    // check if popup is open
    if($button.hasClass('btn-slide-active')) {
      $popup = $button.children('ul.panel');

      $popup
        .appendTo($body)
        .addClass('civihr-popup');

      buttonOffset = $button.offset();

      $popup
        .css('top', parseInt(buttonOffset.top, 10) + $button.outerHeight())
        .css('left', parseInt(buttonOffset.left, 10) - ($popup.width() - $button.outerWidth()));

      $body.addClass('civihr-popup-open');
    } else {

      $body
        .children('.civihr-popup')
        .appendTo($button)
        .removeClass('civihr-popup');

      $body.removeClass('civihr-popup-open');
    }

  });
});

/*
Prevent Popups to overflow tables.
*/
CRM.$(function($) {
  'use strict';

  // .btn-slide is a continer of popup and a button triggering it
  $('.btn-slide').attrchange(function(e) {
    var $button = $(this),
        $popup,
        button_offset;

    if($button.hasClass('btn-slide-active')) {
      // check if popup is open
      $popup = $button.children('ul.panel');

      $popup.appendTo('body')
        .addClass('civihr-popup');

      button_offset = $button.offset();

      $popup.css('position', 'absolute')
        .css('top', parseInt(button_offset.top, 10) + 24) // 24 is the fontsize + paddings
        .css('left', parseInt(button_offset.left, 10) - ($popup.width() - 57)); // 57 is the width of more button

      $('body').addClass('civihr-popup-open');
    } else {
      // popup closed

      $('body > ul.panel')
        .appendTo($button)
        .css('position', 'static')
        .css('display', 'none');

      $('body').removeClass('civihr-popup-open');
    }

  });
});

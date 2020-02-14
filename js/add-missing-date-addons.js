CRM.$(function () {
  'use strict';

  /**
   * The purpose of this script is to add the missing calendar addons to datepicker fields
   */

  /**
   * Adds an datepicker addon to the given input. It also removes the calendar icon displayed
   * as a placeholder for the input in favour of the add on button calendar icon.
   *
   * @param {Object} input The jQuery object for the input
   */
  function addDateAddonToInput (input) {
    var placeholderWithoutCalendar = input.attr('placeholder').replace('', '');

    CRM.$('<span class="addon fa fa-calendar"></span>')
      .insertAfter(input)
      .css('margin-top', input.css('margin-top'))
      .css('margin-bottom', input.css('margin-bottom'))
      .on('click', function () {
        input.focus();
      });

    input[0].style.setProperty('width', input.width() - 19 + 'px', 'important');
    input[0].style.setProperty('margin-right', 0, 'important');
    input.css('min-width', 'initial');
    input.attr('placeholder', placeholderWithoutCalendar);
  }

  /**
   * Moves the addon to the input's side
   * @param  {Object} input The jQuery object for the input
   * @param  {Object} addon The jQuery object for the addon
   */
  function moveAddonToInputsSide (input, addon) {
    input.after(addon);
    addon.css('margin-right', 10);
  }

  /**
   * We're debouncing the callback to avoid calling the plugin multiple times
   * during DOM changes
   */
  var observer = new MutationObserver(debounce(function () {
    CRM.$('.crm-container input.hasDatepicker').each(function () {
      var $this = CRM.$(this);
      var addon = $this.siblings('.addon');
      if (!addon.length && !$this.siblings('.input-group-addon').length) {
        addDateAddonToInput($this);
      } else if (addon.length && !$this.next('.addon').length) {
        moveAddonToInputsSide($this, addon);
      }
    });
  }, 500));

  observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
  });

  function debounce (fn, delay) {
    var timer = null;
    return function () {
      var me = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(me, args);
      }, delay);
    };
  }
});

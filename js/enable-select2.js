CRM.$(function() {
  'use strict';

  /**
   * The purpose of this script is to activate the "select2" dropdowns on standard select elements.
   * When the "select2" is enabled, its corresponding select is hidden, so we're
   * only targeting the visible ones.
   * Because some select elements are dinamically loaded via AJAX,
   * we're using the "MutationObserver" to listen to DOM changes
   */

  /**
   * We're debouncing the callback to avoid calling the plugin multiple times
   * during DOM changes
   */
  var observer = new MutationObserver(debounce(function() {
    CRM.$('select:visible:not([class^="ui-datepicker"])').select2();
  }, 500));

  observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true
  });

  function debounce(fn, delay) {
    var timer = null;
    return function() {
      var me = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(me, args);
      }, delay);
    };
  }
});

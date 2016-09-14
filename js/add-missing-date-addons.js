CRM.$(function() {
  'use strict';

  /**
   * The purpose of this script is to add the missing calendar icons ('.input-group-addon .fa .fa-calendar')
   */

  /**
   * We're debouncing the callback to avoid calling the plugin multiple times
   * during DOM changes
   */
  var observer = new MutationObserver(debounce(function() {
    CRM.$('.crm-container input.hasDatepicker').each(function() {
      var $this = CRM.$(this);
      if (!$this.siblings('.addon').length && !$this.siblings('.input-group-addon').length) {
        CRM.$('<span class="addon fa fa-calendar"></span>')
          .insertAfter($this)
          .css('margin-top', $this.css('margin-top'))
          .css('margin-bottom', $this.css('margin-bottom'))
          .on('click', function() {
            $this.focus();
          });

        this.style.setProperty('width', $this.width() - 19 + 'px', 'important');
        this.style.setProperty('margin-right', 0, 'important');
        $this.css('min-width', 'initial');
      }
    });
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

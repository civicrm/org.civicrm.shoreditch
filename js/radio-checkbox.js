CRM.$(function() {
  'use strict';

  /**
   * We're debouncing the callback to avoid calling multiple times during DOM changes
   */
  var observer = new MutationObserver(debounce(function() {
    /**
     * The customized radio buttons / checkboxes depend on the existence of the
     * "for" attribute in the respective labels.
     * This is a workaround to add any missing "for" attributes to the markup.
     * @see: org.civicrm.bootstrapcivicrm/scss/civicrm/common/_radio-checkbox.scss
     */
    CRM.$('.crm-container input[type=checkbox], .crm-container input[type=radio]').each(function() {
      var $this = CRM.$(this);
      var label = $this.next('label');

      if (!$this.attr('id')) {
        // There's no id. Add a unique random value as the id
        $this.attr('id', new Date().valueOf());
      }

      if (!label.length) {
        // There's no sibling label. Let's just show the checkbox / radio button, in order to avoid feature loss
        $this.show();
      } else if (!label.attr('for')) {
        // Add the "for" attribute on the sibling label, matching the input's id
        label.attr('for', $this.attr('id'));
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

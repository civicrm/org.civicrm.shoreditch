CRM.$(function() {
  'use strict';

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
});

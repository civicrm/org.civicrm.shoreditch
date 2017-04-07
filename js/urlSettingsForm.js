CRM.$(function($) {
  'use strict';
  var url = CRM.vars.shoreditch.cssUrl,
    val = $('#customCSSURL').val();
  $('#customCSSURL')
    .removeClass('huge40')
    .css('width', '100%')
    .wrap('<div style="width:41.4em; display: flex;" />')
    .prop('readonly', url === val)
    .prop('placeholder', ts('Default CiviCRM style'))
    .before('<div style="white-space: nowrap;"><input type="radio" name="shoreditch-toggle" id="shoreditch-toggle-1" ' + (url === val ? 'checked' : '') + ' /> <label for="shoreditch-toggle-1">Shoreditch</label>' +
      ' &nbsp; <input type="radio" name="shoreditch-toggle" id="shoreditch-toggle-0" ' + (url !== val ? 'checked' : '') + ' /> <label for="shoreditch-toggle-0">' + ts('Other:') + '</label>&nbsp;</div>')
    .parent()
    .on('click', 'input:radio', function() {
      if ($(this).is('#shoreditch-toggle-1')) {
        $('#customCSSURL').val(url).prop('readonly', true);
      } else {
        $('#customCSSURL').val('').prop('readonly', false);
      }
    });
  // Replace help text with our own
  $('.crm-url-form-block-customCSSURL .helpicon').removeAttr('onclick').click(function() {
    CRM.help($('label[for=customCSSURL]').text(), '<p>' +
      ts('Enabling Shoreditch CSS will change the look and feel of CiviCRM sitewide to give the entire application a consistent modern style.') +
      '</p>');
    return false;
  });
});

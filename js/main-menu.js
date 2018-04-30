(function ($, _) {
  $(document).ready(function () {
    amendMarkupOfMenuItemsWithFontAwesomeIcons();
    customizeQuickSearchField();
  });

  /**
   * Amends the markup of any menu item with a FontAwesome icon
   */
  function amendMarkupOfMenuItemsWithFontAwesomeIcons() {
    menuItemsWithFontAwesomeIcon().each(function () {
      var $menuItem = $(this);

      $('.crm-i,.fa', $menuItem).addClass('menumain-icon');
      wrapMenuItemLabelInHTML($menuItem);
    });
  }

  /**
   * Changes the placeholder text of the quicksearch field
   */
  function changeQuickSearchFieldPlaceholder () {
    $('#crm-qsearch .ui-autocomplete-input').attr('placeholder', 'Quick Search');
  }

  /**
   * Customizes the quick search field
   */
  function customizeQuickSearchField () {
    changeQuickSearchFieldPlaceholder();
    giveFocusToQuickSearchFieldWhenBlockGetsClick();
    manageCustomClassOfQuickSearchField();
  }

  /**
   * It gives focus to the quicksearch field when a click is registered on the
   * whole block (= on the icon as well) rather than just the field itself
   */
  function giveFocusToQuickSearchFieldWhenBlockGetsClick () {
    $('#crm-qsearch').click(function () {
      $('#sort_name_navigation').focus();
    });
  }

  /**
   * Checks if the user has clicked outside of the quick search field
   * by analyzing the given click target
   *
   * @param {Element} target
   * @return {boolean}
   */
  function hasUserClickedOutsideQuickSearchField (target) {
    var $target = $(target);

    return !$target.is('#crm-qsearch') &&
      !$target.is('#root-menu-div') &&
      !$target.closest('#crm-qsearch, #root-menu-div').length;
  }

  /**
   * Checks if the quick search field currently has any value
   *
   * @return {boolean}
   */
  function isQuickSearchOnGoing () {
    var searchValue = $('#sort_name_navigation').val() || '';

    return !!searchValue.trim();
  }

  /**
   * Manages handlers that deals with the custom class
   * that is used on the quick search field
   */
  function manageCustomClassOfQuickSearchField () {
    var customClass = 'search-ongoing';

    toggleCustomClassToQuickSearchFieldOnHover(customClass);
    removeCustomClassOnOutsideClick(customClass);
  }

  /**
   * Gets the list of the menu items with a FontAwesome icon
   *
   * @return {array}
   */
  function menuItemsWithFontAwesomeIcon () {
    return $('.menumain[class*="crm"]').filter(function () {
      return $('.crm-i,.fa', this).length > 0
    });
  }

  /**
   * Removes the given custom class when the user clicks
   * outside the quick search field (if there is no ongoing search)
   *
   * @param {string} customClass
   */
  function removeCustomClassOnOutsideClick (customClass) {
    $(document).on('click', function (event) {
      if (hasUserClickedOutsideQuickSearchField(event.target) && !isQuickSearchOnGoing()) {
        $('#civicrm-menu').removeClass(customClass);
      }
    });
  }

   /**
   * Toggles the given custom class to the quicksearch field
   * so that custom behaviour can be applied to it
   *
   * The class is removed only when the element
   * loses the hover AND it is empty (which means there is no ongoing search)
   *
   * @param {string} customClass
   */
  function toggleCustomClassToQuickSearchFieldOnHover (customClass) {
    $('#crm-qsearch').hover(
      function () {
        $('#civicrm-menu').addClass(customClass);
      },
      function () {
        var isSearchCriteriaPanelOpen = $('.crm-quickSearchField:visible', '#root-menu-div').length;

        if (!isQuickSearchOnGoing() && !isSearchCriteriaPanelOpen) {
          $('#civicrm-menu').removeClass(customClass);
        }
      }
    );
  }

  /**
   * Creates an HTML element out of the text node next to the icon (an element
   * with either the .crm-i or the .fa class) of the given menu item
   *
   * @param {object} $menuItem
   */
  function wrapMenuItemLabelInHTML ($menuItem) {
    var itemLabel = $('.crm-i, .fa', $menuItem)[0].nextSibling;

    if (itemLabel.nodeType === Node.TEXT_NODE) {
      $(itemLabel).wrap('<span class="menumain-label" />');
    }
  }
}(CRM.$, CRM._));

<?php

require_once 'shoreditch.civix.php';
use CRM_Shoreditch_ExtensionUtil as E;

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function shoreditch_civicrm_config(&$config) {
  _shoreditch_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function shoreditch_civicrm_install() {
  _shoreditch_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function shoreditch_civicrm_enable() {
  _shoreditch_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_coreResourceList().
 */
function shoreditch_civicrm_coreResourceList(&$items, $region) {
  if (!_shoreditch_isActive()) {
    return;
  }

  if ($region == 'html-header') {
    CRM_Core_Resources::singleton()->addStyleFile('org.civicrm.shoreditch', 'css/bootstrap.css', -50, 'html-header');
    CRM_Core_Resources::singleton()->addStyleFile('org.civicrm.shoreditch', 'css/custom-civicrm.css', 99, 'html-header');
    if (!Civi::settings()->get('shoreditch_disable_bootstrap_js')) {
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/transition.js', 1000, 'html-header');
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/scrollspy.js', 1000, 'html-header');
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/dropdown.js', 1000, 'html-header');
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/collapse.js', 1000, 'html-header');
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/modal.js', 1000, 'html-header');
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/tab.js', 1000, 'html-header');
      CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/button.js', 1000, 'html-header');
    }
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'js/noConflict.js', 1001, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'js/add-missing-date-addons.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'js/jquery-ui-popup-overrides.js');
  }
}

/**
 * Implements hook_civicrm_buildForm().
 */
function shoreditch_civicrm_buildForm($formName) {
  if (!_shoreditch_isActive()) {
    return;
  }

  if ($formName == 'CRM_Contact_Form_Search_Advanced') {
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'js/highlight-table-rows.js');
  }
}

/**
 * Implements hook_civicrm_pageRun().
 */
function shoreditch_civicrm_pageRun(&$page) {
  if (!_shoreditch_isActive()) {
    return;
  }

  $pageName = $page->getVar('_name');

  if ($pageName == 'CRM_Contact_Page_View_Summary') {
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'js/contact-summary.js');
  }
}

/**
 * Implements hook_civicrm_navigationMenu().
 */
function shoreditch_civicrm_navigationMenu(&$menu) {
  _shoreditch_civix_insert_navigation_menu($menu, 'Administer/Customize Data and Screens', [
    'label' => E::ts('Shoreditch Settings'),
    'name' => 'shoreditch-settings',
    'url' => 'civicrm/admin/setting/shoreditch',
    'permission' => 'Administer CiviCRM',
  ]);
}

/**
 * @return bool
 *   TRUE if Shoreditch is the active theme.
 */
function _shoreditch_isActive() {
  // The Job civicrm_api3_job_cleanup can clear the DB cache, causing the
  // CiviCRM menu to be empty on the first load after the command ran.
  // Without the menu, the getActiveThemeKey is unable to detect the current
  // theme. This condition ensures the menu is filled.
  if (!CRM_Core_DAO::checkTableHasData(CRM_Core_DAO_Menu::getTableName())) {
    CRM_Core_Menu::store(FALSE);
  }

  return Civi::service('themes')->getActiveThemeKey() === 'shoreditch';
}

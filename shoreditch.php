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
 * Implements hook_civicrm_xmlMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function shoreditch_civicrm_xmlMenu(&$files) {
  _shoreditch_civix_civicrm_xmlMenu($files);
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
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function shoreditch_civicrm_uninstall() {
  _shoreditch_civix_civicrm_uninstall();
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
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function shoreditch_civicrm_disable() {
  _shoreditch_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function shoreditch_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _shoreditch_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function shoreditch_civicrm_managed(&$entities) {
  _shoreditch_civix_civicrm_managed($entities);
}

/**
 * Implements hook_civicrm_caseTypes().
 *
 * Generate a list of case-types
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function shoreditch_civicrm_caseTypes(&$caseTypes) {
  _shoreditch_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implements hook_civicrm_angularModules().
 *
 * Generate a list of Angular modules.
 *
 * Note: This hook only runs in CiviCRM 4.5+. It may
 * use features only available in v4.6+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function shoreditch_civicrm_angularModules(&$angularModules) {
  _shoreditch_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function shoreditch_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _shoreditch_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * Implements hook_civicrm_thems().
 */
function shoreditch_civicrm_themes(&$themes) {
  _shoreditch_civix_civicrm_themes($themes);
}

/**
 * Implements hook_civicrm_postInstall().
 */
function shoreditch_civicrm_postInstall() {
  _shoreditch_civix_civicrm_postInstall();
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
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/transition.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/scrollspy.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/dropdown.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/collapse.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/modal.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/tab.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.shoreditch', 'base/js/button.js', 1000, 'html-header');
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
 * @return bool
 *   TRUE if Shoreditch is the active theme.
 */
function _shoreditch_isActive() {
  return Civi::service('themes')->getActiveThemeKey() === 'shoreditch';
}

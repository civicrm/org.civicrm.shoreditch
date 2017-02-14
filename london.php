<?php

require_once 'london.civix.php';

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function london_civicrm_config(&$config) {
  _london_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_xmlMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function london_civicrm_xmlMenu(&$files) {
  _london_civix_civicrm_xmlMenu($files);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function london_civicrm_install() {
  _london_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function london_civicrm_uninstall() {
  _london_civix_civicrm_uninstall();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function london_civicrm_enable() {
  _london_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function london_civicrm_disable() {
  _london_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function london_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _london_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function london_civicrm_managed(&$entities) {
  _london_civix_civicrm_managed($entities);
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
function london_civicrm_caseTypes(&$caseTypes) {
  _london_civix_civicrm_caseTypes($caseTypes);
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
function london_civicrm_angularModules(&$angularModules) {
  _london_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function london_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _london_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * Implements hook_civicrm_coreResourceList().
 */
function london_civicrm_coreResourceList(&$items, $region) {
  if ($region == 'html-header') {
    CRM_Core_Resources::singleton()->addStyleFile('org.civicrm.london', 'css/bootstrap.css', -50, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'js/radio-checkbox.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'js/add-missing-date-addons.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'base/js/transition.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'base/js/scrollspy.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'base/js/dropdown.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'base/js/collapse.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'base/js/modal.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'base/js/tab.js', 1000, 'html-header');
  }
}

/**
 * Implements hook_civicrm_buildForm().
 */
function london_civicrm_buildForm($formName) {
  if ($formName == 'CRM_Contact_Form_Search_Advanced') {
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'js/enable-select2.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.london', 'js/highlight-table-rows.js');
  }
}

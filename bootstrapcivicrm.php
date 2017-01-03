<?php

require_once 'bootstrapcivicrm.civix.php';

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function bootstrapcivicrm_civicrm_config(&$config) {
  _bootstrapcivicrm_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_xmlMenu().
 *
 * @param $files array(string)
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function bootstrapcivicrm_civicrm_xmlMenu(&$files) {
  _bootstrapcivicrm_civix_civicrm_xmlMenu($files);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function bootstrapcivicrm_civicrm_install() {
  _bootstrapcivicrm_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function bootstrapcivicrm_civicrm_uninstall() {
  _bootstrapcivicrm_civix_civicrm_uninstall();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function bootstrapcivicrm_civicrm_enable() {
  _bootstrapcivicrm_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function bootstrapcivicrm_civicrm_disable() {
  _bootstrapcivicrm_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @param $op string, the type of operation being performed; 'check' or 'enqueue'
 * @param $queue CRM_Queue_Queue, (for 'enqueue') the modifiable list of pending up upgrade tasks
 *
 * @return mixed
 *   Based on op. for 'check', returns array(boolean) (TRUE if upgrades are pending)
 *                for 'enqueue', returns void
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function bootstrapcivicrm_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _bootstrapcivicrm_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function bootstrapcivicrm_civicrm_managed(&$entities) {
  _bootstrapcivicrm_civix_civicrm_managed($entities);
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
function bootstrapcivicrm_civicrm_caseTypes(&$caseTypes) {
  _bootstrapcivicrm_civix_civicrm_caseTypes($caseTypes);
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
function bootstrapcivicrm_civicrm_angularModules(&$angularModules) {
_bootstrapcivicrm_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function bootstrapcivicrm_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _bootstrapcivicrm_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

/**
 * Implementation of hook_civicrm_coreResourceList
 */
function bootstrapcivicrm_civicrm_coreResourceList(&$items, $region) {
  if ($region == 'html-header') {
    CRM_Core_Resources::singleton()->addStyleFile('org.civicrm.bootstrapcivicrm', 'css/bootstrap.css', -50, 'html-header');
    CRM_Core_Resources::singleton()->addStyleFile('org.civicrm.bootstrapcivicrm', 'css/select2-bootstrap.css', -49, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrapcivicrm', 'js/radio-checkbox.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrapcivicrm', 'js/add-missing-date-addons.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrap', 'js/transition.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrap', 'js/scrollspy.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrap', 'js/dropdown.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrap', 'js/collapse.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrap', 'js/modal.js', 1000, 'html-header');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrap', 'js/tab.js', 1000, 'html-header');
  }
}

/**
 * Implementation of hook_civicrm_buildForm
 */
function bootstrapcivicrm_civicrm_buildForm($formName) {
  if($formName == 'CRM_Contact_Form_Search_Advanced') {
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrapcivicrm', 'js/enable-select2.js');
    CRM_Core_Resources::singleton()->addScriptFile('org.civicrm.bootstrapcivicrm', 'js/highlight-table-rows.js');
  }
}

<?php
use CRM_Shoreditch_ExtensionUtil as E;

/**
 * Collection of upgrade steps.
 */
class CRM_Shoreditch_Upgrader extends CRM_Shoreditch_Upgrader_Base {

  /**
   * 1. Removes "custom-civicrm.css" from the "custom css url" field
   * 2. Sets shoreditch as the backend theme only
   */
  public function upgrade_0001() {
    $customCSSUrl = Civi::settings()->get("customCSSURL");
    
    if (strpos($customCSSUrl, 'org.civicrm.shoreditch') !== FALSE) {
      civicrm_api3('setting', 'create', [
        'customCSSURL' => ''
      ]);
    }
  
    civicrm_api3('setting', 'create', [
      'theme_frontend' => 'default',
      'theme_backend' => 'shoreditch'
    ]);
  
    return TRUE;
  }
}

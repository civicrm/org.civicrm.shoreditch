<?php

use CRM_Shoreditch_ExtensionUtil as E;

return [
  'shoreditch_disable_bootstrap_js' => [
    'name' => 'shoreditch_disable_bootstrap_js',
    'group' => 'Shoreditch Settings',
    'type' => 'Boolean',
    'default' => FALSE,
    'html_type' => 'checkbox',
    'add' => 1.0,
    'title' => E::ts('Disable Shoreditch from loading Bootstrap Javascript'),
    'is_domain' => 1,
    'is_contact' => 0,
    'description' => E::ts('If you have another source for the Bootrstrap javascript files, you can disable loading of Shoreditch\'s copy which may prevent javascript issues.'),
    'settings_pages' => ['shoreditch' => ['weight' => 10]],
  ],
];

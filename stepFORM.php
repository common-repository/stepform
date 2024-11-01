<?php
/*
Plugin Name: stepFORM
Plugin URI: http://wordpress.org/plugins/stepform/
Description: Create a survey or quiz within 5 minutes without any coding! Boost sales with the help of functional forms
Author: Webform Team
Version: 1.0.3
Author URI: https://stepform.io
Text Domain: stepFORM
Domain Path: /languages
*/
define('STEPFORM_PLUGIN', true);

if ( !defined('STEPFORM_PLUGIN_NAME') ) {
  define('STEPFORM_PLUGIN_NAME', trim(dirname(plugin_basename(__FILE__)), '/'));
}

if ( !defined('STEPFORM_PLUGIN_URL') ) {
  define( 'STEPFORM_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

if ( !defined('STEPFORM_PLUGIN_DIR') ) {
  define('STEPFORM_PLUGIN_DIR', WP_PLUGIN_DIR . '/' . STEPFORM_PLUGIN_NAME);
}

if ( !defined('STEPFORM_PLUGIN_VERSION') ) {
  define('STEPFORM_PLUGIN_VERSION', '1.0');
}

if ( !defined('STEPFORM_POPUP_FILE') ) {
  define('STEPFORM_POPUP_FILE', STEPFORM_PLUGIN_NAME . '/assets/views/popup.php');
}

function my_plugin_load_plugin_stepFORM() {
  load_plugin_textdomain( 'stepFORM', FALSE, basename( dirname( __FILE__ ) ) . '/languages/' );
}

add_action( 'plugins_loaded', 'my_plugin_load_plugin_stepFORM' );

if ( !class_exists('stepFORM_Core') ) {
  require_once(STEPFORM_PLUGIN_DIR . '/includes/core.php');
  require_once(STEPFORM_PLUGIN_DIR . '/includes/page.php');
  require_once(STEPFORM_PLUGIN_DIR . '/includes/widget.php');
  require_once(STEPFORM_PLUGIN_DIR . '/includes/mce.php');
  $stepFORM_plugin = new stepFORM_Core();
}

if ( function_exists('register_uninstall_hook') ) {
  register_uninstall_hook(__FILE__, 'stepFORM_uninstall');
}

function stepFORM_uninstall() {
  delete_option('stepFORM_api_key');
}

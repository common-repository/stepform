<?php

if (!defined('STEPFORM_PLUGIN')) {
  exit();
}

/**
* MCE Editor
*/
class stepFORM_MCE
{

  /**
  * Register MCE with WordPress.
  */
  public function __construct()
  {
    add_filter( 'mce_external_plugins', array($this, 'add_mce_plugin') );
    add_filter( 'mce_buttons_2', array( __CLASS__, 'mce_buttons_2' ) );
    add_action( 'admin_print_footer_scripts', array($this, 'appthemes_add_quicktags') );
    add_action( 'admin_head', array($this, 'mce_static') );
	add_action( 'admin_footer',  array($this, 'mce_popup' ));
  }
 
 /**
  * Theme popup WordPress
  */
   public function mce_popup()
  {
	 if ( wp_get_current_user()->allcaps['administrator'] === true ) {
      $data = stepFORM_Core::getForms();
      require_once STEPFORM_PLUGIN_DIR . '/assets/views/popup.php';
    }else {
      echo __('Access denied, only admins can view.','stepFORM');
    }
  }
  
  /**
  * Add custom style sheets in the TinyMCE editor window
  */
  public function mce_static()
  {
    $mce_css = plugins_url('/assets/css/mce.css', dirname(__FILE__));
    wp_enqueue_style('stepFORM_mce_css', $mce_css, array(), STEPFORM_PLUGIN_VERSION);
	
	$popup_css = plugins_url('/assets/css/popup.css', dirname(__FILE__));
    wp_enqueue_style('stepFORM_popup_css', $popup_css, array(), STEPFORM_PLUGIN_VERSION);
  }


  /**
  * Adding MCE to the plugin
  * @param array $plugin_array MCE plugin data
  */
  public function add_mce_plugin( $plugin_array )
  {
    $plugin_array["stepFORM_edit_button"] = plugins_url('/assets/js/scripts.js', dirname(__FILE__));
    return $plugin_array;
  }

  /**
  * The advanced toolbar (can be toggled on/off by user)
  * @param  array $buttons button to the toolbar
  * @return mixed
  */
  public function mce_buttons_2( $buttons )
  {
    array_push( $buttons, '|', 'stepFORM_edit_button' );
    return $buttons;
  }


  /**
  * Add more buttons to the html editor
  */
  public function appthemes_add_quicktags()
  {
    if ( wp_script_is('quicktags') ) {
      ?>
      <script type="text/javascript">
      QTags.addButton('button_stepFORM', ' ', '[stepFORM id=', ' ]', '', '<?php echo __('Form','stepFORM');?>', 1);
      </script>
      <?php
    }
  }
}

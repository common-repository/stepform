<?php

if (!defined('STEPFORM_PLUGIN')) {
  exit();
}

/**
* Class with page settings
*/
class stepFORM_Page
{

  /**
  * Sending hash data in iframe
  * @var string
  */
  const LOAD_URL = 'https://stepform.io/dev/integration/load';

  /**
  * $headStyle head styles
  * @var string
  */
  static $headStyle = '';

  /**
  * $isKey key check
  * @var boolean
  */
  static $isKey;

  /**
  * Register page with WordPress.
  */
  public function __construct()
  {
    add_action('admin_init', array($this, 'SettingsPage'));
    add_options_page(__('stepFORM plugin settings.','stepFORM'), 'stepFORM', 'level_10', 'stepFORM', array($this, 'ViewsPageSettings'));
  }

  /**
  * Style file settings
  */
  public function settings_header()
  {
    $admin_css = plugins_url('/assets/css/settings.css', dirname(__FILE__));
    wp_enqueue_style('stepFORM_settings_css', $admin_css, array(), STEPFORM_PLUGIN_VERSION);
    $admin_js = plugins_url('/assets/js/settings.js', dirname(__FILE__));
    wp_enqueue_script('stepFORM_settings', $admin_js, array(), STEPFORM_PLUGIN_VERSION);
    $this->head_style();
  }

  /**
  * Views plugin settings
  */
  public function ViewsPageSettings()
  {
    ?>
    <div class="stepFORM-wrapper">
      <div class="stepFORM-header"></div>
      <div class="stepFORM-content">
        <div class="stepFORM-content-wrap wp-core-ui">
          <div id="stepFORM-content-text"><?php echo __('To complete the account connection procedure, click on the "Connect account" button.','stepFORM') ?>
          </div>
          <div id="stepFORM-content-instruction">
            <h3><?php echo __('How to add a form','stepFORM') ?></h3>
            <p><?php echo __('1. Click on the "Add block" button on the page;','stepFORM') ?></p>
            <p><?php echo __('2. Choose "stepFORM" under the "widgets" tab;','stepFORM') ?></p>
            <img id="stepFORM-screen-0">
            <p><?php echo __('3. In the block that will appear, choose the desired form from the drop-down list','stepFORM') ?></p>
            <img id="stepFORM-screen-1">

            <h3><?php echo __('I\'m using a classic editor','stepFORM') ?></h3>
            <p><?php echo __('Use the stepFORM button to add a form.','stepFORM') ?></p>
            <img id="stepFORM-screen-2">
          </div>

          <form action="options.php" id="setoptions" name="setoptions" method="POST">
            <div class="stepFORM-hide">
              <?php
              do_settings_sections('Stepform_settings');
              ?>
            </div>
            <input type="button" id="stepFORM_get_hash" class="button-primary" onclick="stepFORM_getHash()"
            value="<?php echo __('Connect account','stepFORM') ?>">
            <input type="button" id="stepFORM_del_hash" class="button-primary" onclick="stepFORM_delHash()"
            value="<?php echo __('Disconnect account','stepFORM') ?>">
            <?php wp_nonce_field('add_stepFORM_key', '_wp_nonce'); ?>
            <iframe id="stepFORM_get_hash_iframe_wp" src="<?php echo self::LOAD_URL ?>"
              style="display: none;"></iframe>
              <div class="stepFORM-hide">
                <?php
                settings_fields('stepFORM_option_group');
                submit_button();
                ?>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php
    }

    /**
    * Plugin settings page
    */
    public function SettingsPage()
    {
      $check = stepFORM_Core::getForms();
      if ( $check['code'] == 200 ) {
        self::$isKey = true;
      }else {
        self::$isKey = false;
      }

      $this->get_settings();
      register_setting('stepFORM_option_group', 'stepFORM_api_key', array($this, 'sanitize_callback'));
      add_settings_section('section_id', __('General settings','stepFORM'), '', 'Stepform_settings');
      add_settings_field('secret_key', __('Enter your KEY','stepFORM'), array($this, 'secret_key'), 'Stepform_settings', 'section_id');
      add_action('admin_head', array($this, 'settings_header'));

    }

    /**
    * Getting plugin settings
    */
    public function get_settings()
    {
      $key = $this->get_key();
      if ( esc_attr($key) != "" && self::$isKey ) {
        self::$headStyle .= '#stepFORM_get_hash, #stepFORM-content-text {display: none;}';
      } else {
        self::$headStyle .= '#stepFORM_del_hash, #stepFORM-content-instruction {display: none;}';
      }

      add_action('wp_head', array($this, 'head_style'));

      if ( esc_attr($key) != "" && self::$isKey ) {
        self::$headStyle .= '#stepFORM_get_hash, #stepFORM-content-text {display: none;}';
      } else {
        self::$headStyle .= '#stepFORM_del_hash, #stepFORM-content-instruction {display: none;}';
      }
    }

    /**
    * Getting the plugin key
    * @return array
    */
    public function get_key()
    {
      $key = get_option('stepFORM_api_key');
      if ( isset($key['key']) ) {
        $key = $key['key'];
      } else {
        $key = '';
      }
      return $key;
    }

    /**
    * View input the plugin secret key
    * @return [type] [description]
    */
    public function secret_key()
    {
      $key = $this->get_key();
      ?>
      <input id="stepFORM_hash_wp" type="text" name="stepFORM_api_key[key]" value="<?php echo esc_attr($key) ?>">
      <?php
    }

    /**
    * Styles at the head
    * @return mixed
    */
    public function head_style()
    {
      if ( !empty(self::$headStyle) ) {
        echo '<style>' . self::$headStyle . '</style>';
      }
    }

    /**
    * Custom sanitize callback used for all options to allow the use of 'null'.
    * @param  array $options list of options
    * @return array
    */
    public function sanitize_callback( $options )
    {
      check_admin_referer('add_stepFORM_key', '_wp_nonce');
      foreach ( $options as $name => & $value ) {
        if ( $name == 'input' ) {
          $value = esc_attr(strip_tags($value));
        }
      }
      return $options;
    }
  }

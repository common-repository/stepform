<?php

if (!defined('STEPFORM_PLUGIN')) {
  exit();
}

/**
* WordPress Plugin Core
*/
class stepFORM_Core
{

  /**
  * Retrieving form data
  * @var string
  */
  const FORM_URL = 'https://stepform.io/dev/integration/form';

  /**
  * Page Plugins
  */
  public $page;

  /**
  * MCE Editor
  */
  public $MCE;

  /**
  * Register core with WordPress.
  */
  public function __construct()
  {
    add_action( 'widgets_init', array( $this, 'stepFORM_Widget' ) );
    add_action( 'admin_menu', array( $this, 'admin_menu' ) );
    add_filter( 'plugin_action_links_' . plugin_basename( STEPFORM_PLUGIN_NAME . '/stepFORM.php' ),
    array( $this, 'admin_plugin_settings_link' ) );
    add_shortcode( 'stepFORM', array( $this, 'shortcode' ) );
    add_action( 'admin_head', array( $this, 'stepFORM_head' ) );
    add_action( 'init', array( $this, 'addWidgetBlock' ) );
    add_action( 'wp_ajax_stepFORM_load_forms', array( $this, 'stepFORM_load_forms' ));
    add_action( 'admin_footer', array( $this, 'lang' ));
    add_action( 'admin_menu', array( $this, 'adminMenu' ) );
    $this->stepFORM_MCE();
  }


  /**
  * JS objects for translating a plugin
  */
  public function lang()
  {
    echo '
    <script>
    var stepFORM_Lang = {
      loading: \'' . __('Loading...','stepFORM') . '\',
      edit: \'' . __('Manage widget','stepFORM') . '\',
      change: \'' . __('Choose another form','stepFORM') . '\',
      select: \'' . __('Choose','stepFORM') . '\',
      moreText: \'' . __('Show [n] more','stepFORM') . '\',
      createForm: \'' . __('Create form','stepFORM') . '\',
      chooseTitle: \'' . __('Choose a form','stepFORM') . '\',
      apply: \'' . __('Apply','stepFORM') . '\',
    };
    </script>
    ';
  }


  /**
  * Item plugin in admin menu
  */
  public function adminMenu() {
    add_menu_page( 'stepFORM', 'stepFORM', 'edit_others_posts', 'options-general.php?page=stepFORM', '', STEPFORM_PLUGIN_URL. '/assets/menu.png', 777 );
  }

  /**
  * Loading form plugin data
  */
  public function stepFORM_load_forms()
  {
    $response = [
      'status' => 'ok',
      'message' => '',
      'data' => [],
      'settings_link' => admin_url('options-general.php?page=stepFORM'),
    ];

    $forms = self::getForms();

    if ( $forms['code'] === 200 ) {
      $forms = json_decode($forms['response']);
      if ( count($forms) > 0 ) {
        $response['data'] = $forms;
      } else {
        $response['status'] = 'error';
        $response['code'] = 'empty';
        $response['message'] = __('Sorry, you don\'t have any saved forms','stepFORM');
      }
    } else {
      if ( ( $forms === false) || ( $forms['code'] === 400 ) ) {
        $response['status'] = 'error';
        $response['code'] = 'not_settings';
        $response['message'] = __('To add the form, connect your account','stepFORM');

      } else {
        $response['status'] = 'error';
        $response['code'] = 'key_expired';
        $response['message'] = __('Settings have expired. Re-connect your account','stepFORM');
      }
    }
    echo json_encode($response);
    wp_die();
  }

  /**
  * Adding a widget block
  */
  public function addWidgetBlock()
  {
    if ( function_exists('wp_register_script') ) {
      wp_register_script(
        'gutenberg-stepform',
        plugins_url('assets/js/block.js', dirname(__FILE__)),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components')
      );
    }

    if ( function_exists('wp_register_style') ) {
      wp_register_style(
        'gutenberg-stepform',
        plugins_url('assets/css/editor.css', dirname(__FILE__)),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(dirname(__FILE__)) . 'assets/css/editor.css')
      );
    }

    if ( function_exists('register_block_type') ) {
      register_block_type('stepform/block', array(
        'editor_script' => 'gutenberg-stepform',
        'editor_style' => 'gutenberg-stepform',
      ));
    }
  }

  /**
  * Widget registration
  */
  public function stepFORM_Widget()
  {
    register_widget('stepFORM_Widget');
  }

  /**
  * Menu admin
  */
  public function admin_menu()
  {
    $this->page = new stepFORM_Page();
  }

  /**
  * MCE Editor
  */
  public function stepFORM_MCE()
  {
    $this->MCE = new stepFORM_MCE();
  }

  /**
  * Link to admin plugin settings
  * @param  array $links
  * @return array
  */
  public function admin_plugin_settings_link( $links )
  {
    $settings_link = '<a href="' . admin_url('options-general.php?page=stepFORM') . '">' . __('Settings','stepFORM') . '</a>';
    array_unshift( $links, $settings_link );
    return $links;
  }

  /**
  * Plugin styles in head
  */
  public function stepFORM_head()
  {
    ?>
    <script type="text/javascript">
    var stepFORM_popup = '<?php echo admin_url('admin-ajax.php?action=stepFORM_render_forms') ?>';
    </script>
    <?php
  }

  /**
  * Shortcode WordPress plugin
  * @param  string $name
  * @return mixed
  */
  public function shortcode( $name )
  {
    extract( shortcode_atts( array(
      'id' => ''
    ), $name) );

    $forms = self::getForms();

    if ( $forms && $forms['code'] == 200 ) {
      $response = json_decode($forms['response'], true);
      $is_form = false;

      foreach ( $response as $row ) {
        if ( $row['virtual_id'] == $name['id'] ) {
          $is_form = true;
          break;
        }
      }

      if ( $is_form ) {
        $round = rand (1000000, 9999999);

        return '<div class="stepform_' . esc_attr($name['id']) . ' rnd_' . $round . '"></div><script>(function(s, t, e, p, f, o, r, m) { s[t] = s[t] || {}; s[t][' . $round . '] = { id: "' . esc_attr($name['id']) . '", rnd: ' . $round . '}; e.async = true; e.src = p + f; document[m](o)[r](e) } (window,"stepFORM_params",document.createElement("script"),document.location.protocol==="https:"?"https:":"http:","//app.stepform.io/api.js?id=' . esc_attr($name['id']) . '","head","appendChild","querySelector"));</script>';
      } else {
        return '';
      }
    }
    return '';
  }

  /**
  * Getting a list of forms
  * @return array status and response code
  */
  static function getForms()
  {
    $key = get_option('stepFORM_api_key');
    if ( isset($key['key']) ) {
      $key = $key['key'];
    } else {
      $key = '';
    }
    if ( empty($key) ) {
      return false;
    }

    $data = array(
      'headers' => array(
        'application/x-www-form-urlencoded'
      ),
      'body' => array(
        'token' => $key
      )
    );

    $post = wp_remote_post( self::FORM_URL, $data );
    $code = wp_remote_retrieve_response_code( $post );
    $response = wp_remote_retrieve_body( $post );

    return array(
      "code" => $code,
      "response" => $response
    );
  }
}

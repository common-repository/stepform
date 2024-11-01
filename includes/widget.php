<?php

if (!defined('STEPFORM_PLUGIN')) {
  exit();
}

/**
* Class with widget settings
*/
class stepFORM_Widget extends WP_Widget
{

  /**
  * Register widget with WordPress.
  */
  function __construct()
  {
    parent::__construct(
      'stepFORM_id_base',
      __('Your forms','stepFORM'),
      array('description' => __('stepFORM form widget','stepFORM'))
    );
  }

  /**
  * Front-end display of widget.
  * @param array $args     Widget arguments.
  * @param array $instance Saved values from database.
  * @return mixed
  */
  function widget( $args, $instance )
  {
    extract($args);

    if ( !isset($instance['title']) ) {
      $instance['title'] = __('block widget','stepFORM_widget');
    }

    echo $args['before_widget'];
    $name = $instance['name'];

    if ( $name ) {
      $forms = stepFORM_Core::getForms();
      $is_form = false;

      if ( $forms && $forms['code'] == 200 ) {
        $response = json_decode( $forms['response'], true );

        foreach ($response as $row) {
          if ($row['virtual_id'] == $name) {
            $is_form = true;
            break;
          }
        }
      }
      if ( $is_form ) {
        $round = rand (1000000, 9999999);

        printf('<div class="stepform_' . esc_attr( $name ) . ' rnd_' . $round . '"></div><script>(function(s, t, e, p, f, o, r, m) { s[t] = s[t] || {}; s[t][' . $round . '] = { id: "' . esc_attr( $name ) . '", rnd: ' . $round . '}; e.async = true; e.src = p + f; document[m](o)[r](e) } (window,"stepFORM_params",document.createElement("script"),document.location.protocol==="https:"?"https:":"http:","//app.stepform.io/api.js?id=' . esc_attr($name) . '","head","appendChild","querySelector"));</script>');
      } else {
        printf('');
      }
    }
  }

  /**
  * Sanitize widget form values as they are saved.
  * @see WP_Widget::update()
  * @param array $new_instance The new options
  * @param array $old_instance The previous options
  *
  * @return array
  */
  function update( $new_instance, $old_instance )
  {
    $instance = array();
    $instance['name'] = (integer)strip_tags( $new_instance['name'] );

    if ( !empty($new_instance['title']) ) {
      $instance['title'] = esc_attr( strip_tags( $new_instance['title'] ) );
    }else {
      $instance['title'] = '';
    }

    return $instance;
  }


  /**
  * Back-end widget form.
  * @param array $instance Previously saved values from database.
  * @return mixed
  */
  function form( $instance )
  {
    $default = array('name' => __('Form ID','stepFORM'));
    $instance = wp_parse_args((array)$instance, $default); ?>
    <p>
      <label for="<?php echo esc_attr($this->get_field_id('name')); ?>">
        <?php _e(__('Choose the form:','stepFORM'), 'example'); ?>
      </label>
      <?php $forms = stepFORM_Core::getForms();
      $forms = json_decode($forms['response'], true);

      if ( empty($forms) || $forms == 'null' ) {
        echo __('Sorry, you don\'t have any saved forms','stepFORM');
      } elseif ( isset( $forms['status'] ) ) {
        echo __('<br>Configure the plugin','stepFORM');
      } else {
        ?>
        <select name="<?php echo esc_attr( $this->get_field_name('name') ); ?>"
          id="<?php echo esc_attr( $this->get_field_id('name') ); ?> ">
          <option value=""></option>
          <?php
          foreach ( $forms as $row ) {
            if ( $instance['name'] == $row['virtual_id'] ) {
              $selected = 'selected';
            }else {
              $selected = '';
            }
            echo '<option value="' . esc_attr( $row['virtual_id'] ) . '" ' . $selected . '>' . esc_attr( $row['project_name'] ) . '</option>';
          }
          ?></select><?php
        }

        ?>
      </p>

      <?php
    }
  }

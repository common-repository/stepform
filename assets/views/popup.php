<?php
if (!defined('STEPFORM_PLUGIN')){
  exit();
}
?>
  <div style="display:none" id="stepFORM_mce_body">
  <div class="button-dialog">
    <form action="/" method="get" accept-charset="utf-8">
      <div class="inputrow main" style="padding: 10px;">
        <?php if ( $data['code'] == 200 ) {?>
          <label for="button-text"><?php echo  __('Choose the form:','stepFORM') ?></label>
        <?php } ?>
        <div class="inputwrap">
          <?php
          if ( $data['code'] == 200 ) {
            $forms = json_decode($data['response'], true);
            if ( count($forms) > 0 ) { ?>
              <select class="stepFORM_chang_project">
                <option></option>
                <?php
                foreach ( $forms as $row ) {
                  echo '<option value="' . esc_attr($row['virtual_id']) . '">' . esc_attr($row['form_name']) . '</option>';
                }
                ?></select>
              <?php } else { ?>
                <p><?php echo  __('Sorry, you don\'t have any saved forms','stepFORM')?></p>
              <?php }
            }
            else if ( $data['code'] == 400 ) {
              echo __('To add the form, <a href="javascript://" onclick="window.parent.location.href=\'/wp-admin/options-general.php?page=stepFORM\'" id="insert"
                style="display: block; line-height: 24px;">connect your account</a>','stepFORM');
              }
              else if ($data['code'] == 401) {
                echo '<div style="width: 100%; text-align: center;">'. __('Settings have expired','stepFORM') .'</div>
                <a href="javascript://" onclick="window.parent.location.href=\'/wp-admin/options-general.php?page=stepFORM\'" id="insert"
                style="display: block; line-height: 24px;">'. __('Re-connect your account','stepFORM').'</a>';
              }
              else {
                $error = json_decode($data['response'], true);
                echo $error['error'];
              } ?>
            </div>
            <div class="clear"></div>
          </div>

        </form>
      </div>
	</div>
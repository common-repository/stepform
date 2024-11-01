//отредактировано

function getProject(e) {
    var t = {content: "", isSaving: false};
    //$.extend(t, e);
    var r = jQuery("#stepFORM_chang_project option:selected").val();
    var t = jQuery("#stepFORM_chang_project option:selected").text();

    var x = "";
    if (r != '') {
        // если не пусто в тексте
       x = '[stepFORM id='+r+']'
    } else {
        //если пусто в толе текст
        x = ''
    }
    return x
}

var ButtonDialog = {
    local_ed: "ed", init: function (e) {
        ButtonDialog.local_ed = e;
        tinyMCEPopup.resizeToInnerSize();
        var t = top.tinymce.activeEditor.windowManager.getParams();
        $previewButton = jQuery(".preview-button-area .centered-button");
    }, insert: function (t) {
        tinyMCEPopup.execCommand("mceReplaceContent", false, getProject());
        tinyMCEPopup.close()
    }
};
tinyMCEPopup.onInit.add(ButtonDialog.init, ButtonDialog)
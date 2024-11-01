(function ($) {
    "use strict";

    function getCode() {
        var t = {content: "", isSaving: false};
        //$.extend(t, e);
        var r = jQuery(".mce-window .stepFORM_chang_project option:selected").val();

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

    $(function () {
        tinymce.create("tinymce.plugins.stepFORM_edit_button", {
            init: function (n, r) {
                var o = n;
                var u = false;
                var a = {};
                var f = 120;
                var l = 420;

                n.addButton("stepFORM_edit_button", {
                    icon: "stepFORM-ico", tooltip: "stepFORM", onclick: function () {
                        n.windowManager.open({
                            //url: stepFORM_popup,
							body: [{
								type: 'container',
								html: document.getElementById('stepFORM_mce_body').innerHTML
                            }],
                            width: l,
                            height: f,
                            onSubmit: function() {
                                tinyMCE.execCommand("mceReplaceContent", false, getCode());
                            },
                        }, {plugin_url: r});
                    }
                });
            }, createControl: function (e, t) {
                return null
            }, getInfo: function () {
                return {
                    longname: "stepFORM button",
                    author: "stepFORM Team",
                    authorurl: "https://stepform.io/",
                    infourl: "",
                    version: "1.0.0"
                }
            }
        });
        tinymce.PluginManager.add("stepFORM_edit_button", tinymce.plugins.stepFORM_edit_button)
    })
})(jQuery)
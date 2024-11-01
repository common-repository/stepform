/**
 * Manipulate
 */
function stepFORM_getHash() {
    var lang = document.documentElement.lang.substr(0, 2);
    window.open('https://stepform.io/dev/integration?lang='+lang, 'stepFORM_getHash', "width=550, height=600, top=" + ((screen.height - 600) / 2) + ',left=' + ((screen.width - 550) / 2));
}
function stepFORM_setHash(hash) {
    document.getElementById("stepFORM_hash_wp").value = hash;
    document.forms.setoptions.submit.click();
}
function stepFORM_delHash() {
    document.getElementById("stepFORM_hash_wp").value = "";
    document.forms.setoptions.submit.click();
}


/**
 * Crossdomain messaging
 */
function crossdomainCallback(event) {
    event.data.stepFORM && event.data.hash && stepFORM_setHash(event.data.hash);
}

if (window.addEventListener) {
    window.addEventListener("message", crossdomainCallback, false);
} else {
    window.attachEvent("onmessage", crossdomainCallback);
}


/**
 * Set screens
 */
function stepFORM_setSrc(element, num) {
    var lang = document.documentElement.lang.substr(0, 2);
    if (lang != 'ru')
        lang = 'en';

    // TODO - убрать хардкод
    lang = 'en';

    element.setAttribute('src', 'https://stepform.io/static/wp-screen-' + num + '-' + lang + '.png');
}
function stepFORM_initScreen(num) {
    var element = document.getElementById('stepFORM-screen-' + num);
    if (element)
        stepFORM_setSrc(element, num);
}

stepFORM_initScreen(0);
stepFORM_initScreen(1);
stepFORM_initScreen(2);

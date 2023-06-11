browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('(sidebar.js) request.command: ' + request.command);
    // console.log('(sidebar.js) request.translation: ' + request.translation);
    if (request.command === 'show_translation') {
        document.getElementById('translation').textContent = request.translation;
    }
});

document.getElementById('source_lang').addEventListener('change', function () {
    const selectElement = document.getElementById('source_lang');
    const newSourceLang = selectElement.value;
    // console.log('newSourceLang: ' + newSourceLang);
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            selectElement.options[i].selected = false;
        }
        if (selectElement.options[i].value == newSourceLang) {
            selectElement.options[i].selected = true;
        }
    }
    browser.runtime.sendMessage({ "command": "update_source_lang", "newSourceLang": newSourceLang });
});

document.getElementById('target_lang').addEventListener('change', function () {
    const selectElement = document.getElementById('target_lang');
    const newTargetLang = selectElement.value;
    // console.log('newTargetLang: ' + newTargetLang);
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            selectElement.options[i].selected = false;
        }
        if (selectElement.options[i].value == newTargetLang) {
            selectElement.options[i].selected = true;
        }
    }
    browser.runtime.sendMessage({ "command": "update_target_lang", "newTargetLang": newTargetLang });
});

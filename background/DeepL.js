let isMenuEnabled = false;
let deeplAuthKey = 'not registered';
const source_lang = 'EN';
const target_lang = 'JA';

function updateMenu() {
    browser.menus.removeAll();
    if (isMenuEnabled) {
        let parentMenuId = browser.menus.create({
            id: "DeepL_Menu",
            title: "DeepL",
            contexts: ["all"]
        });
        let childMenuId1 = browser.menus.create({
            parentId: parentMenuId,
            id: "DeepL_translate_all",
            title: "translate page",
            contexts: ["all"],
            icons: {
                "16": "icons/translate-all-16.png",
                "32": "icons/translate-all-32.png"
            }
        });
        let childMenuId2 = browser.menus.create({
            parentId: parentMenuId,
            id: "DeepL_translate_selection",
            title: "translate selection",
            contexts: ["all"],
            icons: {
                "16": "icons/translate-selection-16.png",
                "32": "icons/translate-selection-32.png"
            }
        });
    }
}

function sendJsonToCurrentActiveTab(json) {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, json);
    });
}

async function fetchFromDeepL(sentence) {
    const url = 'https://api-free.deepl.com/v2/translate?'
        + 'auth_key=' + deeplAuthKey
        + '&text=' + sentence
        + '&source_lang=' + source_lang
        + '&target_lang=' + target_lang;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.translations[0].text;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "turn_on") {
        isMenuEnabled = true;
        updateMenu();
    } else if (request.command === "turn_off") {
        isMenuEnabled = false;
        updateMenu();
    } else if (request.command === "display_auth_key") {
        let json = { "command": "displayAuthKey", "currentAuthKey": deeplAuthKey };
        sendJsonToCurrentActiveTab(json);
    } else if (request.command === "updateAuthKey") {
        deeplAuthKey = request.newAuthKey;
    }
});

browser.menus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "DeepL_translate_selection") {
        const targetSentence = await browser.tabs.executeScript(tab.id, {
            code: 'window.getSelection().toString();'
        });
        // console.log('targetSentence: ' + targetSentence);
        const translation = await fetchFromDeepL(targetSentence);
        // console.log('translation: ' + translation);
        browser.sidebarAction.setPanel({ panel: 'sidebar/sidebar.html' });
        browser.runtime.sendMessage({ "command": "show_translation", "translation": translation });
    }
});

updateMenu();

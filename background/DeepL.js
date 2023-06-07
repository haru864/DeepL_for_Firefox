let isMenuEnabled = false;
let deeplAuthKey;

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

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "turn_on") {
        isMenuEnabled = true;
        updateMenu();
    } else if (message.command === "turn_off") {
        isMenuEnabled = false;
        updateMenu();
    } else if (message.authKey) {
        deeplAuthKey = message.authKey;
    }
});

browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "DeepL_translate_selection") {
        browser.tabs.executeScript(tab.id, {
            code: 'window.getSelection().toString();'
        })
            .then(result => {
                console.log('Selected text: ' + result[0]);
            });
    }
});

updateMenu();


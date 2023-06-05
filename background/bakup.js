let isMenusEnabled = true;
let menuId = null;

function updateMenus() {

    if (isMenusEnabled) {
        if (menuId === null) {
            menuId = browser.menus.create({
                id: "sample",
                title: "My Menu Item",
                contexts: ["all"]
            });
        }
    } else {
        if (menuId !== null) {
            browser.menus.remove(menuId);
            menuId = null;
        }
    }
}

browser.browserAction.onClicked.addListener(() => {
    isMenusEnabled = !isMenusEnabled;
    updateMenus();
});

console.log('hogehgoe');
updateMenus();

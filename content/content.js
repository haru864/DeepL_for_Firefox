browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'displayAuthKey') {
        let message = 'DeepL Auth Key: ' + request.currentAuthKey + '\n'
            + 'Enter your new authentication key below and click "OK"';
        let newAuthKey = prompt(message);
        if (newAuthKey) {
            browser.runtime.sendMessage({ "command": "updateAuthKey", "newAuthKey": newAuthKey });
        }
    }
});

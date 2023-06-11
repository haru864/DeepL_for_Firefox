browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log('(sidebar.js) request.command: ' + request.command);
    // console.log('(sidebar.js) request.translation: ' + request.translation);
    if (request.command === 'show_translation') {
        document.getElementById('translation').textContent = request.translation;
    }
});

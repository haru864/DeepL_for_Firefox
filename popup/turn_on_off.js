// send DeepL-Auth-Key to background script
browser.runtime.sendMessage({ authKey: getDeeplAuthKey() });

const radioStorageState = JSON.parse(localStorage.getItem("radioStorageState"));
const turnOnRadio = document.getElementById('turn_on');
const turnOffRadio = document.getElementById('turn_off');
let currentRadioState = false;

if (radioStorageState) {
    currentRadioState = radioStorageState;
}

if (currentRadioState == 'on') {
    turnOnRadio.checked = true;
    turnOffRadio.checked = false;
} else if (currentRadioState == 'off') {
    turnOnRadio.checked = false;
    turnOffRadio.checked = true;
}

turnOnRadio.addEventListener('click', () => {
    currentRadioState = 'on';
    localStorage.setItem("radioStorageState", JSON.stringify(currentRadioState));
    browser.runtime.sendMessage({ command: 'turn_on' });
});

turnOffRadio.addEventListener('click', () => {
    currentRadioState = 'off';
    localStorage.setItem("radioStorageState", JSON.stringify(currentRadioState));
    browser.runtime.sendMessage({ command: 'turn_off' });
});

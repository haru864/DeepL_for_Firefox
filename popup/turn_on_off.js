const radioStorageState = JSON.parse(localStorage.getItem("radioStorageState"));
const turnOnRadio = document.getElementById('turn_on');
const turnOffRadio = document.getElementById('turn_off');
let currentRadioState = false;
if (radioStorageState) {
    currentRadioState = radioStorageState;
}
console.log('turnOnRadio: ' + turnOnRadio + ', ' + turnOnRadio.checked);
console.log('turnOffRadio: ' + turnOffRadio + ', ' + turnOffRadio.checked);
console.log('radioStorageState: ' + radioStorageState);
console.log('currentRadioState: ' + currentRadioState);

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
    console.log('(turn on) currentRadioState: ' + currentRadioState);
    console.log('(turn on) radioStorageState: ' + localStorage.getItem("radioStorageState"));
    browser.runtime.sendMessage({ command: 'turn_on' });
});

turnOffRadio.addEventListener('click', () => {
    currentRadioState = 'off';
    localStorage.setItem("radioStorageState", JSON.stringify(currentRadioState));
    console.log('(turn off) currentRadioState: ' + currentRadioState);
    console.log('(turn off) radioStorageState: ' + localStorage.getItem("radioStorageState"));
    browser.runtime.sendMessage({ command: 'turn_off' });
});

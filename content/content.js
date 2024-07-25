/**
 * - Se ejecuta en el contexto de la páginas que visita el usuario
 */

console.log('Hola mundo! desde extensión')

// Agregar el efecto a la página

const toggleClass = () => {
  document.body.classList.toggle('p-red-bg')
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'toggle') {
    toggleClass()
  } else if (request.message === 'dataFromBackground') {
    console.log(request.data)
    alert(
      `Se han consultado: ${
        Array.isArray(request.data) ? request.data.length : 0
      } posts`
    )
  } else if (request.message === 'bluetooh_connect') {
    onRequestBluetoothDeviceButtonClick()
  } else if (request.message === 'bluetooh_disconnect') {
    onForgetBluetoothDeviceButtonClick()
  }
})

function populateBluetoothDevices() {
  // const devicesSelect = document.querySelector('#devicesSelect');
  console.log('Getting existing permitted Bluetooth devices...');
  navigator.bluetooth.getDevices()
  .then(devices => {
    console.log('> Got ' + devices.length + ' Bluetooth devices.');
    console.log('devices', devices)
    devicesSelect.textContent = '';
    // for (const device of devices) {
    //   const option = document.createElement('option');
    //   option.value = device.id;
    //   option.textContent = device.name;
    //   devicesSelect.appendChild(option);
    // }
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

function onRequestBluetoothDeviceButtonClick() {
  console.log('Requesting any Bluetooth device...');
  navigator.bluetooth.requestDevice({
 // filters: [...] <- Prefer filters to save energy & show relevant devices.
    acceptAllDevices: true
  })
  .then(device => {
    console.log('> Requested ' + device.name + ' (' + device.id + ')');
    populateBluetoothDevices();
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

function onForgetBluetoothDeviceButtonClick() {
  navigator.bluetooth.getDevices()
  .then(devices => {
    const deviceIdToForget = document.querySelector('#devicesSelect').value;
    const device = devices.find((device) => device.id == deviceIdToForget);
    if (!device) {
      throw new Error('No Bluetooth device to forget');
    }
    console.log('Forgetting ' + device.name + 'Bluetooth device...');
    return device.forget();
  })
  .then(() => {
    console.log('  > Bluetooth device has been forgotten.');
    populateBluetoothDevices();
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}

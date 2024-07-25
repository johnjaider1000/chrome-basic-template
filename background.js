/**
 * Se ejecuta como un "api", un servicio en background en contexto diferente de las páginas
 * - Gestión de eventos
 * - Almacenamiento y gestión de datos
 * - Comunicación entre el popup y contentScript.js
 * - Tareas periódicas, setInterval o chrome.alarms
 * - Manipulación de red
 */

var platform = typeof browser === 'undefined' ? chrome : browser

platform.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(tab.url)
})

platform.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message === 'count') {
    console.log('Mensaje recibido')

    // Simula una tarea pesada, como una solicitud a una API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        console.log("Datos obtenidos:", data);

        // Envía los datos al content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {message: "dataFromBackground", data: data});
        });
      })
      .catch(error => console.error('Error:', error));
  }
})

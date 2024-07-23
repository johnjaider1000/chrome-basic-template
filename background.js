/**
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
/**
 * Eventos y scripts para el popup
 */
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('#toggleBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "toggle"});
      }
    });
  });

  document.querySelector('#countBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'count'}, (response) => {
      console.log('respuesta recibida del background script:', response)
    })
  });
})

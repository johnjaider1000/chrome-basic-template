/**
 * - Se ejecuta en el contexto de la páginas que visita el usuario
 */

console.log('Hola mundo! desde extensión')

// Agregar el efecto a la página

const toggleClass = () => {
  document.body.classList.toggle('p-red-bg')
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.message === "toggle") {
        toggleClass()
      } else if (request.message === 'dataFromBackground') {
        console.log(request.data)
        alert(`Se han consultado: ${Array.isArray(request.data) ? request.data.length : 0} posts`)
      }
  }
);

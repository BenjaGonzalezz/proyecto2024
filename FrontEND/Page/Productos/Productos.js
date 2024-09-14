document.addEventListener('DOMContentLoaded', function() {
  let nombre = localStorage.getItem('nombre');
  let usuario = localStorage.getItem('usuario');
  let telefono = localStorage.getItem('telefono');
  let email = localStorage.getItem('email');

  // Insertar los valores en elementos HTML, por ejemplo:
  document.getElementById('nombre').textContent = nombre;
  document.getElementById('usuario').textContent = usuario;
  document.getElementById('telefono').textContent = telefono;
  document.getElementById('email').textContent = email;


  // Ocultar las etiquetas con la clase 'desaparecer' si hay datos de usuario
  if (nombre && usuario && telefono && email) {
      // Seleccionar todos los elementos con el id 'desaparecer'
      let desaparecer = document.querySelectorAll('#desaparecer');
      
      // Ocultar cada uno de los elementos seleccionados
      desaparecer.forEach(desaparecer => {
          desaparecer.style.display = 'none';
      });
      let aparecer = document.querySelectorAll('#aparecer');
      
      // Ocultar cada uno de los elementos seleccionados
      aparecer.forEach(aparecer => {
          aparecer.style.display = 'block';
      });
      let aparecer2 = document.querySelectorAll('.aparecer');
      
      // Ocultar cada uno de los elementos seleccionados
      aparecer2.forEach(aparecer2 => {
          aparecer2.style.display = 'block';
      });
  }
  

document.getElementById('cerrarSesion').addEventListener('click', async function(event) {
  event.preventDefault();

      let response = await fetch('http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion');
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      // Limpiar localStorage y redirigir al login
      localStorage.clear();
      mostrarAlerta("Has cerrado sesión correctamente.", () => { // Alerta Personalizada
      window.location.href = '../Login/LoginCliente.html';
  });
});
});


function desplazarDerecha() {
    const contenedor = document.querySelector('.producto-mosquitero');
    contenedor.scrollLeft += 500; // Ajusta este valor según la cantidad de desplazamiento deseado
  }
  
function desplazarIzquierda() {
    const contenedor = document.querySelector('.producto-mosquitero');
    contenedor.scrollLeft -= 500; // Ajusta este valor según la cantidad de desplazamiento deseado
  }
  


  

function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Mostrar el fondo oscuro
    alerta.style.display = 'block'; // Mostrar la alerta

    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Ocultar el fondo oscuro
        alerta.style.display = 'none'; // Ocultar la alerta
        if (callback) {
            callback(); // Ejecutar la función de callback si se proporciona
        }
    }
}

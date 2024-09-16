// Importa la clase SesionDAO desde el archivo ../../dao/SesionDAO.js
import SesionDAO from '../../dao/SesionDAO.js';

// Espera a que todo el contenido de la página se haya cargado
document.addEventListener('DOMContentLoaded', function() {

    // Añade un "listener" para el evento "submit" del formulario con ID "Register"
    document.getElementById("Register").addEventListener("submit", async function(event) {

        // Previene el envío predeterminado del formulario (evita recargar la página)
        event.preventDefault();

        // Obtiene los datos del formulario
        let nombre = document.getElementById("nombre2").value;
        let usuario = document.getElementById("usuario2").value;
        let email = document.getElementById("email2").value;
        let telefono = document.getElementById("telefono2").value;
        let contraseña = document.getElementById("contraseña2").value;

        // Muestra los datos ingresados en la consola para verificar
        console.log('nombre', nombre);
        console.log('usuario', usuario);
        console.log('email', email);
        console.log('telefono', telefono);
        console.log('contraseña', contraseña);

        // Crea una instancia de SesionDAO y llama a la función para registrar el usuario
        let sesionDAO = new SesionDAO();
        let resultado = await sesionDAO.registerUsuario(nombre, usuario, contraseña, email, telefono);

        // Muestra en la consola el resultado del intento de registro
        console.log('Resultado de registro:', resultado);

        // Si el registro es exitoso, muestra una alerta y redirige al login
        if (resultado.success === true) {
            mostrarAlerta("✅Registro Exitoso✅", () => {
                console.log('Intentando redirigir al login...');
                window.location.href = '../Login/LoginCliente.html';
            });
        } else {
            // Si el registro falla, muestra un mensaje de error
            console.log('Registro fallido:', resultado);
            mostrarAlerta2(resultado.message || 'Error en el registro');
        }
    });

    // Añade funcionalidad para mostrar/ocultar la contraseña
    const toggleIcon = document.getElementById('togglePassword');
    toggleIcon.addEventListener('click', function() {
        const passwordInput = document.getElementById('contraseña2');
        // Cambia el tipo de input para mostrar o esconder la contraseña
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.src = '../img/esconder.png'; // Cambia la imagen a "esconder"
        } else {
            passwordInput.type = 'password';
            toggleIcon.src = '../img/ver.png'; // Cambia la imagen a "mostrar"
        }
    });
});

// Función para mostrar una alerta personalizada con un mensaje
function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    // Asigna el mensaje a la alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Muestra el fondo oscuro
    alerta.style.display = 'block'; // Muestra la alerta

    // Cierra la alerta cuando se hace clic en el botón de cerrar
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Oculta el fondo oscuro
        alerta.style.display = 'none'; // Oculta la alerta
        if (callback) {
            callback(); // Ejecuta el callback si se proporciona
        }
    }
}

// Función para mostrar otra alerta personalizada (se usa en caso de error)
function mostrarAlerta2(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro2');
    const alerta = document.getElementById('alertaPersonalizada2');
    const alertaMensaje = document.getElementById('alertaMensaje2');
    const alertaCerrar = document.getElementById('alertaCerrar2');

    // Asigna el mensaje a la alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Muestra el fondo oscuro
    alerta.style.display = 'block'; // Muestra la alerta

    // Cierra la alerta cuando se hace clic en el botón de cerrar
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Oculta el fondo oscuro
        alerta.style.display = 'none'; // Oculta la alerta
        if (callback) {
            callback(); // Ejecuta el callback si se proporciona
        }
    }
}

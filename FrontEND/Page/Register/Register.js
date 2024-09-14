import SesionDAO from '../../dao/SesionDAO.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Register").addEventListener("submit", async function(event) {
        event.preventDefault();

        // Datos del formulario
        let nombre = document.getElementById("nombre2").value;
        let usuario = document.getElementById("usuario2").value;
        let email = document.getElementById("email2").value;
        let telefono = document.getElementById("telefono2").value;
        let contraseña = document.getElementById("contraseña2").value;

        console.log('nombre', nombre);
        console.log('usuario', usuario);
        console.log('email', email);
        console.log('telefono', telefono);
        console.log('contraseña', contraseña);

        // Llama a tu función para registrar el usuario
        let sesionDAO = new SesionDAO();
        let resultado = await sesionDAO.registerUsuario(nombre, usuario, contraseña, email, telefono);

        console.log('Resultado de registro:', resultado);

        if (resultado.success === true) {
            mostrarAlerta("✅Registro Exitoso✅", () => {
            console.log('Intentando redirigir al login...');
            window.location.href = '../Login/LoginCliente.html';
        });
        } else {
            console.log('Registro fallido:', resultado);
            mostrarAlerta2(resultado.message || 'Error en el registro');
        }
    });

    // Funcionalidad para mostrar/ocultar contraseña
    const toggleIcon = document.getElementById('togglePassword');
    toggleIcon.addEventListener('click', function() {
        const passwordInput = document.getElementById('contraseña2');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.src = '../img/esconder.png'; // Cambia la imagen a "ocultar"
        } else {
            passwordInput.type = 'password';
            toggleIcon.src = '../img/ver.png'; // Cambia la imagen a "mostrar"
        }
    });
});




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


function mostrarAlerta2(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro2');
    const alerta = document.getElementById('alertaPersonalizada2');
    const alertaMensaje = document.getElementById('alertaMensaje2');
    const alertaCerrar = document.getElementById('alertaCerrar2');

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

import SesionDAO from '../../dao/SesionDAO.js';

window.onload = () => {
    Registro();
}

function Registro() {

    document.getElementById("Register").addEventListener("submit", async function(event) {

        event.preventDefault();

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

    const toggleIcon = document.getElementById('togglePassword');
    toggleIcon.addEventListener('click', function() {
        const passwordInput = document.getElementById('contraseña2');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.src = '../img/esconder.png';
        } else {
            passwordInput.type = 'password';
            toggleIcon.src = '../img/ver.png';
        }
    });
};

function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block';
    alerta.style.display = 'block';

    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none';
        alerta.style.display = 'none';
        if (callback) {
            callback();
        }
    }
}

function mostrarAlerta2(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro2');
    const alerta = document.getElementById('alertaPersonalizada2');
    const alertaMensaje = document.getElementById('alertaMensaje2');
    const alertaCerrar = document.getElementById('alertaCerrar2');

    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block';
    alerta.style.display = 'block';

    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none';
        alerta.style.display = 'none';
        if (callback) {
            callback();
        }
    }
}
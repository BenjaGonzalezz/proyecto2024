import SesionDAO from '../../dao/SesionDAO.js';


document.getElementById("Login").addEventListener("submit", async function(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario2").value;
    let contraseña = document.getElementById("contraseña2").value;

    console.log('usuario', usuario);
    console.log('contraseña', contraseña);


    let sesionDAO = new SesionDAO();
    let resultado = await sesionDAO.loginUsuario(usuario, contraseña);

    console.log('Resultado de login:', resultado);

    if (resultado.success === true) {
        mostrarAlerta("✅Login Exitoso✅", () => {
        
        // Guardar datos en localStorage

        localStorage.setItem('nombre', resultado.nombre);
        localStorage.setItem('usuario', resultado.usuario);
        localStorage.setItem('telefono', resultado.telefono);
        localStorage.setItem('email', resultado.email);

        window.location.href = '../Inicio/Inicio.html';
    });
    } else {
        console.log('Login fallido:', resultado);
        alert(resultado.message || 'Error en el login');
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

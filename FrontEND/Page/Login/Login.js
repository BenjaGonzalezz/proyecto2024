import SesionDAO from '../../dao/SesionDAO.js';


document.getElementById("Login").addEventListener("submit", async function(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario2").value;
    let contraseña = document.getElementById("contraseña2").value;

    let sesionDAO = new SesionDAO();
    let resultado = await sesionDAO.loginUsuario(usuario, contraseña);


    console.log('Resultado de registro:', resultado);

    if (resultado == true) {
        alert('Login exitoso');
        // Guardar datos en localStorage
        localStorage.setItem('nombre', resultado.nombre);
        localStorage.setItem('usuario', resultado.usuario);
        localStorage.setItem('telefono', resultado.telefono);
        localStorage.setItem('email', resultado.email);
        window.location.href = '../Inicio/Inicio.html';
    } else {
        alert("FALLOOOOO :(");
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
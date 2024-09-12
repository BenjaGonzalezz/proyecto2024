import SesionDAO from '../../dao/SesionDAO.js';

document.getElementById("Login").addEventListener("submit", async function(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;

    // Llama a tu función para iniciar sesión
    let sesionDAO = new SesionDAO();
    let resultado = await sesionDAO.loginUsuario(usuario, contraseña);

    // Maneja la respuesta del servidor
    if (!resultado.success) {
        alert(resultado.message); // Muestra un mensaje de error
    } else {
        alert('Login exitoso'); // Muestra un mensaje de éxito
        window.location.href = '../Inicio/Inicio.html'; // Redirige a la página de inicio
    }
});



// Funcionalidad para mostrar/ocultar contraseña
const toggleIcon = document.getElementById('togglePassword');
toggleIcon.addEventListener('click', function() {
    const passwordInput = document.getElementById('contraseña');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = '../img/esconder.png'; // Cambia la imagen a "ocultar"
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = '../img/ver.png'; // Cambia la imagen a "mostrar"
    }
});
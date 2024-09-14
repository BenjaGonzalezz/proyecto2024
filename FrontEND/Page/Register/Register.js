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
            alert('Registro exitoso');
            console.log('Intentando redirigir al login...');
            window.location.href = '../Login/LoginCliente.html';
        } else {
            console.log('Registro fallido:', resultado);
            alert(resultado.message || 'Error en el registro');
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

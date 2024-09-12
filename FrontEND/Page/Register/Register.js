import SesionDAO from '../../dao/SesionDAO.js'; 

document.getElementById("Register").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    // Obtén los datos del formulario
    let nombre = document.getElementById("nombre").value;
    let usuario = document.getElementById("usuario").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let contraseña = document.getElementById("contraseña").value;

    // Llama a tu función para registrar el usuario
    let sesionDAO = new SesionDAO();
    let resultado = await sesionDAO.registerUsuario(nombre, usuario, contraseña, email, telefono);

    // Maneja la respuesta del servidor
    if (resultado.error) {
        alert(resultado.error); // Muestra un mensaje de error
    } else {
        alert('Registro exitoso'); // Muestra un mensaje de éxito
        window.location.href = '../Login/LoginCliente.html';
    }


});


    // Funcionalidad para mostrar/ocultar contraseña
    const toggleIcon = document.getElementById('togglePassword');
    toggleIcon.addEventListener('click', function () {
        const passwordInput = document.getElementById('contraseña');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.src = '../img/esconder.png'; // Cambia la imagen a "ocultar"
        } else {
            passwordInput.type = 'password';
            toggleIcon.src = '../img/ver.png'; // Cambia la imagen a "mostrar"
        }
    });

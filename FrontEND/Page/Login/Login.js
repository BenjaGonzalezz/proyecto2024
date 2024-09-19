// Importa la clase SesionDAO desde el archivo '../../dao/SesionDAO.js'
import SesionDAO from '../../dao/SesionDAO.js';

window.onload = () => {
    Login();
}

// Definir la función Login que se ejecutará cuando la página cargue
async function Login() {
    // Agrega un evento al formulario de login que se activa cuando se envía
    document.getElementById("Login").addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        // Obtiene los valores del campo de usuario y contraseña
        let usuario = document.getElementById("usuario2").value;
        let contraseña = document.getElementById("contraseña2").value;

        // Muestra en la consola los valores de usuario y contraseña
        console.log('usuario', usuario);
        console.log('contraseña', contraseña);

        // Crea una instancia de SesionDAO para gestionar la sesión
        let sesionDAO = new SesionDAO();

        // Llama al método loginUsuario y espera el resultado
        let resultado = await sesionDAO.loginUsuario(usuario, contraseña);

        // Muestra en la consola el resultado del login
        console.log('Resultado de login:', resultado);

        // Si el login es exitoso
        if (resultado.success === true) {
            // Muestra una alerta de éxito
            mostrarAlerta(`✅ Login Exitoso, Disfruta de nuestro productos ${resultado.usuario} ✅`, () => {

                // Guarda los datos del usuario en el localStorage, incluyendo el rol
                localStorage.setItem('nombre', resultado.nombre);
                localStorage.setItem('usuario', resultado.usuario);
                localStorage.setItem('telefono', resultado.telefono);
                localStorage.setItem('email', resultado.email);
                localStorage.setItem('role', resultado.role); // Guarda el rol

                // Redirige según el rol del usuario
                if (resultado.role === 'admin') {
                    window.location.href = '../Inicio/Inicio.html';
                } else {
                    window.location.href = '../Inicio/Inicio.html';
                }
            });
        } else {
            // Si el login falla, muestra un mensaje de error
            console.log('Login fallido:', resultado);
            mostrarAlerta2(resultado.message || 'Error en el login');
        }
    });
}


// Funcionalidad para mostrar/ocultar la contraseña
const toggleIcon = document.getElementById('togglePassword');
toggleIcon.addEventListener('click', function() {
    const passwordInput = document.getElementById('contraseña2');
    // Si la contraseña está oculta, la muestra
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = '../img/esconder.png'; // Cambia la imagen a "ocultar"
    } else {
        // Si la contraseña está visible, la oculta
        passwordInput.type = 'password';
        toggleIcon.src = '../img/ver.png'; // Cambia la imagen a "mostrar"
    }
});

// Función para mostrar una alerta personalizada
function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    // Muestra el mensaje y los elementos de alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Mostrar el fondo oscuro
    alerta.style.display = 'block'; // Mostrar la alerta

    // Al hacer clic en el botón de cerrar, oculta la alerta
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Ocultar el fondo oscuro
        alerta.style.display = 'none'; // Ocultar la alerta
        if (callback) {
            callback(); // Ejecutar la función de callback si se proporciona
        }
    }
}

// Función para mostrar una segunda alerta personalizada
function mostrarAlerta2(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro2');
    const alerta = document.getElementById('alertaPersonalizada2');
    const alertaMensaje = document.getElementById('alertaMensaje2');
    const alertaCerrar = document.getElementById('alertaCerrar2');

    // Muestra el mensaje y los elementos de alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Mostrar el fondo oscuro
    alerta.style.display = 'block'; // Mostrar la alerta

    // Al hacer clic en el botón de cerrar, oculta la alerta
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Ocultar el fondo oscuro
        alerta.style.display = 'none'; // Ocultar la alerta
        if (callback) {
            callback(); // Ejecutar la función de callback si se proporciona
        }
    }
}

import SesionDAO from '../../dao/SesionDAO.js';

window.onload = () => {
    guardarLocalStorage();
    admin();
    eliminarMiCuenta();
}

const sesionDAO = new SesionDAO(); // Crea una instancia de la clase
function eliminarMiCuenta() {
    const eliminarCuentaBtn = document.getElementById('eliminar-cuenta');

    eliminarCuentaBtn.addEventListener('click', async function(event) {
        event.preventDefault();

        // Mostrar alerta personalizada de confirmación
        mostrarAlertaConfirmacion("¿Estás seguro de que deseas eliminar tu cuenta?", async () => {
            const usuario = localStorage.getItem('usuario');

            try {
                const respuesta = await sesionDAO.eliminarCuenta(usuario);
                if (respuesta.success) {
                    localStorage.clear();
                    mostrarAlertaExito("Tu cuenta ha sido eliminada correctamente.", () => {
                        window.location.href = '../Login/LoginCliente.html'; // Redirige al login
                    });
                } else {
                    mostrarAlertaExito("Ocurrió un error al eliminar tu cuenta. Por favor, inténtalo nuevamente.");
                }
            } catch (error) {
                console.error(error);
                mostrarAlertaExito("Error al eliminar la cuenta. Inténtalo más tarde.");
            }
        });
    });
}

// Espera a que el contenido del documento esté completamente cargado
function guardarLocalStorage() {
    // Recupera los datos del usuario desde el localStorage
    let nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let telefono = localStorage.getItem('telefono');
    let email = localStorage.getItem('email');

    
    document.querySelectorAll('.nombre').forEach(element => {
        element.textContent = nombre;
    });
    
    document.querySelectorAll('.usuario').forEach(element => {
        element.textContent = usuario;
    });

    document.querySelectorAll('.telefono').forEach(element => {
        element.textContent = telefono;
    });

    document.querySelectorAll('.email').forEach(element => {
        element.textContent = email;
    });

    // Si todos los datos de usuario están presentes, oculta elementos con la clase 'desaparecer'
    if (nombre && usuario && telefono && email) {
        // Selecciona todos los elementos con el id 'desaparecer'
        let desaparecer = document.querySelectorAll('#desaparecer');

        // Oculta cada uno de los elementos seleccionados
        desaparecer.forEach(desaparecer => {
            desaparecer.style.display = 'none';
        });

        // Selecciona y muestra los elementos con el id 'aparecer'
        let aparecer = document.querySelectorAll('#aparecer');
        aparecer.forEach(aparecer => {
            aparecer.style.display = 'block';
        });

        // Selecciona y muestra los elementos con la clase 'aparecer'
        let aparecer2 = document.querySelectorAll('.aparecer');
        aparecer2.forEach(aparecer2 => {
            aparecer2.style.display = 'block';
        });
    }

    // Agrega un evento al botón de cerrar sesión
    document.getElementById('cerrarSesion').addEventListener('click', async function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Realiza una solicitud al servidor para cerrar la sesión
        let response = await fetch('http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Limpia el localStorage y redirige al login
        localStorage.clear();
        mostrarAlerta("Has cerrado sesión correctamente.", () => {
            window.location.href = '../Login/LoginCliente.html'; // Redirige al login
        });
    });
}


// Función para mostrar alerta de éxito
function mostrarAlertaExito(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Muestra el fondo oscuro
    alerta.style.display = 'block'; // Muestra la alerta

    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none';
        alerta.style.display = 'none';
        if (callback) {
            callback(); // Ejecuta el callback
        }
    };
}

// Función para mostrar alerta de confirmación
function mostrarAlertaConfirmacion(mensaje, callback) {
    const alerta = document.getElementById('alertaPersonalizada2');
    const alertaMensaje = document.getElementById('alertaMensaje2');
    const alertaCerrar = document.getElementById('alertaCerrar2');
    const alertaConfirmar = document.getElementById('alertaConfirmar');

    alertaMensaje.textContent = mensaje;
    alerta.style.display = 'block';

    alertaCerrar.onclick = function() {
        alerta.style.display = 'none';
    };

    alertaConfirmar.onclick = function() {
        alerta.style.display = 'none';
        if (callback) {
            callback();
        }
    };
}
function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');
    const alertaConfirmar = document.getElementById('alertaConfirmar');

    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block';
    alerta.style.display = 'block';

    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none';
        alerta.style.display = 'none';
    };


    alertaConfirmar.onclick = function() {
        fondoOscuro.style.display = 'none';
        alerta.style.display = 'none';
        if (callback) {
            callback();
        }
    };
}

// Espera a que el contenido del documento esté completamente cargado
function admin() {
    // Recupera el rol del usuario desde el localStorage
    const role = localStorage.getItem('role');
    // Muestra/oculta elementos según el rol del usuario
    if (role === 'user') {

        document.querySelectorAll('.aparecerU').forEach(element => {
            element.style.display = 'block';
        });

    }
    // Muestra/oculta elementos según el rol del usuario
    if (role === 'admin') {
        // Añade una clase al body para estilos específicos de admin
        document.body.classList.add('admin-body');

        // Muestra los elementos específicos para admin
        document.querySelectorAll('.aparecerAdmin').forEach(element => {
            element.style.display = 'block';
        });

        // Oculta los elementos específicos que no deberían verse para admin
        document.querySelectorAll('.desaparecerAdmin').forEach(element => {
            element.style.display = 'none';
        });
    } else {
        // Si no es administrador, remueve la clase 'admin-body'
        document.body.classList.remove('admin-body');
    }
}
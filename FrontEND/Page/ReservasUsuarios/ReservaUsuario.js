import ReservaDAO from '../../dao/ReservaDAO.js';

// Cargar las reservas cuando se cargue la página
window.onload = () => {
    mostrarReservas();
    guardarLocalStorage();
}

// Crear una instancia de ReservaDAO
const reservaDAO = new ReservaDAO();


// Espera a que el contenido del documento esté completamente cargado
function guardarLocalStorage() {
    // Recupera los datos del usuario desde el localStorage
    let nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let telefono = localStorage.getItem('telefono');
    let email = localStorage.getItem('email');

    // Inserta los valores recuperados en los elementos HTML correspondientes
    document.getElementById('nombre').textContent = nombre;
    document.getElementById('usuario').textContent = usuario;
    document.getElementById('telefono').textContent = telefono;
    document.getElementById('email').textContent = email;

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
};

// Función para mostrar una alerta personalizada
function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    // Configura el mensaje y muestra la alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Muestra el fondo oscuro
    alerta.style.display = 'block'; // Muestra la alerta

    // Al hacer clic en cerrar, oculta la alerta
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Oculta el fondo oscuro
        alerta.style.display = 'none'; // Oculta la alerta
        if (callback) {
            callback(); // Ejecuta el callback si se proporciona
        }
    }
}

// Función para mostrar reservas del usuario que ha iniciado sesión
async function mostrarReservas() {
    // Obtener el nombre de usuario del localStorage
    const usuario = localStorage.getItem('usuario');
    
    if (!usuario) {
        console.error('Usuario no encontrado en localStorage');
        return;
    }

        // Obtener reservas del usuario
        let resultado = await reservaDAO.obtenerReservaUsuario(usuario);

        // Verificar el estado de la respuesta
        if (resultado.status === 'success') {
            // Obtener el contenedor donde se mostrarán las reservas
            const reservasContainer = document.getElementById('reservas-container');

            // Limpiar el contenedor
            reservasContainer.innerHTML = '';

            // Iterar sobre las reservas y agregarlas al contenedor
            resultado.data.forEach(reserva => {
                // Crear un elemento para cada reserva
                const reservaElement = document.createElement('div');
                reservaElement.classList.add('reserva-item');

                // Agregar detalles de la reserva al elemento
                reservaElement.innerHTML = `
                    <p>ID Reserva: ${reserva.id_reserva}</p>
                    <p>Estado: ${reserva.estado}</p>
                    <p>Fecha Reserva: ${reserva.fecha_reserva}</p>
                    <p>Fecha Límite: ${reserva.fecha_limite}</p>
                `;

                // Agregar el elemento de reserva al contenedor
                reservasContainer.appendChild(reservaElement);
            });
        } else {
            // Manejar el caso de error
            console.error('Error al obtener reservas:', resultado.message);
        }
}
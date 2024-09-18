import ReservaDAO from '../../dao/ReservaDAO.js';

const reservaDAO = new ReservaDAO();

window.onload = () => {
    mostrarReservas();
    admin();
    guardarLocalStorage();

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
}

async function mostrarReservas() {
    try {
        // Obtener todas las reservas
        let resultado = await reservaDAO.obtenerReservas();

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
                    <p>Usuario: ${reserva.usuario_cliente}</p>
                `;

                // Agregar el elemento de reserva al contenedor
                reservasContainer.appendChild(reservaElement);
            });
        } else {
            // Manejar el caso de error
            console.error('Error al obtener reservas:', resultado.message);
        }
    } catch (error) {
        // Manejar cualquier error en la solicitud
        console.error('Error en la solicitud:', error.message);
    }
}

// Función para manejar el envío del formulario de cambio de estado
async function CambiarEstado(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const id_reserva = document.getElementById('id_reserva').value;
    const nuevo_estado = document.getElementById('nuevo_estado').value;

    try {
        // Llamar al método cambiarEstado de ReservaDAO
        let resultado = await reservaDAO.cambiarEstado(id_reserva, nuevo_estado);

        // Verificar el estado de la respuesta
        if (resultado.status === 'success') {
            alert('Estado de reserva cambiado exitosamente');
            // Volver a cargar las reservas para reflejar el cambio
            mostrarReservas();
        } else {
            alert('Error al cambiar el estado: ' + resultado.message);
        }
    } catch (error) {
        // Manejar cualquier error en la solicitud
        console.error('Error en la solicitud:', error.message);
        alert('Error al cambiar el estado');
    }
}

// Asociar la función CambiarEstado al envío del formulario
const formulario = document.getElementById('cambiar-estado-form');
if (formulario) {
    formulario.addEventListener('submit', CambiarEstado);
}




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
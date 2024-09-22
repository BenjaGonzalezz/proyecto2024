import ReservaDAO from '../../dao/ReservaDAO.js';

const reservaDAO = new ReservaDAO();

window.onload = () => {
    mostrarReservas();
    admin();
    guardarLocalStorage();
    verificarAcceso();
}

function verificarAcceso() {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        mostrarAlerta('❌⚠ LO QUE ESTAS HACIENDO ES ILEGAL ⚠❌', () => {
            window.location.href = '../Inicio/Inicio.html';
        });
    }
}

async function mostrarReservas() {
    try {
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

function guardarLocalStorage() {
    let nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let telefono = localStorage.getItem('telefono');
    let email = localStorage.getItem('email');

    document.getElementById('nombre').textContent = nombre;
    document.getElementById('usuario').textContent = usuario;
    document.getElementById('telefono').textContent = telefono;
    document.getElementById('email').textContent = email;

    if (nombre && usuario && telefono && email) {
        let desaparecer = document.querySelectorAll('#desaparecer');
        desaparecer.forEach(desaparecer => {
            desaparecer.style.display = 'none';
        });

        let aparecer = document.querySelectorAll('#aparecer');
        aparecer.forEach(aparecer => {
            aparecer.style.display = 'block';
        });

        let aparecer2 = document.querySelectorAll('.aparecer');
        aparecer2.forEach(aparecer2 => {
            aparecer2.style.display = 'block';
        });
    }
    
    document.getElementById('cerrarSesion').addEventListener('click', async function(event) {
        event.preventDefault(); 

        let response = await fetch('http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        localStorage.clear();
        mostrarAlerta("Has cerrado sesión correctamente.", () => {
            window.location.href = '../Login/LoginCliente.html';
        });
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


function admin() {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
        document.body.classList.add('admin-body');
        
        document.querySelectorAll('.aparecerAdmin').forEach(element => {
            element.style.display = 'block';
        });
        document.querySelectorAll('.desaparecerAdmin').forEach(element => {
            element.style.display = 'none';
        });
    } else {
        document.body.classList.remove('admin-body');
    }
};


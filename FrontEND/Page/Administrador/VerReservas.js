import ReservaDAO from '../../dao/ReservaDAO.js';
import origin from "../../BackEND/Origin/Origin";

const reservaDAO = new ReservaDAO();

window.onload = () => {
    mostrarReservas();
    admin();
    guardarLocalStorage();
    verificarAcceso();
    filtrarEstadoReserva();
}

function verificarAcceso() {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        mostrarAlerta('❌⚠ LO QUE ESTAS HACIENDO ES ILEGAL ⚠❌', () => {
            window.location.href = '../Inicio/Inicio.html';
        });
    }
}
function filtrarEstadoReserva() {
    const filtrarEstadoBtn = document.getElementById('filtrarEstadoBtn');
    filtrarEstadoBtn.addEventListener('click', function() {
        const estadoSeleccionado = document.getElementById('estadoFiltro').value;
        mostrarReservas(estadoSeleccionado); // Llama con el estado seleccionado
    });
}
async function mostrarReservas(estado = "") {
    try {
        let resultado = await reservaDAO.obtenerReservas();

        if (resultado.status === 'success') {
            const reservasContainer = document.getElementById('reservas-container');
            reservasContainer.innerHTML = '';

            // Filtra las reservas si se selecciona un estado
            const reservasFiltradas = estado 
                ? resultado.data.filter(reserva => reserva.estado === estado)
                : resultado.data;

            reservasFiltradas.forEach(reserva => {
                const reservaElement = document.createElement('tr');
                reservaElement.classList.add('reserva-item');

                reservaElement.innerHTML = `
                    <td>${reserva.id_reserva}</td>
                    <td>${reserva.estado}</td>
                    <td>${reserva.fecha_reserva}</td>
                    <td>${reserva.fecha_limite}</td>
                    <td>${reserva.usuario_cliente}</td>
                `;

                reservasContainer.appendChild(reservaElement);
            });
        } else {
            console.error('Error al obtener reservas:', resultado.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
}


async function CambiarEstado(event) {
    event.preventDefault();

    const id_reserva = document.getElementById('id_reserva').value;
    const nuevo_estado = document.getElementById('nuevo_estado').value;

    try {
        let resultado = await reservaDAO.cambiarEstado(id_reserva, nuevo_estado);

        if (resultado.status === 'success') {
            mostrarAlerta('Estado de reserva cambiado exitosamente');
            mostrarReservas();
        } else {
            mostrarAlerta('Error al cambiar el estado: ' + resultado.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        alert('Error al cambiar el estado');
    }
}

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

        let response = await fetch( origin + '/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion');
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
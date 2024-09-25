import ReservaDAO from '../../dao/ReservaDAO.js';
import CarritoDAO from "../../dao/CarritoDAO.js";

const carritoDAO = new CarritoDAO();

window.onload = () => {
    mostrarReservas();
    guardarLocalStorage();
    mostrarProductosCarrito();
    admin();
}

function mostrarProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoContainer = document.getElementById("productos-carrito");

    carritoContainer.innerHTML = "";

    carrito.forEach((producto, index) => {
        const productoCarritoDiv = document.createElement("div");
        productoCarritoDiv.classList.add("producto-carrito");

        productoCarritoDiv.innerHTML = `
            <p class="p-carrito">${producto.nombre} (Cantidad: ${producto.cantidad})</p>
            <p class="p-carrito">Precio: $${producto.precio}</p>
        `;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("botonEliminar");

        botonEliminar.addEventListener("click", () => {
            eliminarProductoDelCarrito(index);
        });

        productoCarritoDiv.appendChild(botonEliminar);
        carritoContainer.appendChild(productoCarritoDiv);
    });

    if (carrito.length > 0) {
        const botonSolicitarReserva = document.createElement("button");
        botonSolicitarReserva.textContent = "Solicitar Reserva";
        botonSolicitarReserva.classList.add("botonSolicitarReserva");

        botonSolicitarReserva.addEventListener("click", async () => {
            try {
                const usuario_cliente = localStorage.getItem("usuario") || "nombreDelUsuario";
                const resultado = await carritoDAO.solicitarReservaCarrito(carrito, usuario_cliente);

                if (resultado.success) {
                    // Limpiar el carrito en el localStorage
                    localStorage.removeItem("carrito");

                    // Volver a mostrar el carrito vacío
                    mostrarProductosCarrito();

                    // Mostrar mensaje de éxito
                    alert(resultado.message);
                } else {
                    console.error("Error del servidor:", resultado.message);
                    alert(resultado.message);
                }
            } catch (error) {
                console.error("Error en la solicitud de reserva:", error);
                alert("Hubo un error al procesar la solicitud.");
            }
        });

        carritoContainer.appendChild(botonSolicitarReserva);
    }
}

function eliminarProductoDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarProductosCarrito();
}



const reservaDAO = new ReservaDAO();


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

async function mostrarReservas() {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
        console.error('Usuario no encontrado en localStorage');
        return;
    }
    let resultado = await reservaDAO.obtenerReservaUsuario(usuario);

    if (resultado.status === 'success') {
        const reservasContainer = document.getElementById('reservas-container');

        reservasContainer.innerHTML = '';

        resultado.data.forEach(reserva => {
            const reservaElement = document.createElement('div');
            reservaElement.classList.add('reserva-item');

            reservaElement.innerHTML = `
                    <p>ID Reserva: ${reserva.id_reserva}</p>
                    <p>Estado: ${reserva.estado}</p>
                    <p>Fecha Reserva: ${reserva.fecha_reserva}</p>
                    <p>Fecha Límite: ${reserva.fecha_limite}</p>
                `;

            reservasContainer.appendChild(reservaElement);
        });
    } else {
        console.error('Error al obtener reservas:', resultado.message);
    }
}

function admin() {
    const role = localStorage.getItem('role');
    if (role === 'user') {

        document.querySelectorAll('.aparecerU').forEach(element => {
            element.style.display = 'block';
        });

    }
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
}
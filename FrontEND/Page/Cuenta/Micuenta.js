import SesionDAO from '../../dao/SesionDAO.js';
import CarritoDAO from "../../dao/CarritoDAO.js";

const carritoDAO = new CarritoDAO();


window.onload = () => {
    guardarLocalStorage();
    admin();
    eliminarMiCuenta();
    mostrarProductosCarrito();
}

const sesionDAO = new SesionDAO();



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

                    mostrarProductosCarrito();

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

function eliminarMiCuenta() {
    const eliminarCuentaBtn = document.getElementById('eliminar-cuenta');

    eliminarCuentaBtn.addEventListener('click', async function(event) {
        event.preventDefault();

        mostrarAlertaConfirmacion("¿Estás seguro de que deseas eliminar tu cuenta?", async() => {
            const usuario = localStorage.getItem('usuario');

            try {
                const respuesta = await sesionDAO.eliminarCuenta(usuario);
                if (respuesta.success) {
                    localStorage.clear();
                    mostrarAlertaExito("Tu cuenta ha sido eliminada correctamente.", () => {
                        window.location.href = '../Login/LoginCliente.html';
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

function guardarLocalStorage() {

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
        mostrarAlertaExito("Has cerrado sesión correctamente.", () => {
            window.location.href = '../Login/LoginCliente.html';
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
    fondoOscuro.style.display = 'block';
    alerta.style.display = 'block';

    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none';
        alerta.style.display = 'none';
        if (callback) {
            callback();
        }
    };
}

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
import ProductosDAO from "../../dao/ProductosDAO.js";
import CarritoDAO from "../../dao/CarritoDAO.js";
import { agregarProductoAlCarrito } from "../Productos/Productos.js";

window.onload = () => {
    ProductoSeleccionado();
    admin();
    guardarLocalStorage();
    mostrarProductosCarrito();
};

function mostrarProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoContainer = document.getElementById("productos-carrito");

    carritoContainer.innerHTML = "";

    carrito.forEach((producto, index) => {
        const productoCarritoDiv = document.createElement("div");
        productoCarritoDiv.classList.add("producto-carrito");

        productoCarritoDiv.innerHTML = `
            <div class="cada-producto">
            <div class="img-carrito-container">
                <img class="img-producto-carrito" src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="150">
            </div>
            <div style=" width: 150px; ">
                <p>${producto.nombre}</p>
                <p style="font-size: 15px;"> Cantidad: ${producto.cantidad} </p>
            </div>
            <p class="p-carrito">$${producto.precio}</p>
            </div>
        `;


        const divCadaProducto = productoCarritoDiv.querySelector(".cada-producto");

        const botonEliminar = document.createElement("img");
        botonEliminar.src = "../img/basura.png"; 
        botonEliminar.alt = "Eliminar";
        botonEliminar.classList.add("botonEliminar");
        botonEliminar.style.cursor = "pointer"; 

        botonEliminar.addEventListener("click", () => {
            eliminarProductoDelCarrito(index);
        });

        divCadaProducto.appendChild(botonEliminar);

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

function ProductoSeleccionado(){
    const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

    if (producto) {
        document.getElementById("mostrar-nombre").innerHTML = `<h2>${producto.nombre}</h2>`;
        document.getElementById("mostrar-precio").innerHTML = `<h3>$${producto.precio}</h3>`;
        document.getElementById("mostrar-stock").innerHTML = `<h5>Stock: ${producto.stock}</h5>`;
        document.getElementById("mostrar-color").innerHTML = `<h5>Color: ${producto.color}</h5>`;
        document.getElementById("mostrar-img").innerHTML = `
            <img src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="100%" height="100%">
        `;

        // Aquí se agrega el event listener para el botón
        const agregarCarritoBtn = document.getElementById("agregar-carrito-btn");
        agregarCarritoBtn.onclick = () => {
            agregarProductoSeleccionadoAlCarrito();
        };
    } else {
        console.error("No se encontró el producto seleccionado.");
    }
}

function agregarProductoSeleccionadoAlCarrito() {
    const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));
    if (producto) {
        agregarProductoAlCarrito(producto);
        mostrarAlerta(`Agregado al carrito: ${producto.nombre}`, null); // Muestra una alerta cuando se agrega
    } else {
        console.error("No se encontró el producto seleccionado.");
    }
}


function guardarLocalStorage() {
    let nombre = localStorage.getItem("nombre");
    let usuario = localStorage.getItem("usuario");
    let telefono = localStorage.getItem("telefono");
    let email = localStorage.getItem("email");

    document.getElementById("nombre").textContent = nombre;
    document.getElementById("usuario").textContent = usuario;
    document.getElementById("telefono").textContent = telefono;
    document.getElementById("email").textContent = email;

    if (nombre && usuario && telefono && email) {
        let desaparecer = document.querySelectorAll("#desaparecer");

        desaparecer.forEach((desaparecer) => {
            desaparecer.style.display = "none";
        });

        let aparecer = document.querySelectorAll("#aparecer");
        aparecer.forEach((aparecer) => {
            aparecer.style.display = "block";
        });

        let aparecer2 = document.querySelectorAll(".aparecer");
        aparecer2.forEach((aparecer2) => {
            aparecer2.style.display = "block";
        });
    }

    document.getElementById("cerrarSesion")
        .addEventListener("click", async function(event) {
            event.preventDefault();

            let response = await fetch(
                "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion"
            );
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            localStorage.clear();
            mostrarAlerta("Has cerrado sesión correctamente.", () => {
                window.location.href = "../Login/LoginCliente.html";
            });
        });
}

function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById("fondoOscuro");
    const alerta = document.getElementById("alertaPersonalizada");
    const alertaMensaje = document.getElementById("alertaMensaje");
    const alertaCerrar = document.getElementById("alertaCerrar");

    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = "block";
    alerta.style.display = "block";
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = "none";
        alerta.style.display = "none";
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

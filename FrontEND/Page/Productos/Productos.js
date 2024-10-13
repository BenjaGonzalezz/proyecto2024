import ProductosDAO from "../../dao/ProductosDAO.js";
import CarritoDAO from "../../dao/CarritoDAO.js";

const carritoDAO = new CarritoDAO();

window.onload = () => {
    mostrarProductoCategoria();
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

export function agregarProductoAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find((item) => item.id_producto === producto.id_producto);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarAlerta("Producto agregado al carrito.", () => {
        mostrarProductosCarrito();
    });
}

function eliminarProductoDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarProductosCarrito();
}

async function mostrarProductoCategoria() {
    const productosDAO = new ProductosDAO();
    const contenedores = document.querySelectorAll(".todos-productos > div > .productos-categoria");

    const resultado = await productosDAO.obtenerProductos();
    console.log("Resultado de obtenerProductos:", resultado);

    if (resultado.success) {
        const productos = resultado.productos;
        const categorias = ["mosquitero", "ventana", "puerta", "mampara", "pañofijo", "monoblock", "vidrio"];

        categorias.forEach((categoria) => {
            const productosCategoria = productos.filter(
                (producto) => producto.categoria === categoria
            );
            const contenedor = Array.from(contenedores).find(
                (div) => div.dataset.categoria === categoria
            );

            if (productosCategoria.length > 0) {
                productosCategoria.forEach((producto) => {
                    const productoDiv = document.createElement("div");
                    productoDiv.classList.add("producto-item");
                    productoDiv.innerHTML = `
                    <a class="link-detalle-producto" href="../ProductosDetalles/DetalleProducto.html" style="text-decoration: none; color:black;">
                        <h3>${producto.nombre}</h3>
                        <div class="parrafo-y-img">
                            <div class="img-contenedor">
                                <img class="img-producto" src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="150">
                            </div>
                        </div>
                    </a>
                    <button class="botonAgregarCarrito aparecer">Agregar al Carrito</button>
                    `;

                    const botonAgregar = productoDiv.querySelector(".botonAgregarCarrito");
                    botonAgregar.addEventListener("click", () => {
                        agregarProductoAlCarrito(producto);
                    });

                    const linkDetalleProducto = productoDiv.querySelector(".link-detalle-producto");
                    linkDetalleProducto.addEventListener("click", () => {

                        localStorage.setItem("productoSeleccionado", JSON.stringify(producto));
                    });

                    contenedor.appendChild(productoDiv);
                });
            } else {
                contenedor.innerHTML = "<p>No hay productos en esta categoría.</p>";
            }
        });
    } else {
        console.error("Error al obtener productos:", resultado.message);
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

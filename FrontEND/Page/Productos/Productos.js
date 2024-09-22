import ProductosDAO from "../../dao/ProductosDAO.js";
import CarritoDAO from "../../dao/CarritoDAO.js";

// Crear una instancia de CarritoDAO
const carritoDAO = new CarritoDAO();

window.onload = () => {
    mostrarProductoCategoria();
    admin();
    guardarLocalStorage();
    mostrarProductosCarrito();
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

        // Crear el botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("botonEliminar");

        // Añadir evento al botón de eliminar
        botonEliminar.addEventListener("click", () => {
            eliminarProductoDelCarrito(index);
        });

        productoCarritoDiv.appendChild(botonEliminar);
        carritoContainer.appendChild(productoCarritoDiv);
    });

    // Agregar el botón de solicitar reserva si hay productos en el carrito
    if (carrito.length > 0) {
        const botonSolicitarReserva = document.createElement("button");
        botonSolicitarReserva.textContent = "Solicitar Reserva";
        botonSolicitarReserva.classList.add("botonSolicitarReserva");

        botonSolicitarReserva.addEventListener("click", async () => {
            try {
                const usuario_cliente = "nombreDelUsuario"; // Obtener de manera dinámica
                const resultado = await CarritoDAO.solicitarReservaCarrito({
                    usuario_cliente,
                    id_producto: carrito[0].id_producto // Suponiendo que tienes el id_producto en el carrito
                });

                if (resultado.success) {
                    mostrarProductosCarrito(); // Actualizar la vista del carrito
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

function agregarProductoAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya esta en el carrito
    const productoExistente = carrito.find((item) => item.id_producto === producto.id_producto);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1; // Si el producto no está en el carrito, agrega 1
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
                    <a href="../ProductosDetalles/Mamparas/Mampara1.html" style="text-decoration: none; color:black;">
                        <h3>${producto.nombre}</h3>
                        <div class="parrafo-y-img">
                            <div class="img-contenedor">
                                <img class="img-producto" src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="150">
                            </div>
                            <div class="p-contenedor">
                                <p class="P-producto">Precio: $ ${producto.precio}</p>
                                <p class="P-producto">Stock: ${producto.stock}</p>
                                <p class="P-producto">Color: ${producto.color}</p>
                                <p class="P-producto">Medida: ${producto.medida}</p>
                            </div>
                        </div>
                    </a>
                    <button class="botonAgregarCarrito aparecer">Agregar al Carrito</button>
                    `;

                    // Agregar evento para añadir producto al carrito
                    const botonAgregar = productoDiv.querySelector(".botonAgregarCarrito");
                    botonAgregar.addEventListener("click", () => {
                        agregarProductoAlCarrito(producto);
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
    // Cargar los datos del usuario desde el localStorage
    let nombre = localStorage.getItem("nombre");
    let usuario = localStorage.getItem("usuario");
    let telefono = localStorage.getItem("telefono");
    let email = localStorage.getItem("email");

    // Insertar los valores en los elementos HTML correspondientes
    document.getElementById("nombre").textContent = nombre;
    document.getElementById("usuario").textContent = usuario;
    document.getElementById("telefono").textContent = telefono;
    document.getElementById("email").textContent = email;

    // Si hay datos de usuario, oculta los elementos con la clase 'desaparecer'
    if (nombre && usuario && telefono && email) {
        let desaparecer = document.querySelectorAll("#desaparecer");

        // Ocultar cada uno de los elementos seleccionados
        desaparecer.forEach((desaparecer) => {
            desaparecer.style.display = "none";
        });

        // Mostrar los elementos con la clase 'aparecer'
        let aparecer = document.querySelectorAll("#aparecer");
        aparecer.forEach((aparecer) => {
            aparecer.style.display = "block";
        });

        let aparecer2 = document.querySelectorAll(".aparecer");
        aparecer2.forEach((aparecer2) => {
            aparecer2.style.display = "block";
        });
    }

    // Manejar el evento de cierre de sesión
    document.getElementById("cerrarSesion")
    .addEventListener("click", async function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace

            // Enviar la solicitud para cerrar sesión al servidor
            let response = await fetch(
                "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion"
            );

            // Verifica si la respuesta del servidor es correcta
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }

            // Limpiar el localStorage y redirigir al login
            localStorage.clear();
            mostrarAlerta("Has cerrado sesión correctamente.", () => {
                window.location.href = "../Login/LoginCliente.html";
            });
        });
}
    // Función para mostrar una alerta personalizada
    function mostrarAlerta(mensaje, callback) {
        const fondoOscuro = document.getElementById("fondoOscuro");
        const alerta = document.getElementById("alertaPersonalizada");
        const alertaMensaje = document.getElementById("alertaMensaje");
        const alertaCerrar = document.getElementById("alertaCerrar");

        alertaMensaje.textContent = mensaje;
        fondoOscuro.style.display = "block"; // Mostrar el fondo oscuro
        alerta.style.display = "block"; // Mostrar la alerta

        // Cerrar la alerta cuando se hace clic en el botón de cerrar
        alertaCerrar.onclick = function () {
            fondoOscuro.style.display = "none"; // Ocultar el fondo oscuro
            alerta.style.display = "none"; // Ocultar la alerta
            if (callback) {
                callback(); // Ejecutar la función de callback si se proporciona
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

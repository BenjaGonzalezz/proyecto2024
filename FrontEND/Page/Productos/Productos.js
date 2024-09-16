// Importa la clase ProductosDAO desde el archivo "../../dao/ProductosDAO.js"
import ProductosDAO from "../../dao/ProductosDAO.js";

// Espera a que el contenido del documento esté completamente cargado
document.addEventListener("DOMContentLoaded", async function () {
    const productosDAO = new ProductosDAO(); // Crea una instancia de ProductosDAO
    const contenedores = document.querySelectorAll(".todos-productos > div > .productos-categoria"); // Selecciona los contenedores de productos por categoría

    // Llama a la función para obtener los productos desde el servidor
    const resultado = await productosDAO.obtenerProductos();
    console.log("Resultado de obtenerProductos:", resultado); // Muestra el resultado en la consola para verificar

    // Verifica si la solicitud fue exitosa
    if (resultado.success) {
        const productos = resultado.productos; // Extrae la lista de productos del resultado
        const categorias = [
            "mosquitero",
            "ventana",
            "puerta",
            "mampara",
            "pañofijo",
            "monoblock",
            "vidrio",
        ]; // Lista de categorías de productos

        // Recorre cada categoría y filtra los productos que pertenecen a esa categoría
        categorias.forEach((categoria) => {
            const productosCategoria = productos.filter(
                (producto) => producto.categoria === categoria
            );
            const contenedor = Array.from(contenedores).find(
                (div) => div.dataset.categoria === categoria
            ); // Busca el contenedor correspondiente a la categoría

            // Si hay productos en esa categoría, los muestra en el contenedor
            if (productosCategoria.length > 0) {
                productosCategoria.forEach((producto) => {
                    const productoDiv = document.createElement("div"); // Crea un div para cada producto
                    productoDiv.classList.add("producto-item"); // Añade una clase al div
                    productoDiv.innerHTML = `
                        <h3>${producto.nombre}</h3>
                        <div class="parrafo-y-img">
                            <div class="img-contenedor">
                                <a href="">
                                    <img class="img-producto" src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="150">
                                </a>
                            </div>
                            <div class="p-contenedor">
                                <p class="P-producto">Precio: $ ${producto.precio}</p>
                                <p class="P-producto">Stock: ${producto.stock}</p>
                                <p class="P-producto">Color: ${producto.color}</p>
                                <p class="P-producto">Medida: ${producto.medida}</p>
                            </div>
                        </div>
                        <button class="botonAgregarCarrito aparecer">Agregar al Carrito</button>
                    `; // Inserta el contenido HTML del producto
                    contenedor.appendChild(productoDiv); // Añade el producto al contenedor
                });
            } else {
                // Si no hay productos en esa categoría, muestra un mensaje
                contenedor.innerHTML = "<p>No hay productos en esta categoría.</p>";
            }
        });
    } else {
        // Si hay un error al obtener productos, muestra un mensaje de error en la consola
        console.error("Error al obtener productos:", resultado.message);
    }

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
    document
        .getElementById("cerrarSesion")
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
});

// Espera a que el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el rol del usuario desde el localStorage
    const role = localStorage.getItem('role');

    // Si el rol es 'admin', mostrar elementos específicos para administradores
    if (role === 'admin') {
        document.body.classList.add('admin-body'); // Añadir una clase para estilos de admin

        // Mostrar elementos específicos para administradores
        document.querySelectorAll('.aparecerAdmin').forEach(element => {
            element.style.display = 'block';
        });

        // Ocultar elementos que no deberían aparecer para administradores
        document.querySelectorAll('.desaparecerAdmin').forEach(element => {
            element.style.display = 'none';
        });
    } else {
        // Si no es administrador, remover la clase de admin
        document.body.classList.remove('admin-body');
    }
});

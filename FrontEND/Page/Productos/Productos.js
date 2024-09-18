import ProductosDAO from "../../dao/ProductosDAO.js";

window.onload = () => {
    mostrarProductoCategoria();
    admin();
    guardarLocalStorage();
}

// Espera a que el contenido del documento esté completamente cargado
async function  mostrarProductoCategoria() {
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

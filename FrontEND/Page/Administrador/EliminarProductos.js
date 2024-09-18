import ProductosDAO from '../../dao/ProductosDAO.js';

window.onload = function () {
    obtenerProductos();
    guardarLocalStorage();
    admin();
};

async function obtenerProductos() {
    const productosTableBody = document.querySelector("#productosTable tbody");

        const productosDAO = new ProductosDAO(); // Instancia del DAO
        const resultado = await productosDAO.obtenerProductos(); // Llamada al método para obtener productos

        // Verificamos si la solicitud fue exitosa
        if (resultado.success) {
            const productos = resultado.productos;

            // Limpiamos el cuerpo de la tabla antes de agregar los productos
            productosTableBody.innerHTML = "";

            // Iteramos sobre los productos y los agregamos a la tabla
            productos.forEach(producto => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td class="td">${producto.id_producto}</td>
                    <td class="td">${producto.nombre}</td>
                    <td class="td">${producto.categoria}</td>
                    <td class="td"><img class="img-producto" src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="150"></td>
                    <td class="td"> $ ${producto.precio}</td>
                    <td class="td">${producto.stock}</td>
                    <td class="td-b"><button class="eliminar-btn" data-id="${producto.id_producto}">Eliminar</button></td>
                `;

                productosTableBody.appendChild(row);
            });

            // Agregamos los event listeners para los botones de eliminar
            document.querySelectorAll(".eliminar-btn").forEach(button => {
                button.addEventListener("click", async function () {
                    const idProducto = this.dataset.id;
                    await eliminarProducto(idProducto);
                });
            });

        } 

}

// Función para eliminar un producto
async function eliminarProducto(id_producto) {


        const productosDAO = new ProductosDAO();
        const resultado = await productosDAO.eliminarProducto(id_producto);

        if (resultado.success) {
            mostrarAlerta("Producto Eliminado Exitosamente", () => {
            });
            obtenerProductos();
        } else {
            alert(`Error al eliminar el producto: ${resultado.message}`);
        }

}



// Espera a que el contenido del documento esté completamente cargado
function guardarLocalStorage() {
    // Obtener los datos del usuario desde el localStorage
    let nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let telefono = localStorage.getItem('telefono');
    let email = localStorage.getItem('email');

    // Insertar los valores recuperados en los elementos HTML correspondientes
    document.getElementById('nombre').textContent = nombre;
    document.getElementById('usuario').textContent = usuario;
    document.getElementById('telefono').textContent = telefono;
    document.getElementById('email').textContent = email;

    // Si los datos del usuario están presentes, oculta elementos con la clase 'desaparecer'
    if (nombre && usuario && telefono && email) {
        let desaparecer = document.querySelectorAll('#desaparecer');
        desaparecer.forEach(desaparecer => {
            desaparecer.style.display = 'none';
        });

        // Muestra los elementos con id 'aparecer'
        let aparecer = document.querySelectorAll('#aparecer');
        aparecer.forEach(aparecer => {
            aparecer.style.display = 'block';
        });

        // Muestra los elementos con la clase 'aparecer'
        let aparecer2 = document.querySelectorAll('.aparecer');
        aparecer2.forEach(aparecer2 => {
            aparecer2.style.display = 'block';
        });
    }

    // Agregar evento al botón de cerrar sesión
    document.getElementById('cerrarSesion').addEventListener('click', async function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Enviar solicitud para cerrar sesión
        let response = await fetch('http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Limpiar localStorage y redirigir al login
        localStorage.clear();
        mostrarAlerta("Has cerrado sesión correctamente.", () => {
            window.location.href = '../Login/LoginCliente.html'; // Redirigir al login
        });
    });
};

// Función para mostrar una alerta personalizada
function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    // Configurar el mensaje y mostrar la alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Mostrar fondo oscuro
    alerta.style.display = 'block'; // Mostrar alerta

    // Ocultar alerta al hacer clic en cerrar
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Ocultar fondo oscuro
        alerta.style.display = 'none'; // Ocultar alerta
        if (callback) {
            callback(); // Ejecutar función callback si se proporciona
        }
    }
}


// Espera a que el contenido del documento esté completamente cargado
function admin() {
    // Recupera el rol del usuario desde el localStorage
    const role = localStorage.getItem('role');

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
};


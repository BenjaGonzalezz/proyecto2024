// Importa la clase ProductosDAO desde el archivo '../../dao/ProductosDAO'
import ProductosDAO from '../../dao/ProductosDAO.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    // Escuchar el evento de envío del formulario
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const categoria = document.getElementById('categoria').value;
        const nombre = document.getElementById('nombreProducto').value;
        const stock = document.getElementById('stock').value;
        const precio = document.getElementById('precio').value;
        const imagen = document.getElementById('imagen').files[0]; // Obtener archivo de imagen
        const color = document.getElementById('color').value;
        const medida = document.getElementById('medida').value;

        // Crear una instancia de ProductosDAO para interactuar con la base de datos
        const productosDAO = new ProductosDAO();

        try {
            // Enviar los datos al backend usando agregarProducto
            const resultado = await productosDAO.agregarProducto(categoria, nombre, stock, precio, imagen, color, medida);

            // Mostrar el resultado en pantalla
            if (resultado.success) {
                alert('Producto agregado exitosamente');
                form.reset(); // Limpiar el formulario
            } else {
                alert('Error: ' + resultado.message);
            }
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Hubo un error al intentar agregar el producto.');
        }
    });
});

// Espera a que el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
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
});

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
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el rol del usuario desde el localStorage
    const role = localStorage.getItem('role');

    // Mostrar u ocultar elementos según el rol del usuario
    if (role === 'admin') {
        // Mostrar los elementos específicos para administradores
        document.querySelectorAll('.aparecerAdmin').forEach(element => {
            element.style.display = 'block';
        });

        // Ocultar elementos que no deben verse para administradores
        document.querySelectorAll('.desaparecerAdmin').forEach(element => {
            element.style.display = 'none';
        });
    }
});

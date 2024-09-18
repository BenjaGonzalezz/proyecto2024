window.onload = () => {
    agregarOferta();
    verificarOferta();
    guardarLocalStorage();
    admin();
}

function agregarOferta() {
    const formularioOferta = document.getElementById('ofertaForm');

    formularioOferta.addEventListener('submit', async function(event) {
        event.preventDefault();

        const idProducto = document.getElementById('id_producto').value;

        if (!idProducto) {
            alert('Por favor, ingresa un ID de producto.');
            return;
        }

        try {
            const response = await fetch("http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=agregarOferta", {
                method: 'POST',
                body: new FormData(formularioOferta)
            });

            const result = await response.json();

            if (result.success) {
                mostrarAlerta("Oferta agregada exitosamente.", () => {
                    window.location.href = '../Inicio/Inicio.html'; // Redirige al login
                });
            } else {
                mostrarAlerta("Error, " + result.message, () => {
                });
            }
        } catch{
            alert('el id de ese producto no Existe');
        }
    });
}

function verificarOferta() {
    fetch("http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerOferta")
        .then(response => response.json())
        .then(data => {
            const divEliminarOferta = document.getElementById('divEliminarOferta');

            if (data.success && data.productos.length > 0) {
                divEliminarOferta.style.display = 'block'; // Mostrar el div
                eliminarOferta(); // Configurar el evento si hay una oferta
            } else {
                divEliminarOferta.style.display = 'none'; // Ocultar el div
            }
        })
}

function eliminarOferta() {
    const botonEliminar = document.getElementById('eliminarOfertaBtn');

    botonEliminar.addEventListener('click', async function() {

            const response = await fetch("http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=eliminarOferta", {
                method: 'POST'
            });

            const result = await response.json();

            if (result.success) {
                mostrarAlerta("Has eliminado la oferta correctamente.", () => {
                    window.location.href = '../Inicio/Inicio.html'; // Redirige al login
                });
            } else {
                mostrarAlerta("Error" + result.message, () => {
                    window.location.href = '../Inicio/Inicio.html'; // Redirige al login
                });
            }

    });
}



// Espera a que el contenido del documento esté completamente cargado
function guardarLocalStorage() {
    // Recupera los datos del usuario desde el localStorage
    let nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let telefono = localStorage.getItem('telefono');
    let email = localStorage.getItem('email');

    // Inserta los valores recuperados en los elementos HTML correspondientes
    document.getElementById('nombre').textContent = nombre;
    document.getElementById('usuario').textContent = usuario;
    document.getElementById('telefono').textContent = telefono;
    document.getElementById('email').textContent = email;

    // Si todos los datos de usuario están presentes, oculta elementos con la clase 'desaparecer'
    if (nombre && usuario && telefono && email) {
        // Selecciona todos los elementos con el id 'desaparecer'
        let desaparecer = document.querySelectorAll('#desaparecer');

        // Oculta cada uno de los elementos seleccionados
        desaparecer.forEach(desaparecer => {
            desaparecer.style.display = 'none';
        });

        // Selecciona y muestra los elementos con el id 'aparecer'
        let aparecer = document.querySelectorAll('#aparecer');
        aparecer.forEach(aparecer => {
            aparecer.style.display = 'block';
        });

        // Selecciona y muestra los elementos con la clase 'aparecer'
        let aparecer2 = document.querySelectorAll('.aparecer');
        aparecer2.forEach(aparecer2 => {
            aparecer2.style.display = 'block';
        });
    }

    // Agrega un evento al botón de cerrar sesión
    document.getElementById('cerrarSesion').addEventListener('click', async function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón

        // Realiza una solicitud al servidor para cerrar la sesión
        let response = await fetch('http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion');
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Limpia el localStorage y redirige al login
        localStorage.clear();
        mostrarAlerta("Has cerrado sesión correctamente.", () => {
            window.location.href = '../Login/LoginCliente.html'; // Redirige al login
        });
    });
};

// Función para mostrar una alerta personalizada
function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    // Configura el mensaje y muestra la alerta
    alertaMensaje.textContent = mensaje;
    fondoOscuro.style.display = 'block'; // Muestra el fondo oscuro
    alerta.style.display = 'block'; // Muestra la alerta

    // Al hacer clic en cerrar, oculta la alerta
    alertaCerrar.onclick = function() {
        fondoOscuro.style.display = 'none'; // Oculta el fondo oscuro
        alerta.style.display = 'none'; // Oculta la alerta
        if (callback) {
            callback(); // Ejecuta el callback si se proporciona
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
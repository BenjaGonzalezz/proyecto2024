window.onload = () => {
    agregarOferta();
    verificarOferta();
    guardarLocalStorage();
    admin();
    verificarAcceso();
}

function verificarAcceso() {
    const role = localStorage.getItem('role');
    
    if (role !== 'admin') {
        mostrarAlerta('❌⚠ LO QUE ESTAS HACIENDO ES ILEGAL ⚠❌', () => {
            window.location.href = '../Inicio/Inicio.html';
        });
    }
}

function agregarOferta() {
    const formularioOferta = document.getElementById('ofertaForm');

    formularioOferta.addEventListener('submit', async function(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=agregarOferta", {
                method: 'POST',
                body: new FormData(formularioOferta)
            });

            const result = await response.json();

            if (result.success) {
                mostrarAlerta("Oferta agregada exitosamente.", () => {
                    window.location.href = '../Inicio/Inicio.html'; 
                });
            } else {
                mostrarAlerta(result.message, () => {
                });
            }
        } catch{
            mostrarAlerta('No existe ningun producto con ese ID', () => {
            });
        }
    });
}

function verificarOferta() {
    fetch("http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerOferta")
        .then(response => response.json())
        .then(data => {
            const divEliminarOferta = document.getElementById('divEliminarOferta');

            if (data.success && data.productos.length > 0) {
                divEliminarOferta.style.display = 'block'; 
                eliminarOferta();
            } else {
                divEliminarOferta.style.display = 'none'; 
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
                    window.location.href = '../Inicio/Inicio.html'; 
                });
            } else {
                mostrarAlerta("Error" + result.message, () => {
                    window.location.href = '../Inicio/Inicio.html';
                });
            }

    });
}




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

function admin() {
    const role = localStorage.getItem('role');
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
};
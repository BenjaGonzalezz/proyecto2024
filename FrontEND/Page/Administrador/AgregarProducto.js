import ProductosDAO from '../../dao/ProductosDAO.js';

window.onload = () => {
    EventosFormularios();
    guardarLocalStorage();
    admin();
    EventoPreviw();
}

function EventosFormularios() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const categoria = document.getElementById('categoria').value;
        const nombre = document.getElementById('nombreProducto').value;
        const stock = document.getElementById('stock').value;
        const precio = document.getElementById('precio').value;
        const imagen = document.getElementById('imagen').files[0];
        const color = document.getElementById('color').value;
        const medida = document.getElementById('medida').value;

        const productosDAO = new ProductosDAO();

        try {
            const resultado = await productosDAO.agregarProducto(categoria, nombre, stock, precio, imagen, color, medida);

            if (resultado.success) {
                mostrarAlerta('Producto agregado exitosamente', ()=>{
                });
                form.reset();
            } else {
                alert('Error: ' + resultado.message);
            }
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Hubo un error al intentar agregar el producto.');
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


function EventoPreviw() {
    let imagen = document.getElementById('imagenpreviw');
    let imagenpreviw = document.getElementById('imagen');
    imagenpreviw.onchange = () => {
        let url = URL.createObjectURL(imagenpreviw.files[0])
        imagen.src = url
    }
}
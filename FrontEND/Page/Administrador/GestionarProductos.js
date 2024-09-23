import ProductosDAO from '../../dao/ProductosDAO.js';

window.onload = function() {
    obtenerProductos();
    guardarLocalStorage();
    admin();
    FormularioAgregarStock();
    FormularioModificarPrecio();
    verificarAcceso();
};

function verificarAcceso() {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
        mostrarAlerta('❌⚠ LO QUE ESTAS HACIENDO ES ILEGAL ⚠❌', () => {
            window.location.href = '../Inicio/Inicio.html';
        });
    }
}

async function obtenerProductos() {
    const productosTableBody = document.querySelector("#productosTable tbody");

    const productosDAO = new ProductosDAO();
    const resultado = await productosDAO.obtenerProductos();

    if (resultado.success) {
        const productos = resultado.productos;

        productosTableBody.innerHTML = "";

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

        document.querySelectorAll(".eliminar-btn").forEach(button => {
            button.addEventListener("click", async function() {
                const idProducto = this.dataset.id;
                await eliminarProducto(idProducto);
            });
        });
    }

}

async function eliminarProducto(id_producto) {

    const productosDAO = new ProductosDAO();
    const resultado = await productosDAO.eliminarProducto(id_producto);

    if (resultado.success) {
        mostrarAlerta("Producto Eliminado Exitosamente", () => {});
        obtenerProductos();
    } else {
        alert(`Error al eliminar el producto: ${resultado.message}`);
    }

}

function FormularioAgregarStock() {
    const agregarStockBtn = document.getElementById('agregarStockBtn');

    agregarStockBtn.addEventListener('click', async() => {
        const idProducto = document.getElementById('id_producto_stock').value;
        const cantidadStock = document.getElementById('cantidad').value;

        const productosDAO = new ProductosDAO();
        const resultado = await productosDAO.agregarStockProducto(idProducto, cantidadStock);

        if (resultado.success) {
            mostrarAlerta("Stock agregado exitosamente", () => {
                window.location.reload();
            });

        } else {
            mostrarAlerta("el ID del producto que ingresaste no existe", () => {
                window.location.reload();
            });
        }
    });
}

function FormularioModificarPrecio() {
    const modificarPrecioBtn = document.getElementById('modificarPrecioBtn');

    modificarPrecioBtn.addEventListener('click', async() => {
        const idProducto = document.getElementById('id_producto_precio').value;
        const nuevoPrecio = document.getElementById('nuevo_precio').value;

        const productosDAO = new ProductosDAO();
        const resultado = await productosDAO.modificarPrecioProducto(idProducto, nuevoPrecio);

        if (resultado.success) {
            mostrarAlerta("Precio modificado exitosamente", () => {
                window.location.reload();
            });
        } else {
            mostrarAlerta("El ID del producto que ingresaste no existe", () => {
                window.location.reload();
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
import CarritoDAO from "../../dao/CarritoDAO.js";

const carritoDAO = new CarritoDAO();


window.onload = () => {
    guardarLocalStorage();
    admin();
    mostrarOfertas();
    mostrarProductosCarrito();
    mostrarSinLogueo();
}

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

                    // Crear el mensaje con la lista de productos reservados
                    let productosReservados = carrito.map(producto => `
                        <li>${producto.nombre} - Cantidad: ${producto.cantidad}</li>
                    `).join(""); //el join este convierte el array de productos en una sola cadena de <li> HTML
        
                    //mensaje completo para la alerta
                    const mensajeAlerta = `
                        <p>¡Gracias por reservar los siguientes productos!</p>
                        <ul>${productosReservados}</ul>
                        <a href="../ReservasUsuarios/ReservaUsuario.html" style="text-decoration: underline; color: blue;">
                            Ver mis reservas
                        </a>
                    `;
        
                    mostrarAlerta(mensajeAlerta);
                } else {
                    console.error("Error del servidor:", resultado.message);
                    mostrarAlerta(resultado.message);
                }
            } catch (error) {
                console.error("Error en la solicitud de reserva:", error);
                mostrarAlerta("Hubo un error al procesar la solicitud.");
            }
        });

        carritoContainer.appendChild(botonSolicitarReserva);
    }
}


function eliminarProductoDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarProductosCarrito();
}



function mostrarOfertas() {
    fetch('http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerOferta')
        .then(response => response.json())
        .then(data => {
            const ofertasContainer = document.getElementById('ofertas1');
            ofertasContainer.innerHTML = '';

            if (data.success) {
                data.productos.forEach(producto => {
                    ofertasContainer.innerHTML += `

                        <div class="nombre-y-imagen"> 
                        
                        <img class="bigsale" src="../img/imgBigSale.png" alt="">

                        <div class="img-a1"> 

                        <img src="../../../BackEND/imgs/${producto.imagen}" alt="${producto.nombre}" width="100">

                        </div>

                        </div>


                        <div class="detalles-anuncio1"> 

                        <h2 class="h2-a1">${producto.nombre}</h2>
                        <p>Precio: $ ${producto.precio}</p>
                        <p>Stock: ${producto.stock}</p>

                        </div>

                `;
                });
            } else {
                ofertasContainer.innerText = data.message;
            }
        })
        .catch(error => console.error('Error:', error));
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
}

function mostrarAlerta(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro');
    const alerta = document.getElementById('alertaPersonalizada');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const alertaCerrar = document.getElementById('alertaCerrar');

    alertaMensaje.innerHTML = mensaje;
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


function mostrarSinLogueo() {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
        const elementosSinLogueo = document.querySelectorAll('.aparecerSinLogueo');
        
        elementosSinLogueo.forEach(elemento => {
            elemento.style.display = 'block';
        });
    } else {
        const elementosSinLogueo = document.querySelectorAll('.aparecerSinLogueo');
        
        elementosSinLogueo.forEach(elemento => {
            elemento.style.display = 'none';
        });
    }
}
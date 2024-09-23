import ModificarDAO from '../../dao/ModificarDAO.js';

// Crear una instancia del DAO
const modificarDAO = new ModificarDAO();

window.onload = () => {
    modificacionNombre();
    modificacionUsuario();
    modificacionEmail();
    modificacionTelefono();
    admin();
    guardarLocalStorage();
}

function guardarLocalStorage() {
    let nombre = localStorage.getItem('nombre');
    let usuario = localStorage.getItem('usuario');
    let telefono = localStorage.getItem('telefono');
    let email = localStorage.getItem('email');

    console.log('Nombre:', nombre, 'Usuario:', usuario, 'Teléfono:', telefono, 'Email:', email); // Depuración

    document.getElementById('nombre').textContent = nombre;
    document.getElementById('usuario').textContent = usuario;
    document.getElementById('telefono').textContent = telefono;
    document.getElementById('email').textContent = email;

    if (nombre && usuario && telefono && email) {
        let desaparecer = document.querySelectorAll('#desaparecer');
        desaparecer.forEach(element => {
            element.style.display = 'none';
        });

        let aparecer = document.querySelectorAll('#aparecer');
        aparecer.forEach(element => {
            element.style.display = 'block';
        });

        let aparecer2 = document.querySelectorAll('.aparecer');
        aparecer2.forEach(element => {
            element.style.display = 'block';
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
            window.location.href = '../../Login/LoginCliente.html';
        });
    });
}

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
}
function modificacionNombre() {
    const formularioModificar = document.getElementById('form-modificar');

    if (formularioModificar) {
        formularioModificar.addEventListener('submit', async function(event) {
            event.preventDefault();
            const nuevoNombre = document.getElementById('nuevoNombre').value;

            try {
                const resultado = await modificarDAO.modificarNombre(nuevoNombre);

                if (resultado.success) {
                    // Actualizar localStorage
                    localStorage.setItem('nombre', nuevoNombre);
                    mostrarAlerta("Tu nombre se actualizó correctamente", () => {
                        window.location.href = '../Cuenta/Micuenta.html';
                    });
                } else {
                    alert('Error al actualizar el nombre: ' + resultado.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                alert('Error al actualizar el nombre');
            }
        });
    }
}

function modificacionUsuario() {
    const formularioModificarUsuario = document.getElementById('form-modificar-usuario');

    if (formularioModificarUsuario) {
        formularioModificarUsuario.addEventListener('submit', async function(event) {
            event.preventDefault();

            const nuevoUsuario = document.getElementById('nuevoUsuario').value;

            try {
                const resultado = await modificarDAO.modificarUsuario(nuevoUsuario);

                if (resultado.success) {
                    localStorage.setItem('usuario', nuevoUsuario); // Actualizar en localStorage
                    mostrarAlerta("Tu usuario se actualizó correctamente", () => {
                        window.location.href = '../Cuenta/Micuenta.html';
                    });
                } else {
                    alert('Error al actualizar el usuario: ' + resultado.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                alert('Error al actualizar el usuario');
            }
        });
    }
}


function modificacionEmail() {
    const formularioModificarEmail = document.getElementById('form-modificar-email');

    if (formularioModificarEmail) {
        formularioModificarEmail.addEventListener('submit', async function(event) {
            event.preventDefault();

            const nuevoEmail = document.getElementById('nuevoEmail').value;

            try {
                const resultado = await modificarDAO.modificarEmail(nuevoEmail);

                if (resultado.success) {
                    // Actualizar el email en localStorage
                    localStorage.setItem('email', nuevoEmail);

                    mostrarAlerta("Tu email se actualizó correctamente", () => {
                        window.location.href = '../Cuenta/Micuenta.html';
                    });
                } else {
                    alert('Error al actualizar el email: ' + resultado.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                alert('Error al actualizar el email');
            }
        });
    }
}

function modificacionTelefono() {
    const formularioModificarTelefono = document.getElementById('form-modificar-telefono');

    if (formularioModificarTelefono) {
        formularioModificarTelefono.addEventListener('submit', async function(event) {
            event.preventDefault();

            const nuevoTelefono = document.getElementById('nuevoTelefono').value;

            try {
                const resultado = await modificarDAO.modificarTelefono(nuevoTelefono);

                if (resultado.success) {
                    // Actualizar el teléfono en localStorage
                    localStorage.setItem('telefono', nuevoTelefono);

                    mostrarAlerta("Tu teléfono se actualizó correctamente", () => {
                        window.location.href = '../Cuenta/Micuenta.html';
                    });
                } else {
                    alert('Error al actualizar el teléfono: ' + resultado.message);
                }
            } catch (error) {
                console.error('Error en la solicitud:', error.message);
                alert('Error al actualizar el teléfono');
            }
        });
    }
}
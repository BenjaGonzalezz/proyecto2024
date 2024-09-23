import SesionDAO from '../../dao/SesionDAO.js';

window.onload = () => {
    Login();
}

async function Login() {
    document.getElementById("Login").addEventListener("submit", async function(event) {
        event.preventDefault();

        let usuario = document.getElementById("usuario2").value;
        let contraseña = document.getElementById("contraseña2").value;

        console.log('usuario', usuario);
        console.log('contraseña', contraseña);

        let sesionDAO = new SesionDAO();

        let resultado = await sesionDAO.loginUsuario(usuario, contraseña);

        console.log('Resultado de login:', resultado);

        if (resultado.success === true) {
            mostrarAlerta(`✅ Login Exitoso, Disfruta de nuestro productos ${resultado.usuario} ✅`, () => {

                localStorage.setItem('nombre', resultado.nombre);
                localStorage.setItem('usuario', resultado.usuario);
                localStorage.setItem('telefono', resultado.telefono);
                localStorage.setItem('email', resultado.email);
                localStorage.setItem('role', resultado.role);

                if (resultado.role === 'admin') {
                    window.location.href = '../Inicio/Inicio.html';
                } else {
                    window.location.href = '../Inicio/Inicio.html';
                }
            });
        } else {
            console.log('Login fallido:', resultado);
            mostrarAlerta2(resultado.message || 'Error en el login');
        }
    });
}


const toggleIcon = document.getElementById('togglePassword');
toggleIcon.addEventListener('click', function() {
    const passwordInput = document.getElementById('contraseña2');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = '../img/esconder.png';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = '../img/ver.png';
    }
});

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

function mostrarAlerta2(mensaje, callback) {
    const fondoOscuro = document.getElementById('fondoOscuro2');
    const alerta = document.getElementById('alertaPersonalizada2');
    const alertaMensaje = document.getElementById('alertaMensaje2');
    const alertaCerrar = document.getElementById('alertaCerrar2');

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
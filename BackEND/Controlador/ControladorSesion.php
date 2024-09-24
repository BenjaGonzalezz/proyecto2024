<?php

// Incluir el archivo que contiene el acceso a la base de datos y los métodos de sesión de usuario
require_once '../Modelo/SesionDAO.php';

// Iniciar la sesión para acceder a las variables de sesión
session_start();

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');

// Obtener el valor del parámetro 'function' de la URL (GET) para determinar qué función ejecutar
$function = $_GET['function'];

// Usar una estructura switch para ejecutar la función correcta según el valor de 'function'
switch ($function) {
    // Si 'function' es "loginUsuario", se llama a la función loginUsuario()
    case "loginUsuario":
        loginUsuario();
        break;
    
    // Si 'function' es "registerUsuario", se llama a la función registerUsuario()
    case "registerUsuario":
        registerUsuario();
        break;
    
    // Si 'function' es "cerrarSesion", se llama a la función cerrarSesion()
    case "cerrarSesion":
        cerrarSesion();
        break;

    // Si 'function' es "eliminarCuenta", se llama a la función eliminarCuenta()
    case "eliminarCuenta":
        eliminarCuenta();
        break;
}

// Función para registrar un nuevo usuario
function registerUsuario() {
    // Obtener los datos del formulario enviados mediante POST
    $nombre = $_POST['nombre'];
    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $contraseña = $_POST['contraseña'];

    // Llamar al método del modelo para registrar al usuario y obtener el resultado
    $resultado = (new Usuario())->RegisterUsuarioModelo($nombre, $usuario, $email, $telefono, $contraseña);

    // Enviar el resultado en formato JSON como respuesta
    echo json_encode($resultado);
}

// Función para iniciar sesión de un usuario
function loginUsuario() {
    
    // Obtener los datos del formulario enviados mediante POST
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];

    // Llamar al método del modelo para realizar el login y obtener el resultado
    $resultado = (new Usuario())->loginUsuarioModelo($usuario, $contraseña);

    // Enviar el resultado en formato JSON como respuesta
    echo json_encode($resultado);
}

// Función para cerrar la sesión del usuario
function cerrarSesion() {
    // Iniciar una nueva sesión si aún no ha sido iniciada
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Limpiar todas las variables de sesión
    session_unset();
    
    // Destruir la sesión actual
    session_destroy();

    // Enviar una respuesta en formato JSON confirmando que la sesión fue cerrada
    echo json_encode(["success" => true, "message" => "Sesión cerrada"]);
}
// Función para eliminar una cuenta de usuario y sus datos relacionados
function eliminarCuenta() {
    // Verificar si se recibió el usuario por el método POST
    if (isset($_POST['usuario'])) {
        // Obtener el usuario desde el POST
        $usuario = $_POST['usuario'];

        // Llamar al método del modelo para eliminar la cuenta del usuario
        $resultado = (new Usuario())->eliminarCuentaModelo($usuario);

        // Destruir la sesión actual
        session_start();
        session_unset();
        session_destroy();

        // Enviar el resultado como respuesta en formato JSON
        echo json_encode(["success" => true, "message" => "Cuenta eliminada exitosamente."]);
    } else {
        // Enviar un mensaje de error si el usuario no se envió correctamente
        echo json_encode(["success" => false, "message" => "Error: Usuario no proporcionado."]);
    }
}

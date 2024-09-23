<?php

// Incluye el archivo que contiene las funciones del modelo de modificar
require_once '../Modelo/Modificar.php';

// Iniciar sesión para acceder a las variables de sesión
session_start();

// Establecer el tipo de contenido de la respuesta a JSON
header('Content-Type: application/json');

// Obtener el valor del parámetro 'function' enviado mediante la URL (GET)
$function = $_GET['function'];

switch ($function) {
    case "modificarNombre":
        modificarNombre();
        break;
    
    case "modificarUsuario":
        modificarUsuario();
        break;
    
    case "modificarEmail":
        modificarEmail();
        break;
    
    case "modificarTelefono":
        modificarTelefono();
        break;

}

function modificarNombre() {
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario'];
        $nuevoNombre = $_POST['nuevoNombre'];

        $resultado = (new Modificar())->modificarNombreModelo($usuario, $nuevoNombre);
        
        echo json_encode($resultado); // Asegúrate de que esto sea consistente
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}

// Función para modificar el nombre de usuario
function modificarUsuario() {
    if (isset($_SESSION['usuario'])) {
        $usuarioActual = $_SESSION['usuario']; // Obtén el usuario de la sesión
        $nuevoUsuario = $_POST['nuevoUsuario'];

        $resultado = (new Modificar())->modificarUsuarioModelo($usuarioActual, $nuevoUsuario);

        echo json_encode($resultado);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}

// Función para modificar el email del usuario
function modificarEmail() {
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario'];
        $nuevoEmail = $_POST['nuevoEmail'];

        $resultado = (new Modificar())->modificarEmailModelo($usuario, $nuevoEmail);

        echo json_encode($resultado);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}

// Función para modificar el teléfono del usuario
function modificarTelefono() {
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario'];
        $nuevoTelefono = $_POST['nuevoTelefono'];

        $resultado = (new Modificar())->modificarTelefonoModelo($usuario, $nuevoTelefono);

        echo json_encode($resultado);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}
?>

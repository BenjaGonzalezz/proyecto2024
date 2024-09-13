<?php
require_once '../Modelo/SesionDAO.php';


header('Content-Type: application/json');

$function = $_GET['function'];

switch ($function) {
    case "loginUsuario":
        loginUsuario();
        break;
    case "registerUsuario":
        registerUsuario();
        break;
    case "cerrarSesion":
        cerrarSesion();
        break;
}

function registerUsuario(){
    $nombre = $_POST['nombre'];
    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $contraseña = $_POST['contraseña'];


    $resultado = (new Usuario())->RegisterUsuarioModel($nombre, $usuario,
     $email, $telefono, $contraseña);
    echo json_encode($resultado);
}

function loginUsuario() {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];

    // Obtener el resultado desde el modelo
    $resultado = (new Usuario())->loginUsuarioModel($usuario, $contraseña);

    // Enviar la respuesta en formato JSON
    echo json_encode($resultado);
}

function cerrarSesion() {
    // Iniciar sesión si aún no está iniciada
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Destruir la sesión
    session_unset();
    session_destroy();

    // Enviar una respuesta en formato JSON
    echo json_encode(["success" => true, "message" => "Sesión cerrada"]);
}


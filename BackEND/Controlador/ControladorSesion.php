<?php

require_once '../Modelo/SesionDAO.php';


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
    
    // Hash de la contraseña
    $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);

    // Mostrar el hash generado para verificar
    var_dump($contraseñaHash);

    $resultado = (new Usuario())->RegisterUsuarioModel($nombre, $usuario,
     $email, $telefono, $contraseñaHash);
    echo json_encode($resultado);
}

function loginUsuario(){
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];
    
    $resultado = (new Usuario())->loginUsuarioModel($usuario, $contraseña);
    echo json_encode($resultado);
}


function cerrarSesion(){


}

<?php

require_once '../Modelo/SesionDAO.php';


$function = $_GET['function'];

switch ($function) {
    case "LoginUsuario":
        LoginUsuario();
        break;
    case "RegisterUsuario":
        RegisterUsuario();
        break;
    case "cerrarSesion":
        cerrarSesion();
        break;
}

function RegisterUsuario(){
    
    $nombre = $_POST['nombre'];
    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $contraseña = $_POST['contraseña'];
    
    // Hashing de la contraseña
    $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);

    $resultado = (new Usuario())->RegisterUsuarioModel($nombre, $usuario, $email, $telefono, $contraseñaHash);
    echo json_encode($resultado);
}

function LoginUsuario(){
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];
    $resultado = (new Usuario())->LoginUsuarioModel($usuario, $contraseña);
    echo json_encode($resultado);

}
function cerrarSesion(){


}

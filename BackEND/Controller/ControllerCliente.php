<?php

require_once '../Model/ClienteDAO.php';


$function = $_GET['function'];

switch ($function) {
    case "LoginUsuario":
        LoginUsuario();
        break;
    case "RegisterUsuario":
        RegisterUsuario();
        break;
}

function RegisterUsuario(){
    
    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $contraseña = $_POST['contraseña'];

    // Hashing de la contraseña

    $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);

    $resultado = (new Usuario())->RegisterUsuarioModel($usuario, $email, $contraseñaHash);
    echo json_encode($resultado);
}

function LoginUsuario(){
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];
    $resultado = (new Usuario())->LoginUsuarioModel($usuario, $contraseña);
    echo json_encode($resultado);

}
?>
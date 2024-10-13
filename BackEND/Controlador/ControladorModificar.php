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
    // Si 'function' es "modificarNombre", se llama a la función modificarNombre()
    case "modificarNombre":
        modificarNombre();
        break;
    
    // Si 'function' es "modificarUsuario", se llama a la función modificarUsuario()
    case "modificarUsuario":
        modificarUsuario();
        break;
    
    // Si 'function' es "modificarEmail", se llama a la función modificarEmail()
    case "modificarEmail":
        modificarEmail();
        break;
    
    // Si 'function' es "modificarTelefono", se llama a la función modificarTelefono()
    case "modificarTelefono":
        modificarTelefono();
        break;

}

// Función para modificar el nombre del usuario
function modificarNombre() {
    // Verifica si el usuario ha iniciado sesión
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario']; // Obtiene el usuario actual de la sesión
        $nuevoNombre = $_POST['nuevoNombre']; // Obtiene el nuevo nombre enviado por POST

        // Llama al modelo para modificar el nombre en la base de datos
        $resultado = (new Modificar())->modificarNombreModelo($usuario, $nuevoNombre);
        
        // Devuelve el resultado en formato JSON
        echo json_encode($resultado);
    } else {
        // Si no hay sesión activa, devuelve un mensaje de error en JSON
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}

// Función para modificar el nombre de usuario
function modificarUsuario() {
    // Verifica si el usuario ha iniciado sesión
    if (isset($_SESSION['usuario'])) {
        $usuarioActual = $_SESSION['usuario']; // Obtiene el usuario actual de la sesión
        $nuevoUsuario = $_POST['nuevoUsuario']; // Obtiene el nuevo usuario enviado por POST

        // Llama al modelo para modificar el nombre de usuario en la base de datos
        $resultado = (new Modificar())->modificarUsuarioModelo($usuarioActual, $nuevoUsuario);

        // Devuelve el resultado en formato JSON
        echo json_encode($resultado);
    } else {
        // Devuelve un mensaje de error si no hay sesión activa
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}

// Función para modificar el email del usuario
function modificarEmail() {
    // Verifica si el usuario ha iniciado sesión
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario']; // Obtiene el usuario actual de la sesión
        $nuevoEmail = $_POST['nuevoEmail']; // Obtiene el nuevo email enviado por POST

        // Llama al modelo para modificar el email en la base de datos
        $resultado = (new Modificar())->modificarEmailModelo($usuario, $nuevoEmail);

        // Devuelve el resultado en formato JSON
        echo json_encode($resultado);
    } else {
        // Devuelve un mensaje de error si no hay sesión activa
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}

// Función para modificar el teléfono del usuario
function modificarTelefono() {
    // Verifica si el usuario ha iniciado sesión
    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario']; // Obtiene el usuario actual de la sesión
        $nuevoTelefono = $_POST['nuevoTelefono']; // Obtiene el nuevo teléfono enviado por POST

        // Llama al modelo para modificar el teléfono en la base de datos
        $resultado = (new Modificar())->modificarTelefonoModelo($usuario, $nuevoTelefono);

        // Devuelve el resultado en formato JSON
        echo json_encode($resultado);
    } else {
        // Devuelve un mensaje de error si no hay sesión activa
        echo json_encode(["success" => false, "message" => "Usuario no ha iniciado sesión"]);
    }
}
?>

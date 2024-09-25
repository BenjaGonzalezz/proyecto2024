<?php

// Incluye el archivo que contiene las funciones del modelo de carrito
require_once '../Modelo/CarritoDAO.php';


session_start();


// Obtiene el valor del parámetro 'function' enviado mediante la URL (GET)
$function = $_GET['function'];

// Estructura switch para ejecutar diferentes funciones dependiendo del valor de 'function'
switch ($function) {

    // Si 'function' es "solicitarReserva", se llama a la función solicitarReserva()
    case "solicitarReserva":
        solicitarReserva();
        break;
}


// Función para solicitar una reserva
function solicitarReserva() {
    header('Content-Type: application/json');
    
    // Maneja datos JSON enviados en una solicitud HTTP, permitiendo que el script PHP pueda trabajar con ellos de forma estructurada.
    $carrito = json_decode(file_get_contents("php://input"), true);

    // Verificar si el usuario está logueado
    if (!isset($_SESSION['usuario'])) {
        echo json_encode(["success" => false, "message" => "Usuario no autenticado."]);
        return;
    }

    // Obtener el nombre de usuario de la sesión
    $usuario_cliente = $_SESSION['usuario'];

    // Crea una instancia de ReservaCarrito
    $reservaCarrito = new ReservaCarrito();

    // Llama al método para realizar la reserva y captura el resultado
    $resultado = $reservaCarrito->solicitarReservaModelo($carrito, $usuario_cliente);

    // Retorna la respuesta como JSON
    echo json_encode($resultado);
}


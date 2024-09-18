<?php

// Incluye el archivo que contiene las funciones del modelo de carrito
require_once '../Modelo/CarritoDAO.php';

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
    // Recibe el nombre de usuario del cliente enviado mediante POST
    $usuario_cliente = $_POST['usuario_cliente'];
    
    // Llama al método 'solicitarReservaModelo' del modelo ReservaCarrito para realizar la reserva
    $resultado = (new ReservaCarrito())->solicitarReservaModelo($usuario_cliente);
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

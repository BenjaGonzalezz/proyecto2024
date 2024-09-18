<?php

// Incluir el archivo que contiene las funciones del modelo de reservas
require_once '../Modelo/ReservaDAO.php';

// Obtener el valor del parámetro 'function' enviado mediante la URL (GET)
$function = $_GET['function'];

// Estructura switch para ejecutar diferentes funciones según el valor de 'function'
switch ($function) {
    // Si 'function' es "obtenerReservas", se llama a la función obtenerReservas()
    case "obtenerReservas":
        obtenerReservas();
        break;
    
    // Si 'function' es "cambiarEstado", se llama a la función cambiarEstado()
    case "cambiarEstado":
        cambiarEstado();
        break;

    // Si 'function' es "obtenerReservaUsuario", se llama a la función obtenerReservaUsuario()
    case "obtenerReservaUsuario":
        obtenerReservaUsuario();
        break;
}

// Función para obtener todas las reservas
function obtenerReservas(){
    // Llamar al método 'obtenerReservasModelo' de la clase 'Reserva' para obtener las reservas
    $resultado = (new Reserva())->obtenerReservasModelo();
    
    // Devolver el resultado como respuesta en formato JSON
    echo json_encode($resultado);
}

// Función para cambiar el estado de una reserva
function cambiarEstado() {
    // Obtener el ID de la reserva y el nuevo estado enviados mediante POST
    $id_reserva = $_POST['id_reserva'];
    $nuevo_estado = $_POST['nuevo_estado'];
    
    // Llamar al método 'cambiarEstadoModelo' de la clase 'Reserva' para cambiar el estado de la reserva
    $resultado = (new Reserva())->cambiarEstadoModelo($id_reserva, $nuevo_estado);
    
    // Devolver el resultado como respuesta en formato JSON
    echo json_encode($resultado);
}

// Función para obtener las reservas de un usuario específico
function obtenerReservaUsuario() {
    // Obtener el nombre de usuario del cliente enviado mediante POST
    $usuario_cliente = $_POST['usuario_cliente'];
    
    // Llamar al método 'obtenerReservaUsuarioModelo' de la clase 'Reserva' para obtener las reservas del usuario
    $resultado = (new Reserva())->obtenerReservaUsuarioModelo($usuario_cliente);
    
    // Devolver el resultado como respuesta en formato JSON
    echo json_encode($resultado);
}

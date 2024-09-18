<?php

require_once '../Modelo/ReservaDAO.php';

$function = $_GET['function'];

switch ($function) {
    case "obtenerReservas":
        obtenerReservas();
        break;
    case "cambiarEstado":
        cambiarEstado();
        break;
    case "obtenerReservaUsuario":
       obtenerReservaUsuario();
        break;
}

function obtenerReservas(){
    $resultado = (new Reserva())->obtenerReservasModelo();
    echo json_encode($resultado);
}
function cambiarEstado() {
    $id_reserva = $_POST['id_reserva'];
    $nuevo_estado = $_POST['nuevo_estado'];
    $resultado = (new Reserva())->cambiarEstadoModelo($id_reserva, $nuevo_estado);
    echo json_encode($resultado);
}

function obtenerReservaUsuario() {
    $usuario_cliente = $_POST['usuario_cliente'];
    $resultado = (new Reserva())->obtenerReservaUsuarioModelo($usuario_cliente);
    echo json_encode($resultado);
}

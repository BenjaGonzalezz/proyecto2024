<?php

require_once '../Modelo/ReservaDAO.php';

$function = $_GET['function'];

switch ($function) {
    case "cambiarEstado":
        cambiarEstado();
        break;
    case "obtenerReserva":
        obtenerReserva();
        break;
    case "obtenerReservaUsuario":
       obtenerReservaUsuario();
        break;
}

function cambiarEstado(){

}

function obtenerReserva(){
    $id_reserva = $_POST["id_reserva"];
    $resultado = (new Reserva())->obtenerReservaModelo($id_reserva);
    echo json_encode($resultado);
}

function obtenerReservaUsuario(){
    $usuario = $_POST['usuario'];
}


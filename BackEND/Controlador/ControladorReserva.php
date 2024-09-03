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
    $resultado = (new Reserva())->obtenerReservaModelo();
    echo json_encode($resultado);
}

function obtenerReservaUsuario(){
    $usuario = $_POST['usuario'];
}


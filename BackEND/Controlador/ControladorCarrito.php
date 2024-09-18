<?php

require_once '../Modelo/CarritoDAO.php';


$function = $_GET['function'];

switch ($function) {
    case "solicitarReserva":
        solicitarReserva();
    break;
}


function solicitarReserva(){
    $usuario_cliente = $_POST['usuario_cliente'];
    $resultado = (new ReservaCarrito())->solicitarReservaModelo($usuario_cliente);
    echo json_encode($resultado);
}


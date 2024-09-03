<?php

require_once '../Modelo/CarritoDAO.php';


$function = $_GET['function'];

switch ($function) {
    case "solicitarReserva":
        solicitarReserva();
    break;
}


function solicitarReserva(){

}


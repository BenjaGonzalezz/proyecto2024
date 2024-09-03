 <?php

require_once "../Connection/Connection.php";
 
 class Reserva{

function cambiarEstadoModelo(){


}


 function obtenerReservaModelo($id_reserva){
 
    $connection = connection();
    $sql = "SELECT * FROM reserva WHERE id_reserva = '$id_reserva';";
    $respuesta = $connection->query($sql);
    $reservas = $respuesta->fetch_all(MYSQLI_ASSOC);
    return $reservas;
 }


 function obtenerReservaUsuarioModelo(){
    $connection = connection();
    $sql = "SELECT * FROM  WHERE = '';";
    $respuesta = $connection->query($sql);
    $reservas = $respuesta->fetch_all(MYSQLI_ASSOC);
    return $reservas;
 }
 }


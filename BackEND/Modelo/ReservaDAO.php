 <?php

require_once "../Connection/Connection.php";
 
 class Reserva{


public function obtenerReservasModelo() {
   $connection = connection();
   
   // Preparar la consulta
   $stmt = $connection->prepare("SELECT * FROM reserva");
   
   // Ejecutar la consulta
   if ($stmt->execute()) {
       $result = $stmt->get_result();
       $reservas = [];
       
       // Fetch all results
       while ($row = $result->fetch_assoc()) {
           $reservas[] = $row;
       }
       
       return [
           'status' => 'success',
           'data' => $reservas
       ];

   } else {
       return [
           'status' => 'error',
           'message' => 'Error al obtener las reservas'
       ];
   }
}

public function cambiarEstadoModelo($id_reserva, $nuevo_estado) {
    $connection = connection();
    
    // Preparar la consulta
    $stmt = $connection->prepare("UPDATE reserva SET estado = ? WHERE id_reserva = ?");
    $stmt->bind_param('si', $nuevo_estado, $id_reserva);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        return [
            'status' => 'success',
            'message' => 'Estado de la reserva actualizado exitosamente'
        ];
    } else {
        return [
            'status' => 'error',
            'message' => 'Error al actualizar el estado de la reserva'
        ];
    }
}
public function obtenerReservaUsuarioModelo($usuario_cliente) {
   $connection = connection();
   
   // Preparar la consulta
   $stmt = $connection->prepare("SELECT * FROM reserva WHERE usuario_cliente = ?");
   $stmt->bind_param('s', $usuario_cliente);
   
   // Ejecutar la consulta
   if ($stmt->execute()) {
       $result = $stmt->get_result();
       $reservas = [];
       
       // Fetch all results
       while ($row = $result->fetch_assoc()) {
           $reservas[] = $row;
       }
       
       return [
           'status' => 'success',
           'data' => $reservas
       ];
   } else {
       return [
           'status' => 'error',
           'message' => 'Error al obtener las reservas del usuario'
       ];
   }
}

 }


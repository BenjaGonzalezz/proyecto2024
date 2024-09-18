<?php

// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";

// Definición de la clase Reserva
class Reserva {

    // Método para obtener todas las reservas
    public function obtenerReservasModelo() {
        // Obtener la conexión a la base de datos
        $connection = connection();
   
        // Preparar la consulta SQL para seleccionar todas las reservas
        $stmt = $connection->prepare("SELECT * FROM reserva");
   
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Obtener el resultado de la consulta
            $result = $stmt->get_result();
            $reservas = [];
       
            // Recorrer los resultados y agregarlos al array de reservas
            while ($row = $result->fetch_assoc()) {
                $reservas[] = $row;
            }
       
            // Devolver una respuesta con las reservas obtenidas
            return [
                'status' => 'success',
                'data' => $reservas
            ];

        } else {
            // Devolver un mensaje de error si la consulta falla
            return [
                'status' => 'error',
                'message' => 'Error al obtener las reservas'
            ];
        }
    }

    // Método para cambiar el estado de una reserva
    public function cambiarEstadoModelo($id_reserva, $nuevo_estado) {
        // Obtener la conexión a la base de datos
        $connection = connection();
    
        // Preparar la consulta SQL para actualizar el estado de la reserva
        $stmt = $connection->prepare("UPDATE reserva SET estado = ? WHERE id_reserva = ?");
        $stmt->bind_param('si', $nuevo_estado, $id_reserva); // Vincular los parámetros
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Devolver una respuesta de éxito si la actualización fue exitosa
            return [
                'status' => 'success',
                'message' => 'Estado de la reserva actualizado exitosamente'
            ];
        } else {
            // Devolver un mensaje de error si la actualización falla
            return [
                'status' => 'error',
                'message' => 'Error al actualizar el estado de la reserva'
            ];
        }
    }

    // Método para obtener las reservas de un usuario específico
    public function obtenerReservaUsuarioModelo($usuario_cliente) {
        // Obtener la conexión a la base de datos
        $connection = connection();
   
        // Preparar la consulta SQL para seleccionar las reservas de un usuario en particular
        $stmt = $connection->prepare("SELECT * FROM reserva WHERE usuario_cliente = ?");
        $stmt->bind_param('s', $usuario_cliente); // Vincular el parámetro del usuario
   
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Obtener el resultado de la consulta
            $result = $stmt->get_result();
            $reservas = [];
       
            // Recorrer los resultados y agregarlos al array de reservas
            while ($row = $result->fetch_assoc()) {
                $reservas[] = $row;
            }
       
            // Devolver una respuesta con las reservas obtenidas
            return [
                'status' => 'success',
                'data' => $reservas
            ];
        } else {
            // Devolver un mensaje de error si la consulta falla
            return [
                'status' => 'error',
                'message' => 'Error al obtener las reservas del usuario'
            ];
        }
    }

}

?>

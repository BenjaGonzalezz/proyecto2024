<?php

// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";

// Definir la clase ReservaCarrito
class ReservaCarrito {

    // Método para solicitar una nueva reserva
    public function solicitarReservaModelo($usuario_cliente) {
        // Obtener la conexión a la base de datos
        $connection = connection();
    
        // Preparar una consulta para verificar si el usuario existe en la tabla 'cliente'
        $stmt = $connection->prepare("SELECT COUNT(*) FROM cliente WHERE usuario = ?");
        $stmt->bind_param('s', $usuario_cliente); // Vincular el parámetro del nombre de usuario
        $stmt->execute(); // Ejecutar la consulta
        $stmt->bind_result($count); // Vincular el resultado al contador $count
        $stmt->fetch(); // Obtener el resultado
        $stmt->close(); // Cerrar la declaración
    
        // Si el usuario no existe (el valor de $count es 0), devolver un mensaje de error
        if ($count == 0) {
            return [
                'status' => 'error',
                'message' => 'El usuario no existe'
            ];
        }
    
        // Definir la fecha actual para la reserva
        $fecha_reserva = date('Y-m-d'); // Obtener la fecha actual en formato 'YYYY-MM-DD'
        
        // Definir la fecha límite, que es 7 días después de la fecha de la reserva
        $fecha_limite = date('Y-m-d', strtotime($fecha_reserva . ' + 7 days')); // Calcular la fecha límite
        
        // Definir el estado inicial de la reserva como 'pendiente'
        $estado = 'pendiente';
    
        // Preparar la consulta para insertar una nueva reserva en la base de datos
        $stmt = $connection->prepare("INSERT INTO reserva (estado, fecha_limite, fecha_reserva, usuario_cliente) 
                                      VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $estado, $fecha_limite, $fecha_reserva, $usuario_cliente); // Vincular los parámetros a la consulta
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Si la inserción fue exitosa, obtener el ID de la nueva reserva
            $id_reserva = $stmt->insert_id; // Obtener el ID de la reserva recién creada
            
            // Devolver una respuesta exitosa con el ID de la reserva
            return [
                'status' => 'success',
                'message' => 'Reserva creada exitosamente',
                'id_reserva' => $id_reserva
            ];
        } else {
            // Si hay un error al crear la reserva, devolver un mensaje de error
            return [
                'status' => 'error',
                'message' => 'Error al crear la reserva'
            ];
        }
    }
}


<?php

require_once "../Connection/Connection.php";

class ReservaCarrito {
    public function solicitarReservaModelo($usuario_cliente) {
        $connection = connection();
    
        // Verificar si el usuario existe
        $stmt = $connection->prepare("SELECT COUNT(*) FROM cliente WHERE usuario = ?");
        $stmt->bind_param('s', $usuario_cliente);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
    
        // Si el usuario no existe, devolver un error
        if ($count == 0) {
            return [
                'status' => 'error',
                'message' => 'El usuario no existe'
            ];
        }
    
        // Fecha de la reserva (actual)
        $fecha_reserva = date('Y-m-d');
        
        // Fecha límite (7 días después)
        $fecha_limite = date('Y-m-d', strtotime($fecha_reserva . ' + 7 days'));
        
        // Estado inicial de la reserva (puedes cambiarlo según tu lógica)
        $estado = 'pendiente';
    
        // Preparar la consulta
        $stmt = $connection->prepare("INSERT INTO reserva (estado, fecha_limite, fecha_reserva, usuario_cliente) VALUES (?, ?, ?, ?)");
        $stmt->bind_param('ssss', $estado, $fecha_limite, $fecha_reserva, $usuario_cliente);
    
        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Devolver el ID de la reserva insertada
            $id_reserva = $stmt->insert_id;
            return [
                'status' => 'success',
                'message' => 'Reserva creada exitosamente',
                'id_reserva' => $id_reserva
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Error al crear la reserva'
            ];
        }
    }
    
}


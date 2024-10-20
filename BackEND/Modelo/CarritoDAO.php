<?php
// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";

// Definir la clase ReservaCarrito
class ReservaCarrito {
    
    public function solicitarReservaModelo($carrito, $usuario_cliente) {
        // Establecer conexión con la base de datos
        $connection = connection();
        $connection->begin_transaction();
    
        try {
            // Insertar la reserva en la tabla `reserva`
            $stmt = $connection->prepare("INSERT INTO reserva (estado, fecha_limite, fecha_reserva, usuario_cliente) VALUES (?, ?, ?, ?)");
            $estado = 'pendiente';
            $fecha_limite = date('Y-m-d H:i:s', strtotime('+1 week')); // Fecha límite a una semana
            $fecha_reserva = date('Y-m-d H:i:s'); // Fecha de reserva actual
            $stmt->bind_param("ssss", $estado, $fecha_limite, $fecha_reserva, $usuario_cliente);
            $stmt->execute();
    
            // Obtener el ID de la reserva recién creada
            $id_reserva = $connection->insert_id;
    
            // Preparar la consulta para insertar los productos reservados
            $stmtProductoReserva = $connection->prepare("INSERT INTO producto_reserva (id_producto, id_reserva) VALUES (?, ?)");
    
            // Preparar la consulta para actualizar el stock de cada producto
            $stmtStock = $connection->prepare("UPDATE producto SET stock = stock - ? WHERE id_producto = ?");
    
            // Recorrer el carrito e insertar cada producto en la reserva
            foreach ($carrito as $producto) {
                // Insertar producto en `producto_reserva`
                $stmtProductoReserva->bind_param("ii", $producto['id_producto'], $id_reserva);
                $stmtProductoReserva->execute();
    
                // Actualizar el stock del producto en la tabla `producto`
                $stmtStock->bind_param("ii", $producto['cantidad'], $producto['id_producto']);
                $stmtStock->execute();
            }
    
            // Confirmar la transacción
            $connection->commit();
    
            // Devolver éxito
            return ["success" => true, "message" => "Reserva creada con éxito y stock actualizado."];
        } catch (Exception $e) {
            // Revertir los cambios si algo sale mal
            $connection->rollback();
    
            // Devolver error
            return ["success" => false, "message" => "Error al crear la reserva: " . $e->getMessage()];
        } finally {
            // Cerrar la conexión
            $connection->close();
        }
    }
}



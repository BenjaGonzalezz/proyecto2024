<?php
// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";


// Definir la clase ReservaCarrito
class ReservaCarrito {  

    public function solicitarReservaModelo($usuario_cliente, $id_producto) {  
        // Este es el método para solicitar una reserva. Recibe el nombre del usuario cliente y el ID del producto.
        
        // Obtener la conexión a la base de datos
        $connection = connection();  

        // Verificar si el usuario existe en la tabla 'cliente'
        $stmt = $connection->prepare("SELECT COUNT(*) FROM cliente WHERE usuario = ?"); 

        $stmt->bind_param('s', $usuario_cliente); 
        $stmt->execute();  
        $stmt->bind_result($count); 
        $stmt->fetch();  
        $stmt->close();  
        // Se cierra la declaración.

        if ($count == 0) {  
            // Si el conteo es 0, significa que el usuario no existe.
            return [
                'status' => 'error',
                'message' => 'El usuario no existe'
            ];
            //Devuelve un mensaje de error indicando que el usuario no existe.
        }

        // Verificar si el producto existe y tiene stock disponible
        $stmt = $connection->prepare("SELECT stock FROM producto WHERE id_producto = ?");  
        // Se prepara una nueva consulta SQL para obtener el stock del producto con el ID proporcionado.
        
        $stmt->bind_param('i', $id_producto);  
        $stmt->execute();  
        $stmt->bind_result($stock);  
        $stmt->fetch();  
        $stmt->close();  
        // Se cierra la declaración.

        if ($stock === null) {  
            // Si el stock es "null", significa que el producto no existe.
            return [
                'status' => 'error',
                'message' => 'El producto no existe'
            // Se devuelve un mensaje de error indicando que el producto no existe.
            ];

        } elseif ($stock <= 0) {  
            // Si el stock es menor o igual a 0, significa que no hay stock disponible.
            return [
                'status' => 'error',
                'message' => 'No hay stock disponible para este producto'
            // Se devuelve un mensaje de error indicando que no hay stock disponible.
            ];
        }

        // Definir la fecha de reserva y límite
        $fecha_reserva = date('Y-m-d');  
        // Se obtiene la fecha actual en formato 'YYYY-MM-DD' para la fecha de la reserva.
        
        $fecha_limite = date('Y-m-d', strtotime($fecha_reserva . ' + 7 days'));  
        // Se calcula la fecha límite de la reserva (7 días después de la fecha de reserva).
        
        $estado = 'pendiente';  
        // Se define el estado inicial de la reserva como 'pendiente'.

        // Insertar la nueva reserva en la tabla 'reserva'
        $stmt = $connection->prepare("INSERT INTO reserva (estado, fecha_limite, fecha_reserva, usuario_cliente) 
                                      VALUES (?, ?, ?, ?)");  
        // Se prepara una consulta SQL para insertar una nueva reserva con los valores: estado, fecha límite, fecha de reserva, y usuario del cliente.
        
        $stmt->bind_param('ssss', $estado, $fecha_limite, $fecha_reserva, $usuario_cliente);  
        // Se vinculan los parámetros correspondientes a la consulta preparada.
        
        if ($stmt->execute()) {  
            // Si la consulta se ejecuta correctamente (la reserva se inserta en la base de datos).
            
            $id_reserva = $stmt->insert_id;  
            // Se obtiene el ID de la reserva recién creada.

            // Reducir el stock del producto
            $stmt = $connection->prepare("UPDATE producto SET stock = stock - 1 WHERE id_producto = ?");  
            // Se prepara una consulta SQL para actualizar el stock del producto, restando 1 al valor actual del stock.
            
            $stmt->bind_param('i', $id_producto);  
            // Se vincula el parámetro `$id_producto` (entero) a la consulta preparada.
            
            if ($stmt->execute()) {  
                // Si la consulta de actualización del stock se ejecuta correctamente.
                return [
                    'status' => 'success',
                    'message' => 'Reserva creada y stock actualizado',
                    'id_reserva' => $id_reserva
                    // Se devuelve un mensaje de éxito indicando que la reserva fue creada y el stock fue actualizado.
                ];
            } else {  
                // Si hay un error al actualizar el stock.
                return [
                    'status' => 'error',
                    'message' => 'Error al actualizar el stock del producto'
                // Se devuelve un mensaje de error indicando que hubo un problema al actualizar el stock.
                ];
            }
        } else {  
            // Si hay un error al insertar la reserva en la base de datos.
            return [
                'status' => 'error',
                'message' => 'Error al crear la reserva'
            // Se devuelve un mensaje de error indicando que hubo un problema al crear la reserva.
            ];
        }
    }
}

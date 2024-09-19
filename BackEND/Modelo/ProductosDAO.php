<?php

// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";

// Definir la clase Producto
class Producto {

    // Método para agregar un nuevo producto
    function agregarProductoModelo($categoria, $nombre, $stock, $precio, $imagen, $color, $medida) {
        // Obtener la conexión a la base de datos
        $connection = connection();
        
        // Insertar los datos del producto en la base de datos, sin incluir la imagen inicialmente
        $sql = "INSERT INTO producto (categoria, nombre, stock, precio, color, medida) 
                VALUES ('$categoria', '$nombre', '$stock', '$precio', '$color', '$medida');";
        
        // Verificar si la inserción fue exitosa
        if ($connection->query($sql) === TRUE) {
            // Obtener el ID del producto recién insertado
            $idProducto = $connection->insert_id;
            
            // Obtener la ruta temporal de la imagen cargada
            $rutaTemp = $imagen['tmp_name'];
            
            // Definir la extensión y el destino final para la imagen usando el ID del producto
            $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION); // Obtener la extensión del archivo
            $destino = "../imgs/" . $idProducto . "." . $extension; // Crear el nombre del archivo con el ID del producto
            
            // Mover el archivo de la ubicación temporal al directorio de destino
            move_uploaded_file($rutaTemp, $destino);
            
            // Actualizar el campo 'imagen' en la base de datos con el nombre del archivo de imagen
            $sqlUpdate = "UPDATE producto SET imagen = '$idProducto.$extension' WHERE id_producto = $idProducto;";
            $connection->query($sqlUpdate);
            
            // Retornar una respuesta exitosa
            return array("success" => true, "message" => "Producto agregado exitosamente");
        } else {
            // Retornar un mensaje de error si no se pudo insertar el producto
            return array("success" => false, "message" => "Error al agregar producto: " . $connection->error);
        }
    }

    // Método para obtener todos los productos
    function obtenerProductosModelo() {
        // Obtener la conexión a la base de datos
        $connection = connection();
        
        // Consulta SQL para seleccionar todos los productos
        $sql = "SELECT * FROM producto";
        $result = $connection->query($sql);
        
        // Verificar si hay productos
        if ($result->num_rows > 0) {
            $productos = array();
            // Recorrer los resultados y agregarlos al array
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            // Retornar los productos en un array con éxito
            return array("success" => true, "productos" => $productos);
        } else {
            // Retornar un mensaje si no se encontraron productos
            return array("success" => false, "message" => "No se encontraron productos");
        }
    }

    // Método para obtener productos por categoría
    function obtenerProductosPorCategoriaModelo($categoria) {
        // Obtener la conexión a la base de datos
        $connection = connection();
        
        // Preparar la consulta SQL para seleccionar productos por categoría
        $sql = "SELECT * FROM producto WHERE categoria = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $categoria); // Vincular el parámetro de la categoría
        $stmt->execute();
        $result = $stmt->get_result();
        
        // Verificar si hay productos
        $productos = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            return array("success" => true, "data" => $productos);
        } else {
            return array("success" => false, "message" => "No se encontraron productos en esta categoría.");
        }
    }

    // Método para agregar una oferta
    function agregarOfertaModelo($id_producto) {
        $connection = connection();

        // Consulta para verificar si ya existe una oferta activa
        $sqlCheck = "SELECT COUNT(*) as count FROM oferta";
        $stmtCheck = $connection->prepare($sqlCheck);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();
        $data = $resultCheck->fetch_assoc();

        // Verificar si ya hay una oferta
        if ($data['count'] > 0) {
            return array("success" => false, "message" => "No se puede agregar una oferta porque ya hay una disponible.");
        }

        // Consulta para agregar una nueva oferta
        $sql = "INSERT INTO oferta (id_producto) VALUES (?)";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("i", $id_producto);

        // Verificar si la inserción fue exitosa
        if ($stmt->execute()) {
            return array("success" => true, "message" => "Oferta agregada exitosamente.");
        } else {
            return array("success" => false, "message" => "Error al agregar la oferta: " . $connection->error);
        }
    }

    // Método para eliminar una oferta
    function eliminarOfertaModelo() {
        $connection = connection();

        // Consulta para eliminar la oferta
        $sql = "DELETE FROM oferta WHERE id_producto IS NOT NULL";
        $stmt = $connection->prepare($sql);

        // Verificar si la eliminación fue exitosa
        if ($stmt->execute()) {
            return array("success" => true, "message" => "Oferta eliminada exitosamente.");
        } else {
            return array("success" => false, "message" => "Error al eliminar la oferta: " . $connection->error);
        }
    }

    // Método para obtener las ofertas actuales
    function obtenerOfertaModelo() {
        $connection = connection();

        // Consulta para obtener los productos en oferta
        $sql = "SELECT p.* FROM producto p
                INNER JOIN oferta o ON p.id_producto = o.id_producto";
        $resultado = $connection->query($sql);

        // Verificar si hay productos en oferta
        if ($resultado->num_rows > 0) {
            $productos = array();
            while ($producto = $resultado->fetch_assoc()) {
                $productos[] = $producto;
            }
            return array("success" => true, "productos" => $productos);
        } else {
            return array("success" => false, "message" => "No hay ofertas disponibles.");
        }
    }

    // Método para obtener los detalles de un producto específico
    function obtenerDetallesProductoModelo($idProducto) {
        $connection = connection();

        // Consulta para obtener el producto por su ID
        $sql = "SELECT * FROM producto WHERE id_producto = '$idProducto'";
        $resultado = $connection->query($sql);

        // Verificar si se encontró el producto
        if ($resultado->num_rows > 0) {
            $producto = $resultado->fetch_assoc();
            return array("success" => true, "producto" => $producto);
        } else {
            return array("success" => false, "message" => "Producto no encontrado");
        }
    }

    // Método para obtener un producto por su ID
    function obtenerProductoModelo($id_producto){
        $connection = connection();

        // Consulta SQL para obtener el producto por su ID
        $sql = "SELECT * FROM producto WHERE id_producto = '$id_producto';";
        $respuesta = $connection->query($sql);

        // Devolver los productos obtenidos
        $productos = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $productos;
    }

    // Método para eliminar un producto
    function eliminarProductoModelo($id_producto) {
        $connection = connection();

        // Consulta para eliminar un producto por su ID
        $sql = "DELETE FROM producto WHERE id_producto = ?";

        // Preparar la declaración
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("i", $id_producto); // Vincular el ID del producto

        // Ejecutar la consulta y verificar si se eliminó algún producto
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                return array("success" => true, "message" => "Producto eliminado exitosamente.");
            } else {
                return array("success" => false, "message" => "Producto no encontrado.");
            }
        } else {
            return array("success" => false, "message" => "Error al eliminar producto: " . $connection->error);
        }
    }


    // Método para agregar stock a un producto
function agregarStockProductoModelo($id_producto, $cantidad) {
    // Obtener la conexión a la base de datos
    $connection = connection();

    // Consulta para actualizar el stock del producto
    $sql = "UPDATE producto SET stock = stock + ? WHERE id_producto = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("ii", $cantidad, $id_producto);

    // Ejecutar la consulta y verificar si se actualizó el stock
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            return array("success" => true, "message" => "Stock actualizado exitosamente.");
        } else {
            return array("success" => false, "message" => "Producto no encontrado.");
        }
    } else {
        return array("success" => false, "message" => "Error al actualizar el stock: " . $connection->error);
    }
}


// Método para modificar el precio de un producto
function modificarPrecioProductoModelo($id_producto, $nuevo_precio) {
    // Obtener la conexión a la base de datos
    $connection = connection();

    // Consulta para actualizar el precio del producto
    $sql = "UPDATE producto SET precio = ? WHERE id_producto = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("di", $nuevo_precio, $id_producto);

    // Ejecutar la consulta y verificar si se actualizó el precio
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            return array("success" => true, "message" => "Precio actualizado exitosamente.");
        } else {
            return array("success" => false, "message" => "Producto no encontrado.");
        }
    } else {
        return array("success" => false, "message" => "Error al actualizar el precio: " . $connection->error);
    }
}

}
?>

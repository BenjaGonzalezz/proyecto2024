<?php

require_once "../Connection/Connection.php";

class Producto {
    
    function agregarProductoModelo($categoria, $nombre, $stock, $precio, $imagen, $color, $medida) {
        $connection = connection();
        
        // Insertar los datos en la tabla sin imagen inicialmente
        $sql = "INSERT INTO producto (categoria, nombre, stock, precio, color, medida) 
                VALUES ('$categoria', '$nombre', '$stock', '$precio', '$color', '$medida');";
        
        if ($connection->query($sql) === TRUE) {
            // Obtener el id_producto recién insertado
            $idProducto = $connection->insert_id;
            
            // Obtener la ruta temporal de la imagen
            $rutaTemp = $imagen['tmp_name'];
            
            // Definir el destino usando el ID del producto
            $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION); // Obtener la extensión de la imagen
            $destino = "../imgs/" . $idProducto . "." . $extension; // Guardar la imagen con el ID del producto
            
            // Mover el archivo al directorio
            move_uploaded_file($rutaTemp, $destino);
            
            // Actualizar el campo 'imagen' en la base de datos con el nombre de la imagen renombrada
            $sqlUpdate = "UPDATE producto SET imagen = '$idProducto.$extension' WHERE id_producto = $idProducto;";
            $connection->query($sqlUpdate);
            
            return array("success" => true, "message" => "Producto agregado exitosamente");
        } else {
            return array("success" => false, "message" => "Error al agregar producto: " . $connection->error);
        }
    }



function obtenerProductosModelo() {
    $connection = connection();
    
    $sql = "SELECT * FROM producto";
    $result = $connection->query($sql);
    
    if ($result->num_rows > 0) {
        $productos = array();
        while ($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
        return array("success" => true, "productos" => $productos);
    } else {
        return array("success" => false, "message" => "No se encontraron productos");
    }
}

function obtenerProductosPorCategoriaModelo($categoria) {
    $connection = connection();
    
    $sql = "SELECT * FROM producto WHERE categoria = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("s", $categoria);
    $stmt->execute();
    $result = $stmt->get_result();
    
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
function agregarOfertaModelo($id_producto) {
    $connection = connection();

    // Consulta para verificar si ya hay una oferta activa
    $sqlCheck = "SELECT COUNT(*) as count FROM oferta";
    $stmtCheck = $connection->prepare($sqlCheck);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    $data = $resultCheck->fetch_assoc();

    if ($data['count'] > 0) {
        return array("success" => false, "message" => "No se puede agregar una oferta porque ya hay una disponible.");
    }

    // Consulta para agregar el producto a la tabla de ofertas
    $sql = "INSERT INTO oferta (id_producto) VALUES (?)";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("i", $id_producto);

    if ($stmt->execute()) {
        return array("success" => true, "message" => "Oferta agregada exitosamente.");
    } else {
        return array("success" => false, "message" => "Error al agregar la oferta: " . $connection->error);
    }
}

function eliminarOfertaModelo() {
    $connection = connection();

    // Consulta para eliminar la oferta actual
    $sql = "DELETE FROM oferta WHERE id_producto IS NOT NULL";
    $stmt = $connection->prepare($sql);

    if ($stmt->execute()) {
        return array("success" => true, "message" => "Oferta eliminada exitosamente.");
    } else {
        return array("success" => false, "message" => "Error al eliminar la oferta: " . $connection->error);
    }
}



function obtenerOfertaModelo() {
    // Conectar a la base de datos
    $connection = connection();

    // Consulta para obtener los productos en oferta (utiliza la FK de id_producto)
    $sql = "SELECT p.* FROM producto p
            INNER JOIN oferta o ON p.id_producto = o.id_producto";

    $resultado = $connection->query($sql);

    // Si hay resultados, devolver los detalles de los productos en oferta
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

function obtenerDetallesProductoModelo($idProducto) {
    // Conectar a la base de datos
    $connection = connection();

    // Consulta para obtener los detalles del producto según su ID
    $sql = "SELECT * FROM producto WHERE id_producto = '$idProducto'";
    $resultado = $connection->query($sql);

    // Si encuentra el producto, retorna los detalles
    if ($resultado->num_rows > 0) {
        $producto = $resultado->fetch_assoc();
        return array("success" => true, "producto" => $producto);
    } else {
        // Si no se encuentra el producto, retornar un error
        return array("success" => false, "message" => "Producto no encontrado");
    }
}

function obtenerProductoModelo($id_producto){
    
    $connection = connection();
    $sql = "SELECT * FROM producto WHERE id_producto = '$id_producto';";
    $respuesta = $connection->query($sql);
    $productos = $respuesta->fetch_all(MYSQLI_ASSOC);
    return $productos;

}

function eliminarProductoModelo($id_producto) {
    // Conectar a la base de datos
    $connection = connection();

    // Preparar la consulta SQL para eliminar el producto
    $sql = "DELETE FROM producto WHERE id_producto = ?";

    // Preparar la declaración
    $stmt = $connection->prepare($sql);

    // Vincular el parámetro
    $stmt->bind_param("i", $id_producto);

    // Ejecutar la consulta y verificar el resultado
    if ($stmt->execute()) {
        // Verificar si se eliminó alguna fila
        if ($stmt->affected_rows > 0) {
            return array("success" => true, "message" => "Producto eliminado exitosamente.");
        } else {
            return array("success" => false, "message" => "Producto no encontrado.");
        }
    } else {
        // Si hay un error en la consulta, devolver el error
        return array("success" => false, "message" => "Error al eliminar producto: " . $connection->error);
    }
}

}



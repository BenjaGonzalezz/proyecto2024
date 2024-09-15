<?php

require_once "../Connection/Connection.php";

class Producto{
    
    
    function agregarProductoModelo($categoria, $nombre, $stock, $precio, $imagen, $color, $medida) {
    $connection = connection();
    
    // Obtener el nombre original de la imagen
    $nomImg = $imagen['name'];
    
    // Insertar los datos en la tabla producto (la imagen es el nombre original del archivo)
    $sql = "INSERT INTO producto (categoria, nombre, stock, precio, imagen, color, medida) VALUES ('$categoria', '$nombre', '$stock', '$precio', '$nomImg', '$color', '$medida');";
    
    if ($connection->query($sql) === TRUE) {
        $rutaTemp = $imagen['tmp_name'];
        
        // Mover la imagen al directorio de imágenes con el nombre original
        $destino = "../imgs/" . $nomImg;

        if (file_exists($destino)) {

            return array("success" => false, "message" => "Ya existe una imagen con ese nombre.");
        }

        // Mover el archivo al directorio
        move_uploaded_file($rutaTemp, $destino);
        
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
    
function obtenerProductoModelo($id_producto){
    
    $connection = connection();
    $sql = "SELECT * FROM producto WHERE id_producto = '$id_producto';";
    $respuesta = $connection->query($sql);
    $productos = $respuesta->fetch_all(MYSQLI_ASSOC);
    return $productos;

}

    
function agregarStockProductoModelo($id_producto, $stock){
    
    $sql = "INSERT INTO producto(id_producto, stock) VALUES('$id_producto', '$stock');";
    $connection = connection();
    $respuesta = $connection->query($sql);
    return $respuesta;

}


function eliminarProductoModelo($id_producto){
 
    $sql = "DELETE FROM producto WHERE id_producto = $id_producto;";
    $connection = connection();
    $respuesta = $connection->query($sql);
    return $respuesta;
    }

}



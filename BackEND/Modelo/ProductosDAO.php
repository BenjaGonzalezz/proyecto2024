<?php

require_once "../Connection/Connection.php";

class Producto{
    function agregarProductoModelo($nombre, $stock, $precio, $imagen, $color, $medida) {
        $connection = connection();
        
        // Obtener nombre y extensión de la imagen
        $nomImg = $imagen['name'];
        $extension = pathinfo($nomImg, PATHINFO_EXTENSION);
        
        // Insertar los datos en la tabla producto (la imagen es solo el nombre del archivo)
        $sql = "INSERT INTO producto (nombre, stock, precio, imagen, color, medida) VALUES ('$nombre', '$stock', '$precio', '$nomImg', '$color', '$medida');";
        
        if ($connection->query($sql) === TRUE) {
            $id = $connection->insert_id; // Obtener el ID del producto recién insertado
            $rutaTemp = $imagen['tmp_name'];
            
            // Mover la imagen al directorio de imágenes
            move_uploaded_file($rutaTemp, "../imgs/$id.$extension");
            
            return array("success" => true, "message" => "Producto agregado exitosamente");
        } else {
            return array("success" => false, "message" => "Error al agregar producto: " . $connection->error);
        }
    }
    
function obtenerProductosModelo(){
    
    $connection = connection();
    $sql = "SELECT * FROM producto;";
    $respuesta = $connection->query($sql);
    $productos = $respuesta->fetch_all(MYSQLI_ASSOC);
    return $productos;

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



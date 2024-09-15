<?php

require_once "../Connection/Connection.php";

class Producto{
    function agregarProductoModelo($categoria, $nombre, $stock, $precio, $imagen, $color, $medida) {
        $connection = connection();
        
        // Obtener nombre y extensión de la imagen
        $nomImg = $imagen['name'];
        $extension = pathinfo($nomImg, PATHINFO_EXTENSION);
        
        // Insertar los datos en la tabla producto (la imagen es solo el nombre del archivo)
        $sql = "INSERT INTO producto (categoria, nombre, stock, precio, imagen, color, medida) VALUES ('$categoria', '$nombre', '$stock', '$precio', '$nomImg', '$color', '$medida');";
        
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
        
        // Consulta para obtener todos los productos
        $sql = "SELECT * FROM producto";
        $result = $connection->query($sql);
        
        // Verifica si la consulta devuelve filas
        if ($result->num_rows > 0) {
            $productos = array();
            
            // Recorrer cada fila y agregarla al array de productos
            while($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            
            return array("success" => true, "productos" => $productos);
        } else {
            return array("success" => false, "message" => "No se encontraron productos");
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



<?php

require_once "../Connection/Connection.php";

class Producto{

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



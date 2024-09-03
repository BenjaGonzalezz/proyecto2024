<?php

require_once '../Modelo/ProductosDAO.php';


$function = $_GET['function'];

switch ($function) {
    case "obtenerProductos":
        obtenerProductos();
        break;
    case "obtenerProducto":
        obtenerProducto();
        break;
    case "agregarStockProducto":
        agregarStockProducto();
        break;
    case "eliminarProducto":
        eliminarProducto();
        break;
}

function obtenerProductos(){
    $resultado = (new Producto())->obtenerProductosModelo();
    echo json_encode($resultado);
}

function obtenerProducto(){
    $id_producto = $_POST["id_producto"];
    $resultado = (new Producto())->obtenerProductoModelo($id_producto);
    echo json_encode($resultado);
}

function agregarStockProducto(){
    $id_producto = $_POST['id_producto'];
    $stock = $_POST['stock'];
    $resultado = (new Producto())->agregarStockProductoModelo($id_producto, $stock);
    echo json_encode($resultado);
}

function eliminarProducto(){
    $id_producto = $_POST["id_producto"];
    $resultado = (new Producto())->eliminarProductoModelo($id_producto);
    echo json_encode($resultado);
}


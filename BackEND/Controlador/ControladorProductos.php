<?php

require_once '../Modelo/ProductosDAO.php';


$function = $_GET['function'];

switch ($function) {
    case "agregarProducto":
        agregarProducto();
        break;
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
function agregarProducto() {
    $nombre = $_POST['nombre'];
    $stock = $_POST['stock'];
    $precio = $_POST['precio'];
    $imagen = $_FILES['imagen'];
    $color = $_POST['color'];
    $medida = $_POST['medida'];
    
    $resultado = (new Producto())->agregarProductoModelo($nombre, $stock, $precio, $imagen, $color, $medida);
    
    echo json_encode($resultado);
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


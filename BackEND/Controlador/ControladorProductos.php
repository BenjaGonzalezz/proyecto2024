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
    case "obtenerProductosPorCategoria":
        obtenerProductosPorCategoria();
        break;
    case "obtenerDetallesProducto":
        obtenerDetallesProducto();
        break;
    case "agregarOferta":
        agregarOferta();
        break;
    case "eliminarOferta":
        eliminarOferta();
        break;
    case "obtenerOferta":
        obtenerOferta();
        break;
    case "eliminarProducto":
        eliminarProducto();
        break;
}

function agregarProducto() {
    $categoria = $_POST['categoria'];
    $nombre = $_POST['nombre'];
    $stock = $_POST['stock'];
    $precio = $_POST['precio'];
    $imagen = $_FILES['imagen'];
    $color = $_POST['color'];
    $medida = $_POST['medida'];
    
    $resultado = (new Producto())->agregarProductoModelo($categoria, $nombre, $stock, $precio, $imagen, $color, $medida);
    
    echo json_encode($resultado);
}

function obtenerProductos() {
    $resultado = (new Producto())->obtenerProductosModelo();
    echo json_encode($resultado);
}

function obtenerProductosPorCategoria() {
    $categoria = $_POST['categoria'];
    $categoria = filter_var($categoria, FILTER_SANITIZE_STRING);
    $resultado = (new Producto())->obtenerProductosPorCategoriaModelo($categoria);
    echo json_encode($resultado);
}
function obtenerDetallesProducto() {
    $id_producto = $_POST['id_producto'];
    $resultado = (new Producto())->obtenerDetallesProductoModelo($id_producto);

    // Establecer el tipo de contenido como JSON
    header('Content-Type: application/json');
    echo json_encode($resultado);
}

function agregarOferta() {
    $id_producto = $_POST['id_producto'];
    $resultado = (new Producto())->agregarOfertaModelo($id_producto);
    echo json_encode($resultado);
}
function eliminarOferta() {
    $resultado = (new Producto())->eliminarOfertaModelo();
    echo json_encode($resultado);
}
function obtenerOferta(){
    $resultado = (new Producto())->obtenerOfertaModelo();
    echo json_encode($resultado);
}

function eliminarProducto(){
    $id_producto = $_POST["id_producto"];
    $resultado = (new Producto())->eliminarProductoModelo($id_producto);
    echo json_encode($resultado);
}


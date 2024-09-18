<?php

// Incluye el archivo que contiene las funciones del modelo de productos
require_once '../Modelo/ProductosDAO.php';

// Obtiene el valor del parámetro 'function' enviado mediante la URL (GET)
$function = $_GET['function'];

// Estructura switch para ejecutar diferentes funciones dependiendo del valor de 'function'
switch ($function) {
    // Si 'function' es "agregarProducto", se llama a la función agregarProducto()
    case "agregarProducto":
        agregarProducto();
        break;
    
    // Si 'function' es "obtenerProductos", se llama a la función obtenerProductos()
    case "obtenerProductos":
        obtenerProductos();
        break;
    
    // Si 'function' es "obtenerProductosPorCategoria", se llama a la función obtenerProductosPorCategoria()
    case "obtenerProductosPorCategoria":
        obtenerProductosPorCategoria();
        break;
    
    // Si 'function' es "obtenerDetallesProducto", se llama a la función obtenerDetallesProducto()
    case "obtenerDetallesProducto":
        obtenerDetallesProducto();
        break;
    
    // Si 'function' es "agregarOferta", se llama a la función agregarOferta()
    case "agregarOferta":
        agregarOferta();
        break;
    
    // Si 'function' es "eliminarOferta", se llama a la función eliminarOferta()
    case "eliminarOferta":
        eliminarOferta();
        break;
    
    // Si 'function' es "obtenerOferta", se llama a la función obtenerOferta()
    case "obtenerOferta":
        obtenerOferta();
        break;
    
    // Si 'function' es "eliminarProducto", se llama a la función eliminarProducto()
    case "eliminarProducto":
        eliminarProducto();
        break;
}

// Función para agregar un nuevo producto
function agregarProducto() {
    // Recibe los datos enviados mediante POST
    $categoria = $_POST['categoria'];
    $nombre = $_POST['nombre'];
    $stock = $_POST['stock'];
    $precio = $_POST['precio'];
    $imagen = $_FILES['imagen'];  // Archivos enviados (imagen)
    $color = $_POST['color'];
    $medida = $_POST['medida'];
    
    // Llama al método 'agregarProductoModelo' del modelo Producto para insertar el producto en la base de datos
    $resultado = (new Producto())->agregarProductoModelo($categoria, $nombre, $stock, $precio, $imagen, $color, $medida);
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para obtener todos los productos
function obtenerProductos() {
    // Llama al método 'obtenerProductosModelo' del modelo Producto para obtener los productos
    $resultado = (new Producto())->obtenerProductosModelo();
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para obtener productos filtrados por categoría
function obtenerProductosPorCategoria() {
    // Recibe la categoría enviada mediante POST
    $categoria = $_POST['categoria'];
    
    // Limpia el valor de la categoría para evitar inyección de código
    $categoria = filter_var($categoria, FILTER_SANITIZE_STRING);
    
    // Llama al método 'obtenerProductosPorCategoriaModelo' del modelo Producto para obtener los productos según la categoría
    $resultado = (new Producto())->obtenerProductosPorCategoriaModelo($categoria);
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para obtener los detalles de un producto específico
function obtenerDetallesProducto() {
    // Recibe el ID del producto enviado mediante POST
    $id_producto = $_POST['id_producto'];
    
    // Llama al método 'obtenerDetallesProductoModelo' del modelo Producto para obtener los detalles del producto
    $resultado = (new Producto())->obtenerDetallesProductoModelo($id_producto);

    // Establece el tipo de contenido de la respuesta como JSON
    header('Content-Type: application/json');
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para agregar un producto a la oferta
function agregarOferta() {
    // Recibe el ID del producto enviado mediante POST
    $id_producto = $_POST['id_producto'];
    
    // Llama al método 'agregarOfertaModelo' del modelo Producto para agregar el producto a la oferta
    $resultado = (new Producto())->agregarOfertaModelo($id_producto);
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para eliminar la oferta activa
function eliminarOferta() {
    // Llama al método 'eliminarOfertaModelo' del modelo Producto para eliminar la oferta
    $resultado = (new Producto())->eliminarOfertaModelo();
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para obtener productos en oferta
function obtenerOferta() {
    // Llama al método 'obtenerOfertaModelo' del modelo Producto para obtener los productos en oferta
    $resultado = (new Producto())->obtenerOfertaModelo();
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

// Función para eliminar un producto
function eliminarProducto() {
    // Recibe el ID del producto enviado mediante POST
    $id_producto = $_POST["id_producto"];
    
    // Llama al método 'eliminarProductoModelo' del modelo Producto para eliminar el producto de la base de datos
    $resultado = (new Producto())->eliminarProductoModelo($id_producto);
    
    // Devuelve el resultado en formato JSON
    echo json_encode($resultado);
}

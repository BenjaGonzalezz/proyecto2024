export default class ProductosDAO {

    async agregarProducto($categoria, $nombre, $stock, $precio, $imagen, $color, $medida){

        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=agregarProducto";
        let formdata = new FormData();
        formdata.append("categoria", $categoria);
        formdata.append("nombre", $nombre);
        formdata.append("stock", $stock);
        formdata.append("precio", $precio);
        formdata.append("imagen", $imagen);
        formdata.append("color", $color);
        formdata.append("medida", $medida);

        let config = {
            method: "POST",
            body: formdata
        };

        let respuesta = await fetch(url, config);
        if (!respuesta.ok) {

            throw new Error('Error en la respuesta del servidor');
        }
        let resultado = await respuesta.json();
        return resultado;
    }
        
    async obtenerProductos() {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerProductos";
        
        let config = {
            method: "POST"
        };
    
        let respuesta = await fetch(url, config);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        let resultado = await respuesta.json();
        return resultado;
    }

    
    async obtenerProductosPorCategoria(categoria) {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerProductosPorCategoria";
        
        let formdata = new FormData();
        formdata.append("categoria", categoria);  // Enviar la categoría como parámetro
    
        let config = {
            method: "POST",
            body: formdata
        };
    
        let respuesta = await fetch(url, config);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        let resultado = await respuesta.json();
        return resultado;
    }


    async obtenerProducto() {

    }

    async agregarStockProducto() {

    }

    async eliminarProducto() {


    }


}
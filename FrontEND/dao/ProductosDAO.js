// Exporta la clase ProductosDAO como el módulo predeterminado
export default class ProductosDAO {

    // Método para agregar un nuevo producto
    async agregarProducto($categoria, $nombre, $stock, $precio, $imagen, $color, $medida) {
        // URL del backend para agregar un producto
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=agregarProducto";
        
        // Crear un objeto FormData para enviar los datos del formulario
        let formdata = new FormData();
        formdata.append("categoria", $categoria);   // Agrega la categoría al FormData
        formdata.append("nombre", $nombre);         // Agrega el nombre del producto al FormData
        formdata.append("stock", $stock);           // Agrega el stock del producto al FormData
        formdata.append("precio", $precio);         // Agrega el precio del producto al FormData
        formdata.append("imagen", $imagen);         // Agrega la imagen del producto al FormData
        formdata.append("color", $color);           // Agrega el color del producto al FormData
        formdata.append("medida", $medida);         // Agrega la medida del producto al FormData

        // Configuración de la solicitud fetch con el método POST
        let config = {
            method: "POST",        // Método HTTP para enviar los datos
            body: formdata         // Datos que se envían en el cuerpo de la solicitud
        };

        // Envío de la solicitud al backend y espera de la respuesta
        let respuesta = await fetch(url, config);
        
        // Si la respuesta no es exitosa, se lanza un error
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        // Se convierte la respuesta en JSON para obtener los datos
        let resultado = await respuesta.json();
        
        // Se devuelve el resultado de la operación de agregar producto
        return resultado;
    }
        
    // Método para obtener todos los productos
    async obtenerProductos() {
        // URL del backend para obtener todos los productos
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerProductos";
        
        // Configuración de la solicitud fetch con el método POST
        let config = {
            method: "POST"  // Método HTTP para enviar la solicitud
        };
    
        // Envío de la solicitud al backend y espera de la respuesta
        let respuesta = await fetch(url, config);
        
        // Si la respuesta no es exitosa, se lanza un error
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        // Se convierte la respuesta en JSON para obtener los datos
        let resultado = await respuesta.json();
        
        // Se devuelve el resultado de la operación de obtener productos
        return resultado;
    }

    // Método para obtener productos filtrados por categoría
    async obtenerProductosPorCategoria(categoria) {
        // URL del backend para obtener productos por categoría
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorProductos.php?function=obtenerProductosPorCategoria";
        
        // Crear un objeto FormData para enviar la categoría como parámetro
        let formdata = new FormData();
        formdata.append("categoria", categoria);  // Enviar la categoría como parámetro
    
        // Configuración de la solicitud fetch con el método POST
        let config = {
            method: "POST",        // Método HTTP para enviar los datos
            body: formdata         // Datos que se envían en el cuerpo de la solicitud
        };
    
        // Envío de la solicitud al backend y espera de la respuesta
        let respuesta = await fetch(url, config);
        
        // Si la respuesta no es exitosa, se lanza un error
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        // Se convierte la respuesta en JSON para obtener los datos
        let resultado = await respuesta.json();
        
        // Se devuelve el resultado de la operación de obtener productos por categoría
        return resultado;
    }


    async obtenerProducto() {

    }

    async agregarStockProducto() {

    }

    async eliminarProducto() {


    }


}
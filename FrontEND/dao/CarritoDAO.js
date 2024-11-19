import origin from "../../BackEND/Origin/Origin.js";

export default class CarritoDAO {


    async solicitarReservaCarrito(carrito) {
        const url = origin + "/BackEND/Controlador/ControladorCarrito.php?function=solicitarReserva";
    
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'  // Especificar que estás enviando JSON
            },
            body: JSON.stringify(carrito)  // Enviar directamente el carrito como JSON
        };
    
        const respuesta = await fetch(url, config);
    
        if (!respuesta.ok) {
            console.error(`Error del servidor: ${respuesta.status} - ${respuesta.statusText}`);
            throw new Error('Error en la respuesta del servidor');
        }
    
        const resultado = await respuesta.json();
        return resultado;
    }
    
    
}

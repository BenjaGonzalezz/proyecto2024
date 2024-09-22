export default class CarritoDAO {

    async solicitarReservaCarrito() {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorCarrito.php?function=solicitarReserva";

        let config = {
            method: "POST",
            body: formdata
        };

            let respuesta = await fetch(url, config);

            if (!respuesta.ok) {
                console.error(`Error del servidor: ${respuesta.status} - ${respuesta.statusText}`);
                throw new Error('Error en la respuesta del servidor');
            }

            let resultado = await respuesta.json();
            return resultado;

    }
}

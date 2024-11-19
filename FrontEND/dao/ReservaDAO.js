import origin from "../../BackEND/Origin/Origin";

export default class ReservaDAO {

    async cambiarEstado(id_reserva, nuevo_estado) {

        let url = origin + "/BackEND/Controlador/ControladorReserva.php?function=cambiarEstado";

        let formdata = new FormData();
        formdata.append("id_reserva", id_reserva);
        formdata.append("nuevo_estado", nuevo_estado);

        let config = {
            method: "POST",
            body: formdata
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor al cambiar el estado');
        }

        let resultado = await respuesta.json();

        return resultado;
    }

    async obtenerReservas() {

        let url = origin + "/BackEND/Controlador/ControladorReserva.php?function=obtenerReservas";

        let config = {
            method: "GET",
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor al obtener las reservas');
        }

        let resultado = await respuesta.json();

        return resultado;
    }

    async obtenerReservaUsuario(usuario_cliente) {

        let url = origin + "/BackEND/Controlador/ControladorReserva.php?function=obtenerReservaUsuario";

        let formdata = new FormData();
        formdata.append("usuario_cliente", usuario_cliente);

        let config = {
            method: "POST",
            body: formdata
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor al obtener las reservas del usuario');
        }

        let resultado = await respuesta.json();

        return resultado;
    }

    
}
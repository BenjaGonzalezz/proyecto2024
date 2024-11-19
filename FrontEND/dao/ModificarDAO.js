import origin from "../../BackEND/Origin/Origin.js";

export default class ModificarDAO {

    async modificarNombre(nuevoNombre) {
        let url = origin + "/BackEND/Controlador/ControladorModificar.php?function=modificarNombre";

        let formData = new FormData();
        formData.append("nuevoNombre", nuevoNombre);

        let config = {
            method: "POST",
            body: formData
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        let resultado = await respuesta.json();

        return resultado;
    }

    async modificarUsuario(nuevoUsuario) {
        let url = origin + "/BackEND/Controlador/ControladorModificar.php?function=modificarUsuario";

        let formData = new FormData();
        formData.append("nuevoUsuario", nuevoUsuario);
        formData.append("usuarioActual", localStorage.getItem('usuario'));

        let config = {
            method: "POST",
            body: formData
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        let resultado = await respuesta.json();
        return resultado;
    }


    async modificarEmail(nuevoEmail) {
        let url = origin + "/BackEND/Controlador/ControladorModificar.php?function=modificarEmail";

        let formData = new FormData();
        const usuarioActual = localStorage.getItem('usuario');
        formData.append("usuarioActual", usuarioActual);
        formData.append("nuevoEmail", nuevoEmail);

        let config = {
            method: "POST",
            body: formData
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        let resultado = await respuesta.json();
        return resultado;
    }

    async modificarTelefono(nuevoTelefono) {
        let url = origin + "/BackEND/Controlador/ControladorModificar.php?function=modificarTelefono";

        let formData = new FormData();
        const usuarioActual = localStorage.getItem('usuario');
        formData.append("usuarioActual", usuarioActual);
        formData.append("nuevoTelefono", nuevoTelefono);

        let config = {
            method: "POST",
            body: formData
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        let resultado = await respuesta.json();
        return resultado;
    }
}
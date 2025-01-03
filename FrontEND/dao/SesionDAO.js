import origin from "../../BackEND/Origin/Origin";

export default class SesionDAO {

    async registerUsuario(nombre, usuario, contraseña, email, telefono) {

        let url = origin + "/BackEND/Controlador/ControladorSesion.php?function=registerUsuario";

        let formdata = new FormData();
        formdata.append("nombre", nombre);
        formdata.append("usuario", usuario);
        formdata.append("contraseña", contraseña);
        formdata.append("email", email);
        formdata.append("telefono", telefono);

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

    async loginUsuario(usuario, contraseña) {

        let url = origin + "/BackEND/Controlador/ControladorSesion.php?function=loginUsuario";


        let formdata = new FormData();
        formdata.append("usuario", usuario);
        formdata.append("contraseña", contraseña);

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

    async cerrarSesion() {

        let url = origin + "/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion";

        let respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        return await respuesta.json();
    }


    async eliminarCuenta(usuario) {
        let url = origin + "/BackEND/Controlador/ControladorSesion.php?function=eliminarCuenta";

        let formdata = new FormData();
        formdata.append("usuario", usuario);

        let config = {
            method: "POST",
            body: formdata
        };

        let respuesta = await fetch(url, config);

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor al eliminar la cuenta');
        }

        let resultado = await respuesta.json();
        return resultado;
    }
}
// Archivo: sesionDAO.js
export default class SesionDAO {

    async registerUsuario(nombre, usuario, email, telefono, contraseña) {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=registerUsuario";
        let formdata = new FormData();
        formdata.append("nombre", nombre);
        formdata.append("usuario", usuario);
        formdata.append("email", email);
        formdata.append("telefono", telefono);
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


    async loginUsuario(usuario, contraseña) {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=loginUsuario";
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
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion";

        let respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return await respuesta.json();
    }
}
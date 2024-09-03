export default class SesionDAO {
    async RegisterUsuario(nombre, usuario, contraseña, email, telefono) {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=RegisterUsuario";
        let formdata = new FormData();
        formdata.append("nombre", nombre);
        formdata.append("usuario", usuario)
        formdata.append("contraseña", contraseña)
        formdata.append("email", email)
        formdata.append("telefono", telefono)
        let config = {
            method: "POST",
            body: formdata
        }
        let respuesta = await fetch(url, config);
    }

    async LoginUsuario(usuario, contraseña) {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=LoginUsuario";
        let formdata = new FormData();
        formdata.append("usuario", usuario);
        formdata.append("contraseña", contraseña)
        let config = {
            method: "POST",
            body: formdata
        }
        let respuesta = await fetch(url, config);
    }


    async cerrarSesion() {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion";

        let respuesta = await fetch(url);

    }

}
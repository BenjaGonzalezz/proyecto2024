// Definición de la clase SesionDAO que gestionará las interacciones con la sesión del usuario
export default class SesionDAO {

    // Método para registrar un nuevo usuario
    async registerUsuario(nombre, usuario, contraseña, email, telefono) {
        // URL del backend donde se procesa el registro del usuario
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=registerUsuario";
        
        // Crear un objeto FormData para enviar los datos del formulario
        let formdata = new FormData();
        formdata.append("nombre", nombre);            // Agrega el nombre al FormData
        formdata.append("usuario", usuario);          // Agrega el nombre de usuario al FormData
        formdata.append("contraseña", contraseña);    // Agrega la contraseña al FormData
        formdata.append("email", email);              // Agrega el email al FormData
        formdata.append("telefono", telefono);        // Agrega el teléfono al FormData

        // Configuración de la solicitud fetch con el método POST
        let config = {
            method: "POST",           // Método HTTP para enviar los datos
            body: formdata            // Datos que se envían en el cuerpo de la solicitud
        };

        // Envío de la solicitud al backend y espera de la respuesta
        let respuesta = await fetch(url, config);
        
        // Si la respuesta no es exitosa, se lanza un error
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        // Se convierte la respuesta en JSON para obtener los datos
        let resultado = await respuesta.json();
        
        // Se devuelve el resultado de la operación de registro
        return resultado;
    }

    // Método para iniciar sesión de un usuario
    async loginUsuario(usuario, contraseña) {
        // URL del backend donde se procesa el inicio de sesión
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=loginUsuario";
        
        // Crear un objeto FormData para enviar los datos del formulario
        let formdata = new FormData();
        formdata.append("usuario", usuario);          // Agrega el nombre de usuario al FormData
        formdata.append("contraseña", contraseña);    // Agrega la contraseña al FormData

        // Configuración de la solicitud fetch con el método POST
        let config = {
            method: "POST",           // Método HTTP para enviar los datos
            body: formdata            // Datos que se envían en el cuerpo de la solicitud
        };

        // Envío de la solicitud al backend y espera de la respuesta
        let respuesta = await fetch(url, config);
        
        // Si la respuesta no es exitosa, se lanza un error
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Se convierte la respuesta en JSON para obtener los datos
        let resultado = await respuesta.json();
        
        // Se devuelve el resultado de la operación de inicio de sesión
        return resultado;
    }

    // Método para cerrar sesión
    async cerrarSesion() {
        // URL del backend donde se procesa el cierre de sesión
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorSesion.php?function=cerrarSesion";

        // Envío de la solicitud al backend y espera de la respuesta
        let respuesta = await fetch(url);
        
        // Si la respuesta no es exitosa, se lanza un error
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        
        // Se convierte la respuesta en JSON para obtener los datos
        return await respuesta.json(); // Devolución de la respuesta en formato JSON
    }
}

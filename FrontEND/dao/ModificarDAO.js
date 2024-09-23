export default class ModificarDAO {
    // Método para modificar el nombre del usuario
    async modificarNombre(nuevoNombre) {
        // URL del backend para modificar el nombre del usuario
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorModificar.php?function=modificarNombre";
        
        // Crear un objeto FormData para enviar los datos al backend
        let formData = new FormData();
        formData.append("nuevoNombre", nuevoNombre);

        // Configuración de la solicitud fetch con el método POST
        let config = {
            method: "POST",
            body: formData
        };

        // Envío de la solicitud al backend
        let respuesta = await fetch(url, config);

        // Verificar si la respuesta es exitosa
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        // Convertir la respuesta en JSON
        let resultado = await respuesta.json();

        // Retornar el resultado
        return resultado;
    }

    async modificarUsuario(nuevoUsuario) {
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorModificar.php?function=modificarUsuario";
        
        let formData = new FormData();
        formData.append("nuevoUsuario", nuevoUsuario);
        formData.append("usuarioActual", localStorage.getItem('usuario')); // Añadir el usuario actual
        
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
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorModificar.php?function=modificarEmail";
    
        let formData = new FormData();
        const usuarioActual = localStorage.getItem('usuario'); // Obtener el usuario actual
        formData.append("usuarioActual", usuarioActual); // Agregar el usuario actual
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
        let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorModificar.php?function=modificarTelefono";
    
        let formData = new FormData();
        const usuarioActual = localStorage.getItem('usuario'); // Obtener el usuario actual
        formData.append("usuarioActual", usuarioActual); // Agregar el usuario actual
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
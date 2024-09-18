export default class ReservaDAO {
  // Método para cambiar el estado de una reserva

  async cambiarEstado(id_reserva, nuevo_estado) {

    let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorReserva.php?function=cambiarEstado";
    
    // Crear un objeto FormData para enviar los datos del formulario
    let formdata = new FormData();
    formdata.append("id_reserva", id_reserva);
    formdata.append("nuevo_estado", nuevo_estado);    // Agrega el nuevo estado al FormData

    // Configuración de la solicitud fetch con el método POST
    let config = {
        method: "POST",           // Método HTTP para enviar los datos
        body: formdata            // Datos que se envían en el cuerpo de la solicitud
    };

    // Envío de la solicitud al backend y espera de la respuesta
    let respuesta = await fetch(url, config);
    
    // Si la respuesta no es exitosa, se lanza un error
    if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor al cambiar el estado');
    }

    // Se convierte la respuesta en JSON para obtener los datos
    let resultado = await respuesta.json();
    
    // Se devuelve el resultado de la operación
    return resultado;
}

// Método para obtener todas las reservas
async obtenerReservas() {
    // URL del backend donde se obtienen todas las reservas
    let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorReserva.php?function=obtenerReservas";

    // Configuración de la solicitud fetch con el método GET
    let config = {
        method: "GET",            // Método HTTP para obtener los datos
    };

    // Envío de la solicitud al backend y espera de la respuesta
    let respuesta = await fetch(url, config);
    
    // Si la respuesta no es exitosa, se lanza un error
    if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor al obtener las reservas');
    }

    // Se convierte la respuesta en JSON para obtener los datos
    let resultado = await respuesta.json();
    
    // Se devuelve el resultado de la operación
    return resultado;
}

// Método para obtener las reservas de un usuario específico
async obtenerReservaUsuario(usuario_cliente) {
    // URL del backend donde se obtienen las reservas de un usuario
    let url = "http://localhost/proyecto2024/BackEND/Controlador/ControladorReserva.php?function=obtenerReservaUsuario";

    // Crear un objeto FormData para enviar los datos del formulario
    let formdata = new FormData();
    formdata.append("usuario_cliente", usuario_cliente); // Agrega el nombre del usuario al FormData

    // Configuración de la solicitud fetch con el método POST
    let config = {
        method: "POST",           // Método HTTP para enviar los datos
        body: formdata            // Datos que se envían en el cuerpo de la solicitud
    };

    // Envío de la solicitud al backend y espera de la respuesta
    let respuesta = await fetch(url, config);
    
    // Si la respuesta no es exitosa, se lanza un error
    if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor al obtener las reservas del usuario');
    }

    // Se convierte la respuesta en JSON para obtener los datos
    let resultado = await respuesta.json();
    
    // Se devuelve el resultado de la operación
    return resultado;
}
}
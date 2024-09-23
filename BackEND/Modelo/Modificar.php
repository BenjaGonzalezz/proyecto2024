<?php

// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";

class Modificar {
    
// Función para modificar el nombre del usuario
function modificarNombreModelo($usuario, $nuevoNombre) {
    $connection = connection();

    // Preparar la consulta para actualizar el nombre
    $stmt = $connection->prepare("UPDATE persona SET nombre = ? WHERE usuario = ?");
    $stmt->bind_param("ss", $nuevoNombre, $usuario);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        return ["success" => true, "message" => "Nombre actualizado"];
    } else {
        return ["success" => false, "message" => "Error al actualizar el nombre"];
    }
}
function modificarUsuarioModelo($usuarioActual, $nuevoUsuario) {
    $connection = connection();

    // Verificar si el nuevo usuario ya existe
    $stmtCheck = $connection->prepare("SELECT * FROM persona WHERE usuario = ?");
    $stmtCheck->bind_param("s", $nuevoUsuario);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();

    if ($result->num_rows > 0) {
        return ["success" => false, "message" => "El nuevo nombre de usuario ya está en uso"];
    }

    // Si no existe, proceder con la actualización
    $stmt = $connection->prepare("UPDATE persona SET usuario = ? WHERE usuario = ?");
    $stmt->bind_param("ss", $nuevoUsuario, $usuarioActual);

    if ($stmt->execute()) {
        return ["success" => true, "message" => "Usuario actualizado exitosamente"];
    } else {
        return ["success" => false, "message" => "Error al actualizar el nombre de usuario"];
    }
}

function modificarEmailModelo($usuario, $nuevoEmail) {
    $connection = connection();

    // Verificar si el nuevo email ya está registrado
    $stmtCheck = $connection->prepare("SELECT * FROM cliente WHERE email = ?");
    $stmtCheck->bind_param("s", $nuevoEmail);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();

    if ($result->num_rows > 0) {
        return ["success" => false, "message" => "El email ya está registrado"];
    }

    // Actualizar el email
    $stmt = $connection->prepare("UPDATE cliente SET email = ? WHERE usuario = ?");
    $stmt->bind_param("ss", $nuevoEmail, $usuario);

    if ($stmt->execute()) {
        return ["success" => true, "message" => "Email actualizado exitosamente"];
    } else {
        return ["success" => false, "message" => "Error al actualizar el email"];
    }
}

function modificarTelefonoModelo($usuario, $nuevoTelefono) {
    $connection = connection();

    // Verificar si el nuevo teléfono ya está registrado (opcional)
    $stmtCheck = $connection->prepare("SELECT * FROM cliente WHERE telefono = ?");
    $stmtCheck->bind_param("s", $nuevoTelefono);
    $stmtCheck->execute();
    $result = $stmtCheck->get_result();

    if ($result->num_rows > 0) {
        return ["success" => false, "message" => "El teléfono ya está registrado"];
    }

    // Actualizar el teléfono
    $stmt = $connection->prepare("UPDATE cliente SET telefono = ? WHERE usuario = ?");
    $stmt->bind_param("ss", $nuevoTelefono, $usuario);

    if ($stmt->execute()) {
        return ["success" => true, "message" => "Teléfono actualizado exitosamente"];
    } else {
        return ["success" => false, "message" => "Error al actualizar el teléfono"];
    }
}

}
?>

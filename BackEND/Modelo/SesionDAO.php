<?php

require_once "../Connection/Connection.php";

class Usuario { 
function registerUsuarioModel($nombre, $usuario, $email, $telefono, $contraseña) {
    $connection = connection();
    $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);

    // Iniciar transacción
    $connection->begin_transaction();

    // Insertar en persona
    $stmtPersona = $connection->prepare("INSERT INTO persona (usuario, nombre, contraseña) VALUES (?, ?, ?)");
    $stmtPersona->bind_param("sss", $usuario, $nombre, $contraseñaHash);
    $stmtPersona->execute();
    $stmtPersona->close();

    // Insertar en cliente
    $stmtCliente = $connection->prepare("INSERT INTO cliente (usuario, telefono, email) VALUES (?, ?, ?)");
    $stmtCliente->bind_param("sss", $usuario, $telefono, $email);
    $stmtCliente->execute();
    $stmtCliente->close();

    // Confirmar transacción
    $connection->commit();
    return true;
}

function loginUsuarioModel($usuario, $contraseña) {
    $connection = connection();

    // Buscar en la tabla persona
    $stmt = $connection->prepare("SELECT p.usuario, p.nombre, p.contraseña, c.telefono, c.email FROM persona p INNER JOIN cliente c ON p.usuario = c.usuario WHERE p.usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $resultado = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    // Verificar si el usuario existe y la contraseña es correcta
    if ($resultado && password_verify($contraseña, $resultado['contraseña'])) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['usuario'] = $resultado['usuario'];
        $_SESSION['nombre'] = $resultado['nombre'];

        // Devolver todos los datos del usuario
        return [
            "success" => true,
            "message" => "Login exitoso",
            "nombre" => $resultado['nombre'],
            "usuario" => $resultado['usuario'],
            "telefono" => $resultado['telefono'],
            "email" => $resultado['email']
        ];
    }

    // Respuesta para login fallido
    return [
        "success" => false,
        "message" => $resultado ? "Contraseña incorrecta" : "Usuario no encontrado"
    ];
}
}



?>
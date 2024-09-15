<?php

require_once "../Connection/Connection.php";

class Usuario { 
    
    function registerUsuarioModel($nombre, $usuario, $email, $telefono, $contraseña) {
        $connection = connection();
        $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);
    
        // Verificar si el usuario ya existe
        $stmtCheckUsuario = $connection->prepare("SELECT * FROM persona WHERE usuario = ?");
        $stmtCheckUsuario->bind_param("s", $usuario);
        $stmtCheckUsuario->execute();
        $resultUsuario = $stmtCheckUsuario->get_result();
        
        if ($resultUsuario->num_rows > 0) {
            return [
                "success" => false,
                "message" => "El usuario ya existe"
            ];
        }
    
        // Verificar si el email ya existe
        $stmtCheckEmail = $connection->prepare("SELECT * FROM cliente WHERE email = ?");
        $stmtCheckEmail->bind_param("s", $email);
        $stmtCheckEmail->execute();
        $resultEmail = $stmtCheckEmail->get_result();
    
        if ($resultEmail->num_rows > 0) {
            return [
                "success" => false,
                "message" => "El email ya está registrado"
            ];
        }
    
        // Iniciar transacción
        $connection->begin_transaction();
    
        // Insertar en persona con rol por defecto
        $role = 'user'; // Definir el rol por defecto
        $stmtPersona = $connection->prepare("INSERT INTO persona (usuario, nombre, contraseña, role) VALUES (?, ?, ?, ?)");
        $stmtPersona->bind_param("ssss", $usuario, $nombre, $contraseñaHash, $role);
        $stmtPersona->execute();
        $stmtPersona->close();
    
        // Insertar en cliente
        $stmtCliente = $connection->prepare("INSERT INTO cliente (usuario, telefono, email) VALUES (?, ?, ?)");
        $stmtCliente->bind_param("sss", $usuario, $telefono, $email);
        $stmtCliente->execute();
        $stmtCliente->close();
    
        // Confirmar transacción
        $connection->commit();
        
        return [
            "success" => true,
            "message" => "Registro exitoso",
            "contraseña_hash" => $contraseñaHash
        ];
    }
    function loginUsuarioModel($usuario, $contraseña) {
        $connection = connection();
    
        // Buscar en la tabla persona, incluyendo el campo de rol
        $stmt = $connection->prepare("SELECT p.usuario, p.nombre, p.contraseña, p.role, c.telefono, c.email FROM persona p INNER JOIN cliente c ON p.usuario = c.usuario WHERE p.usuario = ?");
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
            $_SESSION['role'] = $resultado['role'];  // Guardar el rol en la sesión
    
            // Devolver todos los datos del usuario
            return [
                "success" => true,
                "message" => "Login exitoso",
                "nombre" => $resultado['nombre'],
                "usuario" => $resultado['usuario'],
                "telefono" => $resultado['telefono'],
                "email" => $resultado['email'],
                "role" => $resultado['role']  // Devolver el rol
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
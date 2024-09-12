<?php

require_once "../Connection/Connection.php";
//Clase Cliente que contiene un método ObtenerClienteModelo 

class Usuario { 
function registerUsuarioModel($nombre, $usuario, $email, $telefono, $contraseña) {
    $connection = connection();
    
    // Hash de la contraseña
    $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);
    
    // Iniciar la transacción
    $connection->begin_transaction();

        // Insertar en la tabla persona
        $sqlPersona = "INSERT INTO persona (usuario, nombre, contraseña) VALUES (?, ?, ?)";
        $stmtPersona = $connection->prepare($sqlPersona);

        // Verifica si la preparación falló
        if (!$stmtPersona) {
            throw new Exception("Error preparando consulta de persona: " . $connection->error);
        }

        // Mostrar el hash antes de la inserción para verificar
        var_dump("Hash a insertar: " . $contraseñaHash);

        $stmtPersona->bind_param("sss", $usuario, $nombre, $contraseñaHash);

        if (!$stmtPersona->execute()) {
            throw new Exception("Error ejecutando consulta de persona: " . $stmtPersona->error);
        }
        $stmtPersona->close();

        // Insertar en la tabla cliente
        $sqlCliente = "INSERT INTO cliente (usuario, telefono, email) VALUES (?, ?, ?)";
        $stmtCliente = $connection->prepare($sqlCliente);

        // Verifica si la preparación falló
        if (!$stmtCliente) {
            throw new Exception("Error preparando consulta de cliente: " . $connection->error);
        }

        $stmtCliente->bind_param("sss", $usuario, $telefono, $email);

        if (!$stmtCliente->execute()) {
            throw new Exception("Error ejecutando consulta de cliente: " . $stmtCliente->error);
        }
        $stmtCliente->close();

        // Confirmar la transacción
        $connection->commit();
        return true;

    } 



    function loginUsuarioModel($usuario, $contraseña) {
        $connection = connection();
    
        // Buscar en la tabla persona
        $sql = "SELECT * FROM persona WHERE usuario = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $respuesta = $stmt->get_result();
        $resultado = $respuesta->fetch_assoc();
        $stmt->close();
    
        // Verificar si el usuario existe
        if ($resultado === null) {
            return "Usuario no encontrado"; 
        }
    
        // Mostrar el hash almacenado y la contraseña ingresada
        var_dump("Hash almacenado: " . $resultado['contraseña']);
        var_dump("Contraseña ingresada: " . $contraseña);
    
        // Verificar la contraseña usando password_verify()
        if (password_verify($contraseña, $resultado['contraseña'])) {
            // Iniciar sesión si la contraseña es correcta
            session_start();
            $_SESSION['usuario'] = $resultado['usuario'];
            $_SESSION['nombre'] = $resultado['nombre'];
            return "Login exitoso";
        } else {
            error_log("password_verify() ha fallado");
            return "Contraseña incorrecta";
        }
    }
    

}



?>
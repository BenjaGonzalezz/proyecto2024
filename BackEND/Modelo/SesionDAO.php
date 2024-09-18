<?php

// Incluir el archivo de conexión a la base de datos
require_once "../Connection/Connection.php";

// Definición de la clase Usuario
class Usuario { 
    
    // Función para registrar un nuevo usuario
    function registerUsuarioModel($nombre, $usuario, $email, $telefono, $contraseña) {
        // Establecer la conexión a la base de datos
        $connection = connection();

        // Encriptar la contraseña utilizando el algoritmo BCRYPT
        $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);
    
        // Preparar la consulta para verificar si el usuario ya existe en la tabla "persona"
        $stmtCheckUsuario = $connection->prepare("SELECT * FROM persona WHERE usuario = ?");
        $stmtCheckUsuario->bind_param("s", $usuario); // Asignar el parámetro del nombre de usuario
        $stmtCheckUsuario->execute(); // Ejecutar la consulta
        $resultUsuario = $stmtCheckUsuario->get_result(); // Obtener los resultados de la consulta
        
        // Si el usuario ya existe, devolver un mensaje de error
        if ($resultUsuario->num_rows > 0) {
            return [
                "success" => false,
                "message" => "El usuario ya existe"
            ];
        }
    
        // Preparar la consulta para verificar si el email ya está registrado en la tabla "cliente"
        $stmtCheckEmail = $connection->prepare("SELECT * FROM cliente WHERE email = ?");
        $stmtCheckEmail->bind_param("s", $email); // Asignar el parámetro del email
        $stmtCheckEmail->execute(); // Ejecutar la consulta
        $resultEmail = $stmtCheckEmail->get_result(); // Obtener los resultados de la consulta
    
        // Si el email ya está registrado, devolver un mensaje de error
        if ($resultEmail->num_rows > 0) {
            return [
                "success" => false,
                "message" => "El email ya está registrado"
            ];
        }
    
        // Iniciar una transacción para asegurar que las operaciones se realicen correctamente
        $connection->begin_transaction();
    
        // Definir el rol por defecto del usuario como 'user'
        $role = 'user';

        // Preparar la consulta para insertar el nuevo usuario en la tabla "persona"
        $stmtPersona = $connection->prepare("INSERT INTO persona (usuario, nombre, contraseña, role) VALUES (?, ?, ?, ?)");
        $stmtPersona->bind_param("ssss", $usuario, $nombre, $contraseñaHash, $role); // Asignar los parámetros correspondientes
        $stmtPersona->execute(); // Ejecutar la consulta
        $stmtPersona->close(); // Cerrar la consulta
    
        // Preparar la consulta para insertar los datos adicionales en la tabla "cliente"
        $stmtCliente = $connection->prepare("INSERT INTO cliente (usuario, telefono, email) VALUES (?, ?, ?)");
        $stmtCliente->bind_param("sss", $usuario, $telefono, $email); // Asignar los parámetros correspondientes
        $stmtCliente->execute(); // Ejecutar la consulta
        $stmtCliente->close(); // Cerrar la consulta
    
        // Confirmar y finalizar la transacción
        $connection->commit();
        
        // Devolver una respuesta de éxito con la contraseña encriptada
        return [
            "success" => true,
            "message" => "Registro exitoso",
            "contraseña_hash" => $contraseñaHash
        ];
    }

    // Función para el inicio de sesión de un usuario
    function loginUsuarioModel($usuario, $contraseña) {
        // Establecer la conexión a la base de datos
        $connection = connection();
    
        // Preparar la consulta para buscar al usuario en la tabla "persona" y obtener los datos correspondientes
        $stmt = $connection->prepare("SELECT p.usuario, p.nombre, p.contraseña, p.role, c.telefono, c.email FROM persona p INNER JOIN cliente c ON p.usuario = c.usuario WHERE p.usuario = ?");
        $stmt->bind_param("s", $usuario); // Asignar el parámetro del nombre de usuario
        $stmt->execute(); // Ejecutar la consulta
        $resultado = $stmt->get_result()->fetch_assoc(); // Obtener los resultados de la consulta
        $stmt->close(); // Cerrar la consulta
    
        // Verificar si el usuario existe y si la contraseña proporcionada es correcta
        if ($resultado && password_verify($contraseña, $resultado['contraseña'])) {
            // Iniciar una sesión si no se ha iniciado previamente
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            // Guardar los datos del usuario en la sesión
            $_SESSION['usuario'] = $resultado['usuario'];
            $_SESSION['nombre'] = $resultado['nombre'];
            $_SESSION['role'] = $resultado['role'];  // Guardar el rol en la sesión
    
            // Devolver los datos del usuario en caso de login exitoso
            return [
                "success" => true,
                "message" => "Login exitoso",
                "nombre" => $resultado['nombre'],
                "usuario" => $resultado['usuario'],
                "telefono" => $resultado['telefono'],
                "email" => $resultado['email'],
                "role" => $resultado['role']  // Devolver el rol del usuario
            ];
        }
    
        // Devolver un mensaje de error si el login falla
        return [
            "success" => false,
            "message" => $resultado ? "Contraseña incorrecta" : "Usuario no encontrado"
        ];
    }
}

?>

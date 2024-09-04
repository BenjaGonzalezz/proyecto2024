<?php

require_once "../Connection/Connection.php";
//Clase Cliente que contiene un método ObtenerClienteModelo 

class Usuario { 

    function LoginUsuarioModel($email, $contraseña){
        $connection = connection();
    
        $sql = "SELECT * FROM usuario WHERE id_usuario = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $respuesta = $stmt->get_result();
        $resultado = $respuesta->fetch_assoc();
    
        // Verificar si el usuario existe
        if ($resultado === null) {
            return null; 
        }
    
        // Verificar la contraseña usando password_verify()
        if (password_verify($contraseña, $resultado['contraseña'])) {
            session_start();
            $_SESSION['id_usuario'] = $resultado['id_usuario'];
            $_SESSION["email"] = $email;
            return $resultado;
        } else {
            return "Contraseña incorrecta";
        }
    }
    
    function RegisterUsuarioModel($nombre, $usuario, $email, $telefono, $contraseña){
        $connection = connection();

        // Hash de la contraseña
        $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);

        $sql = "INSERT INTO usuario(nombre, usuario, email, telefono, contraseña) VALUES('$nombre', '$usuario', '$email', '$telefono', '$contraseña')";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("sss", $nombre, $usuario, $email, $telefono, $contraseñaHash);
        $respuesta = $stmt->execute();
        $stmt->close();

        return $respuesta;
    }

    function ActualizarContraseñaModel($contraseña, $email){
        $connection = connection();

        // Hash de la nueva contraseña
        $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);


        $sql = "UPDATE usuario SET contraseña = ? WHERE email = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $contraseñaHash, $email);
        $respuesta = $stmt->execute();

        // Cerrar la sentencia
        $stmt->close();

        return $respuesta;
    }
}



?>
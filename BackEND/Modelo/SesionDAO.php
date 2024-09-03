<?php

require_once "../Connection/Connection.php";

//Clase Cliente que contiene un método ObtenerClienteModelo 

class Usuario { 

    function LoginUsuarioModel($usuario, $contraseña){
        $connection = connection();

        $sql = "SELECT * FROM usuario WHERE usuario = ?";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $respuesta = $stmt->get_result();
        $resultado = $respuesta->fetch_assoc();

        session_start();
        $_SESSION['id_usuario'] = $resultado['id_usuario'];
        return $resultado;

        if ($resultado == null) {
            return null;
        } else {
            // Verificar la contraseña usando password_verify()
            if (password_verify($contraseña, $resultado['contraseña'])) {
                $_SESSION["usuario"] = $usuario;
                return "resultado correcto";
            } else {
                return "Contraseña incorrecta";
            }
        }
    }
    
    function RegisterUsuarioModel($usuario, $email, $contraseña){
        $connection = connection();

        // Hash de la contraseña
        $contraseñaHash = password_hash($contraseña, PASSWORD_BCRYPT);

        $sql = "INSERT INTO usuario(usuario, email, contraseña) VALUES(?, ?, ?)";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("sss", $usuario, $email, $contraseñaHash);
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
<?php
// Define una función para establecer una conexión a la base de datos
function connection (){ 
    // Define la dirección del servidor de base de datos (localhost indica que está en el mismo servidor)
    $host = "localhost";
    
    // Define el nombre de usuario para la conexión a la base de datos
    $usr = "root";
    
    // Define la contraseña para la conexión a la base de datos (vacío si no hay contraseña)
    $pass = "";
    
    // Define el nombre de la base de datos a la que se conectará
    $bd = "proyecto";
    
    // Define el puerto de conexión (3306 es el puerto por defecto para MySQL)
    $puerto = 3306;
    
    // Crea una nueva instancia de la clase mysqli para conectarse a la base de datos
    $mysqli = new mysqli($host, $usr, $pass, $bd, $puerto);
    
    // Devuelve el objeto de conexión mysqli para ser utilizado en otras partes del código
    return $mysqli;
}
?>

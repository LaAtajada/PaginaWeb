<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $telefono = $_POST['telefono'];
    
    // Guardar la imagen
    $boleta = $_FILES['boleta'];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($boleta["name"]);
    move_uploaded_file($boleta["tmp_name"], $target_file);

    // Procesar los datos (guardar en base de datos, enviar correo, etc.)
    echo "Formulario enviado correctamente!";
}
?>

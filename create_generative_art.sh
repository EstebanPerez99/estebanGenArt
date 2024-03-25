#!/bin/bash

# Obtener el nombre de la carpeta deseado como argumento
folder_name=$1

# Verificar si se proporcionó un nombre de carpeta
if [ -z "$folder_name" ]; then
    echo "Por favor, proporciona un nombre para la carpeta."
    exit 1
fi

# Verificar si la carpeta ya existe
if [ -d "$folder_name" ]; then
    echo "La carpeta '$folder_name' ya existe."
    exit 1
fi

# Crear la carpeta
mkdir "$folder_name"

# Cambiar al directorio de la nueva carpeta
cd "$folder_name" || exit

# Crear los archivos con los contenidos dados
echo '<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css" />
        <meta charset="utf-8" />
    </head>
    <body>
        <main></main>
        <script src="../utils/utils.js"></script>
        <script src="../utils/rectangle.js"></script>
        <script src="../utils/dot.js"></script>
        <script src="sketch.js"></script>
    </body>
</html>' > index.html

echo 'html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}' > style.css

echo 'function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}' > sketch.js

# Mensaje de confirmación
echo "La carpeta '$folder_name' ha sido creada con éxito."


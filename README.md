# Pasapalabra Web App

Una implementación web del popular juego de preguntas y respuestas "Pasapalabra". Pon a prueba tus conocimientos en un rosco interactivo y personalizable.

## 🚀 Características

* **Interfaz Interactiva:** Juega en un rosco circular con letras que cambian de color según aciertos, fallos o preguntas pasadas.
* **Temporizador:** Un temporizador visual te desafía a responder antes de que se agote el tiempo.
* **Estadísticas en tiempo real:** Sigue tus aciertos y fallos durante el juego.
* **Preguntas personalizables:** Carga tus propios conjuntos de preguntas desde un Gist de GitHub, ¡lo que permite una rejugabilidad infinita y la creación de temáticas personalizadas!
* **Diseño Responsivo:** Disfruta del juego en diferentes tamaños de pantalla.

## 🕹️ Cómo Jugar

1.  **Abre la aplicación:** Carga `index.html` en tu navegador web. Si lo tienes en un servidor local, la URL será algo como `http://localhost:8000/index.html`.
2.  **Configura las preguntas (¡Importante!):** La aplicación necesita una URL a un Gist de GitHub que contenga tus preguntas. Debes añadir un parámetro a la URL de tu aplicación en el navegador:
    ```
    [https://tu-aplicacion.com/?questionsGistUrl=URL_RAW_DE_TU_GIST](https://tu-aplicacion.com/?questionsGistUrl=URL_RAW_DE_TU_GIST)
    ```
    * **Ejemplo:** Si tu aplicación está en `http://localhost:8000/` y tu Gist "Raw" es `https://gist.githubusercontent.com/miusuario/1234567890abcdef/raw/pasapalabra_questions.json`, la URL completa sería:
        `http://localhost:8000/?questionsGistUrl=https://gist.githubusercontent.com/miusuario/1234567890abcdef/raw/pasapalabra_questions.json`
    * **Si no proporcionas la URL del Gist**, la aplicación te lo indicará en la caja de pistas.
3.  **Inicia el juego:** Una vez cargadas las preguntas, haz clic en el botón "Jugar".
4.  **Responde:** Se te mostrará una letra y una pista. Escribe la palabra que corresponde a la pista y **que empieza por la letra indicada**.
5.  **Acciones del Juego:**
    * **"Responder"**: Envía tu respuesta. Si es correcta, la letra se pondrá verde; si es incorrecta, se pondrá roja.
    * **"Pasapalabra"**: Salta la pregunta actual y vuelve a ella más tarde si te queda tiempo. La letra se pondrá amarilla.
    * **Botón de reinicio (icono de círculo con flechas)**: Reinicia el juego en cualquier momento.
6.  **Fin del Juego:** El juego termina cuando respondes todas las preguntas o cuando se agota el tiempo. Se mostrará un resumen de tus resultados.

## ⚙️ Configuración de Preguntas con un Gist

La aplicación está diseñada para cargar sus preguntas desde un Gist público de GitHub.

### 1. Crear tu Gist de Preguntas

1.  Ve a [GitHub Gist](https://gist.github.com/).
2.  Inicia sesión o crea una cuenta.
3.  Crea un "New public gist".
4.  En el campo "Filename including extension...", escribe `questions.json` (o cualquier nombre con `.json`).
5.  Pega el siguiente formato JSON en el área de contenido, asegurándote de usar **comillas dobles** para claves y valores de cadena y que la **respuesta comience con la letra indicada**:

    ```json
    [
        { "letter": "A", "clue": "Con la A: La estación del año que sigue al invierno.", "answer": "Primavera" },
        { "letter": "B", "clue": "Con la B: Mamífero terrestre, de gran tamaño, con una trompa larga y orejas grandes.", "answer": "Elefante" },
        { "letter": "C", "clue": "Con la C: Líquido incoloro e inodoro, esencial para la vida, que cubre la mayor parte de la Tierra.", "answer": "Agua" },
        { "letter": "D", "clue": "Con la D: Metal precioso, muy valorado en joyería.", "answer": "Oro" },
        { "letter": "E", "clue": "Con la E: El quinto planeta desde el Sol en nuestro sistema solar.", "answer": "Júpiter" },
        { "letter": "F", "clue": "Con la F: Ciencia que estudia la composición de los alimentos.", "answer": "Bromología" },
        { "letter": "G", "clue": "Con la G: Órgano muscular que bombea sangre por todo el cuerpo.", "answer": "Corazón" },
        { "letter": "H", "clue": "Con la H: El primer elemento de la tabla periódica.", "answer": "Hidrógeno" },
        { "letter": "I", "clue": "Con la I: País asiático famoso por el Taj Mahal.", "answer": "India" },
        { "letter": "J", "clue": "Con la J: Género musical originado en Nueva Orleans a principios del siglo XX.", "answer": "Jazz" },
        { "letter": "K", "clue": "Con la K: Unidad de medida de temperatura absoluta.", "answer": "Kelvin" },
        { "letter": "L", "clue": "Con la L: Nuestro satélite natural.", "answer": "Luna" },
        { "letter": "M", "clue": "Con la M: La capital de Francia.", "answer": "París" },
        { "letter": "N", "clue": "Con la N: Un número impar entre el ocho y el diez.", "answer": "Nueve" },
        { "letter": "O", "clue": "Con la O: El planeta rojo.", "answer": "Marte" },
        { "letter": "P", "clue": "Con la P: Famoso explorador que realizó el primer viaje de circunnavegación del mundo.", "answer": "Magallanes" },
        { "letter": "Q", "clue": "Con la Q: Famosa obra literaria de Cervantes.", "answer": "Quijote" },
        { "letter": "R", "clue": "Con la R: Arte de bien decir, de embellecer la expresión de los conceptos.", "answer": "Retórica" },
        { "letter": "S", "clue": "Con la S: Planeta con anillos visibles desde la Tierra.", "answer": "Saturno" },
        { "letter": "T", "clue": "Con la T: La capital de Japón.", "answer": "Tokio" },
        { "letter": "U", "clue": "Con la U: Instrumento musical de cuerda, similar a una pequeña guitarra.", "answer": "Ukelele" },
        { "letter": "V", "clue": "Con la V: La estación del año que sigue al verano.", "answer": "Otoño" },
        { "letter": "W", "clue": "Con la W: Plataforma en línea para compartir videos, propiedad de Google.", "answer": "YouTube" },
        { "letter": "X", "clue": "Con la X: Instrumento musical de percusión con láminas de madera o metal.", "answer": "Xilófono" },
        { "letter": "Y", "clue": "Con la Y: La capital de Uruguay.", "answer": "Montevideo" },
        { "letter": "Z", "clue": "Con la Z: Animal africano conocido por sus rayas blancas y negras.", "answer": "Cebra" }
    ]
    ```
    **Nota:** Las respuestas en el ejemplo anterior han sido ajustadas para que la palabra `answer` **siempre inicie con la `letter` correspondiente**, siguiendo la regla estricta de Pasapalabra.

6.  Haz clic en el botón "Create public gist".

### 2. Obtener la URL "Raw" del Gist

1.  Una vez creado el Gist, busca el archivo `questions.json` (o el nombre que le hayas dado) en la página del Gist.
2.  En la parte superior derecha de la vista del archivo, encontrarás un botón llamado **"Raw"**.
3.  Haz clic derecho en ese botón y selecciona "Copiar dirección del enlace".
4.  Esta URL copiada es la que usarás como `URL_RAW_DE_TU_GIST` en el paso 2 de "Cómo Jugar".

### 💡 Sugerencia: Generar un banco de preguntas con IA

Puedes usar herramientas de IA (como ChatGPT, Gemini, etc.) para generar rápidamente nuevos conjuntos de preguntas. Aquí tienes un prompt de ejemplo que puedes adaptar:
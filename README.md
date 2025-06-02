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
  {
    "letter": "A",
    "clue": "Con la A: Ave grande que no vuela y corre a gran velocidad.",
    "answer": "Avestruz"
  },
  {
    "letter": "B",
    "clue": "Con la B: Mamífero plantígrado que hiberna en invierno.",
    "answer": "Burro"
  },
  {
    "letter": "C",
    "clue": "Con la C: Reptil grande y acuático con dientes afilados.",
    "answer": "Cocodrilo"
  },
  {
    "letter": "D",
    "clue": "Con la D: Mamífero con cuernos y cuerpo robusto, relacionado con el ganado.",
    "answer": "Dromedario"
  },
  {
    "letter": "E",
    "clue": "Con la E: Mamífero terrestre con trompa larga.",
    "answer": "Elefante"
  },
  {
    "letter": "F",
    "clue": "Con la F: Mamífero salvaje de pelaje rojizo, conocido por su astucia.",
    "answer": "Foca"
  },
  {
    "letter": "G",
    "clue": "Con la G: Mamífero africano con cuello muy largo.",
    "answer": "Girafa"
  },
  {
    "letter": "H",
    "clue": "Con la H: Animal doméstico usado para montar y trabajar.",
    "answer": "Hipopótamo"
  },
  {
    "letter": "I",
    "clue": "Con la I: Ave zancuda de zonas húmedas, de plumaje blanco.",
    "answer": "Ibis"
  },
  {
    "letter": "J",
    "clue": "Con la J: Felino grande y manchado que habita América.",
    "answer": "Jaguar"
  },
  {
    "letter": "K",
    "clue": "Con la K: Marsupial australiano que duerme la mayor parte del día.",
    "answer": "Koala"
  },
  {
    "letter": "L",
    "clue": "Con la L: Felino considerado el rey de la selva.",
    "answer": "León"
  },
  {
    "letter": "M",
    "clue": "Con la M: Pequeño mamífero volador nocturno.",
    "answer": "Murciélago"
  },
  {
    "letter": "N",
    "clue": "Con la N: Animal marino con caparazón, vive en playas tropicales.",
    "answer": "Nautilo"
  },
  {
    "letter": "O",
    "clue": "Con la O: Mamífero marino grande, también llamado ballena asesina.",
    "answer": "Orca"
  },
  {
    "letter": "P",
    "clue": "Con la P: Ave antártica que no vuela y camina erguida.",
    "answer": "Pingüino"
  },
  {
    "letter": "Q",
    "clue": "Con la Q: Marsupial australiano pequeño y simpático.",
    "answer": "Quokka"
  },
  {
    "letter": "R",
    "clue": "Con la R: Roedor común en ciudades y casas.",
    "answer": "Ratón"
  },
  {
    "letter": "S",
    "clue": "Con la S: Reptil alargado y sin patas.",
    "answer": "Serpiente"
  },
  {
    "letter": "T",
    "clue": "Con la T: Reptil con caparazón que vive en tierra o agua.",
    "answer": "Tortuga"
  },
  {
    "letter": "U",
    "clue": "Con la U: Ave de plumaje negro y pico naranja, parecida al cuervo.",
    "answer": "Urraca"
  },
  {
    "letter": "V",
    "clue": "Con la V: Murciélago que se alimenta de sangre.",
    "answer": "Vampiro"
  },
  {
    "letter": "W",
    "clue": "Con la W: Pez rápido de aguas cálidas, también llamado peto.",
    "answer": "Wahoo"
  },
  {
    "letter": "X",
    "clue": "Con la X: Pez tropical de acuario cuyo nombre comienza con X.",
    "answer": "Xifóforo"
  },
  {
    "letter": "Y",
    "clue": "Con la Y: Bovino peludo usado como animal de carga en el Tíbet.",
    "answer": "Yak"
  },
  {
    "letter": "Z",
    "clue": "Con la Z: Mamífero africano con rayas blancas y negras.",
    "answer": "Zebra"
  }
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

# Pasapalabra Web App

Una implementación web del popular juego de preguntas y respuestas **Pasapalabra**, con rosco interactivo y personalizable.

## 🚀 Características

- Interfaz interactiva con rosco visual.
- Temporizador de juego.
- Estadísticas de aciertos y fallos.
- **Preguntas personalizables cargadas desde un Gist de GitHub.**
- Diseño responsivo.

## 🕹️ Cómo Jugar

1. **Abre `index.html`** en tu navegador. Si usas un servidor local, la URL será algo como `http://localhost:8000/index.html`.
2. **Configura las preguntas:** añade `?questionsGistUrl=URL_RAW_DE_TU_GIST` a la URL.
   - **Ejemplo:**  
     `http://localhost:8000/?questionsGistUrl=https://gist.githubusercontent.com/miusuario/ID_GIST/raw/questions.json`
   - Si no se proporciona, la aplicación te lo indicará.
3. **Haz clic en "Jugar"** para comenzar.
4. **Responde** escribiendo la palabra que corresponde a la pista y **empieza con la letra indicada**.
5. **Acciones:**
   - **"Responder"**: Envía tu respuesta (verde si aciertas, rojo si fallas).
   - **"Pasapalabra"**: Salta la pregunta (letra amarilla).
   - **Reiniciar**: Comienza un nuevo juego.
6. El juego termina al responder todas las preguntas o agotar el tiempo, mostrando un resumen.

## ⚙️ Configuración de Preguntas (Gist de GitHub)

La aplicación carga las preguntas desde un Gist público.

### 1. Crear tu Gist

1. Ve a [GitHub Gist](https://gist.github.com/), inicia sesión y crea un nuevo "public gist".
2. Nombra el archivo como `questions.json`.
3. Pega tus preguntas en formato JSON.  
   **¡La `answer` debe comenzar con la letra indicada en `letter`!**

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
  ...
]
```

4. Haz clic en "Create public gist".

### 2. Obtener la URL "Raw"

Haz clic en el botón **"Raw"** en tu Gist, luego clic derecho y selecciona **"Copiar dirección del enlace"**. Esta es la `URL_RAW_DE_TU_GIST`.

## 💡 Sugerencia: Generar Preguntas con IA

Usa este prompt en ChatGPT, Gemini u otra IA para generar preguntas:

> Genera un array JSON con 27 objetos, uno por cada letra del abecedario en español (excluyendo la Ñ).  
> Cada objeto debe tener:  
> - `"letter"`: una letra de la A a la Z (sin Ñ)  
> - `"clue"`: una pista que comience con "Con la [Letra]:"  
> - `"answer"`: un animal cuyo nombre comience **exactamente** con esa letra  
> Temática: animales  
> Dificultad: media

**Ejemplo:**

```json
{
  "letter": "A",
  "clue": "Con la A: Mamífero volador que se alimenta de sangre.",
  "answer": "Avestruz"
}
```

✅ Reglas:

- El campo `answer` debe comenzar **exactamente** con la letra indicada.
- El JSON debe ser **válido**, sin comentarios ni explicaciones.
- Excluye la letra Ñ.
- No repitas letras ni animales.
- Devuelve únicamente el array JSON limpio.

> **Importante:** Revisa siempre que las respuestas generadas por IA respeten la letra inicial y el formato.

## 🛠️ Estructura del Proyecto

- `index.html`: Estructura principal de la app.
- `style.css`: Estilos visuales.
- `main.js`: Carga de preguntas (desde Gist), inicialización del juego.
- `game.js`: Lógica del juego (respuestas, rondas, estadísticas).
- `rosco.js`: Generación y actualización del rosco visual.
- `timer.js`: Lógica y visualización del temporizador.
- `questions.js`: (Opcional) Preguntas locales (ya no en uso).

## 🤝 Contribuciones y Licencia

¡Contribuciones bienvenidas! Puedes reportar errores, sugerir mejoras o enviar pull requests.  
Este proyecto es de código abierto.

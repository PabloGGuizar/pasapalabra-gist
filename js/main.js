// js/main.js - Entry point for the application
import * as game from './game.js';
import { initTimer } from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM (solo una vez y aquí)
    const startPage = document.getElementById('startPage');
    const startButton = document.getElementById('startButton');
    const gameContainer = document.getElementById('gameContainer');
    const clueBox = document.getElementById('clueBox');
    const answerInput = document.getElementById('answerInput');
    const answerButton = document.getElementById('answerButton');
    const passButton = document.getElementById('passButton');
    const restartButton = document.getElementById('restartButton');
    const combinedCountDisplay = document.getElementById('combinedCount');
    const timerCanvas = document.getElementById('timerCanvas');
    const timerText = document.getElementById('timerText');
    const gameOverModal = document.getElementById('gameOverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalRestartButton = document.getElementById('modalRestartButton');
    const roscoContainer = document.getElementById('roscoContainer');
    const currentLetterDisplay = document.getElementById('currentLetter');

    // Pasar todos los elementos del DOM al módulo game para que pueda usarlos
    game.initializeDOMElements({
        startPage, startButton, gameContainer, clueBox, answerInput, answerButton,
        passButton, restartButton, combinedCountDisplay, timerCanvas, timerText,
        gameOverModal, modalTitle, modalMessage, modalRestartButton,
        roscoContainer, currentLetterDisplay
    });

    // Inicializar el canvas del temporizador una vez que el DOM está listo
    initTimer(timerCanvas, timerText);

    // Configuración inicial del estado del juego
    game.setupInitialState();

    // Función asíncrona para cargar las preguntas y luego iniciar el juego
    const loadAndStartGame = async () => {
        let questionsGistUrl = null;

        // Obtener la URL del Gist del parámetro de consulta 'questionsGistUrl'
        // Ejemplo de URL en el navegador: https://tu-app.com/?questionsGistUrl=https://gist.githubusercontent.com/user/id/raw/questions.json
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('questionsGistUrl')) {
            questionsGistUrl = urlParams.get('questionsGistUrl');
        }

        if (!questionsGistUrl) {
            clueBox.textContent = 'Error: No se proporcionó la URL del Gist. Por favor, añade "?questionsGistUrl=URL_DE_TU_GIST_RAW" a la URL en el navegador.';
            startButton.disabled = false; // Re-habilita el botón por si el usuario quiere intentar de nuevo.
            return; // Detener la ejecución si no hay URL del Gist.
        }

        try {
            clueBox.textContent = 'Cargando preguntas desde Gist...'; // Mensaje de carga
            startButton.disabled = true; // Deshabilitar el botón durante la carga

            const response = await fetch(questionsGistUrl);
            if (!response.ok) {
                // Si la respuesta HTTP no es exitosa (ej. 404, 500)
                throw new Error(`Error HTTP al cargar Gist: ${response.status} ${response.statusText}`);
            }
            const questions = await response.json();
            console.log("Preguntas cargadas desde Gist:", questions); // Para depuración

            game.startGame(questions); // Pasar las preguntas cargadas a startGame
        } catch (error) {
            console.error('Error al cargar las preguntas desde Gist:', error);
            clueBox.textContent = `Error al cargar preguntas: ${error.message}. Revisa la URL del Gist.`;
            startButton.disabled = false; // Volver a habilitar el botón en caso de error.
        }
    };

    // Asignar Event Listeners
    startButton.addEventListener('click', loadAndStartGame); // Ahora llama a la nueva función asíncrona
    answerButton.addEventListener('click', game.handleAnswer);
    passButton.addEventListener('click', game.handlePass);
    restartButton.addEventListener('click', game.restartGame);
    modalRestartButton.addEventListener('click', game.restartGame);

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            game.handleAnswer();
        }
    });

    window.addEventListener('resize', game.handleResize);
});
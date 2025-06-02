// js/game.js
// ELIMINA LA SIGUIENTE LÍNEA: import { questions as allQuestions } from './questions.js';
import { startTimer, stopTimer, getTimeLeft, drawTimer, MAX_GAME_TIME } from './timer.js';
import { initializeRosco, updateRoscoLetter, markLetterStatus, resizeRoscoLetters } from './rosco.js';

// DOM Elements - Estas variables se asignarán después de que main.js llame a initializeDOMElements
let startPage, startButton, gameContainer, clueBox, answerInput, answerButton,
    passButton, restartButton, combinedCountDisplay, timerCanvas, timerText,
    gameOverModal, modalTitle, modalMessage, modalRestartButton,
    roscoContainer, currentLetterDisplay;

// Función para inicializar los elementos del DOM desde main.js
export const initializeDOMElements = (elements) => {
    ({
        startPage, startButton, gameContainer, clueBox, answerInput, answerButton,
        passButton, restartButton, combinedCountDisplay, timerCanvas, timerText,
        gameOverModal, modalTitle, modalMessage, modalRestartButton,
        roscoContainer, currentLetterDisplay
    } = elements);
};

// Game State Variables
let gameQuestions = []; // Esta variable se poblará con las preguntas pasadas
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let passedLetters = []; // Almacena índices de preguntas pasadas
let gameActive = false;

// Función para mostrar la página de inicio o el contenedor del juego
function toggleGameVisibility(showStartPage) {
    if (startPage && gameContainer) {
        if (showStartPage) {
            startPage.classList.remove('hidden');
            gameContainer.classList.add('hidden');
        } else {
            startPage.classList.add('hidden');
            gameContainer.classList.remove('hidden');
        }
    }
}

// Función principal para iniciar el juego, ahora acepta las preguntas como argumento
export const startGame = (questionsToPlay) => { // Aceptar preguntas como argumento
    if (!questionsToPlay || questionsToPlay.length === 0) {
        console.error("startGame: No se proporcionaron preguntas o el array de preguntas está vacío.");
        clueBox.textContent = 'No se pudieron cargar las preguntas o no hay preguntas disponibles.';
        toggleGameVisibility(true); // Regresar a la página de inicio
        return;
    }

    toggleGameVisibility(false); // Ocultar página de inicio, mostrar juego
    gameActive = true;
    correctAnswers = 0;
    wrongAnswers = 0;
    passedLetters = [];
    currentQuestionIndex = 0;

    // Habilitar input y botones
    answerInput.disabled = false;
    answerButton.disabled = false;
    passButton.disabled = false;

    // Asignar las preguntas pasadas como argumento (realizar una copia profunda)
    gameQuestions = JSON.parse(JSON.stringify(questionsToPlay));

    // Inicializar las letras del rosco
    initializeRosco(roscoContainer, gameQuestions);

    updateStats(); // Actualizar contadores
    answerInput.value = ''; // Limpiar campo de respuesta
    answerInput.focus(); // Poner foco en el campo de respuesta
    gameOverModal.classList.remove('visible'); // Ocultar modal de fin de juego

    // Iniciar el temporizador global
    startTimer((timeLeft) => {
        // Callback para actualizar el display del temporizador cada segundo
        // Esto se maneja en timer.js, solo necesitamos pasarlo.
    }, endGame); // `endGame` se llama cuando el tiempo se agota

    startRound(); // Iniciar la primera ronda
};

export const handleAnswer = () => {
    if (!gameActive || getTimeLeft() <= 0) return;

    const userAnswer = answerInput.value.trim().toLowerCase();
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        currentQuestion.status = 'correct';
        markLetterStatus(currentQuestion.element, 'correct');
        correctAnswers++;
        // Eliminar de la lista de pasadas si estaba allí
        const passedIndex = passedLetters.indexOf(currentQuestionIndex);
        if (passedIndex > -1) {
            passedLetters.splice(passedIndex, 1);
        }
        updateStats();
        startRound();
    } else {
        currentQuestion.status = 'wrong';
        markLetterStatus(currentQuestion.element, 'wrong');
        wrongAnswers++;
        // Eliminar de la lista de pasadas si estaba allí
        const passedIndex = passedLetters.indexOf(currentQuestionIndex);
        if (passedIndex > -1) {
            passedLetters.splice(passedIndex, 1);
        }
        updateStats();
        startRound();
    }
};

export const handlePass = () => {
    if (!gameActive || getTimeLeft() <= 0) return;
    const currentQuestion = gameQuestions[currentQuestionIndex];
    if (currentQuestion.status === 'unanswered') {
        currentQuestion.status = 'passed';
        markLetterStatus(currentQuestion.element, 'passed');
        passedLetters.push(currentQuestionIndex);
    }
    startRound();
};

export const restartGame = () => {
    cleanupGame();
    toggleGameVisibility(true); // Mostrar página de inicio
};

// Función para inicializar el estado del juego al cargar la página
export const setupInitialState = () => {
    // Asegurarse de que el temporizador se inicialice visualmente
    timerText.textContent = MAX_GAME_TIME; // Mostrar el tiempo inicial
    drawTimer(1); // Dibujar el círculo completo
    clueBox.textContent = '¡Bienvenido a Pasapalabra! Presiona "Jugar" para empezar.';
    answerInput.disabled = true;
    answerButton.disabled = true;
    passButton.disabled = true;
    toggleGameVisibility(true); // Mostrar la página de inicio por defecto
};

export const handleResize = () => {
    // Reajustar las letras del rosco si el juego está activo
    if (gameActive) {
        resizeRoscoLetters(roscoContainer, gameQuestions);
    }
};

const updateStats = () => {
    combinedCountDisplay.innerHTML = `<span class="correct-text">Aciertos: ${correctAnswers}</span><br><span class="wrong-text">Fallos: ${wrongAnswers}</span>`;
};

const cleanupGame = () => {
    gameActive = false;
    stopTimer(); // Detener el temporizador
    currentLetterDisplay.textContent = '-'; // Limpiar la letra actual
    clueBox.textContent = '¡Juego terminado!';
    answerInput.value = '';
    answerInput.disabled = true;
    answerButton.disabled = true;
    passButton.disabled = true;
    gameOverModal.classList.remove('visible'); // Asegurarse de que el modal esté oculto
};

function findNextQuestion() {
    let startIndex = currentQuestionIndex;
    let found = false;
    let nextQ = null;

    // Búsqueda de preguntas sin responder desde la posición actual
    for (let i = startIndex; i < gameQuestions.length; i++) {
        if (gameQuestions[i].status === 'unanswered') {
            nextQ = gameQuestions[i];
            found = true;
            break;
        }
    }
    // Si no se encuentra, buscar desde el principio hasta la posición actual
    if (!found) {
        for (let i = 0; i < startIndex; i++) {
            if (gameQuestions[i].status === 'unanswered') {
                nextQ = gameQuestions[i];
                found = true;
                break;
            }
        }
    }

    // Búsqueda de preguntas pasadas (prioridad más baja)
    if (!found && passedLetters.length > 0) {
        // Ordenar las pasadas para ir en orden alfabético de letras
        const sortedPassed = passedLetters.sort((a, b) => a - b);
        for (let i = 0; i < sortedPassed.length; i++) {
            const passedIndex = sortedPassed[i];
            if (gameQuestions[passedIndex].status === 'passed') {
                nextQ = gameQuestions[passedIndex];
                found = true;
                currentQuestionIndex = passedIndex; // Actualizar el índice a la pregunta pasada
                break;
            }
        }
    }
    return nextQ;
}

function displayQuestion(question) {
    if (question) {
        updateRoscoLetter(question.element, question.letter);
        currentLetterDisplay.textContent = question.letter;
        clueBox.textContent = question.clue;
        answerInput.value = '';
        answerInput.focus();
    } else {
        // No hay más preguntas para mostrar, terminar el juego
        endGame();
    }
}

function startRound() {
    if (!gameActive || getTimeLeft() <= 0) return;

    let nextQ = findNextQuestion();

    if (nextQ === null) {
        endGame(); // No hay más preguntas que mostrar
        return;
    }

    currentQuestionIndex = gameQuestions.indexOf(nextQ); // Asegurarse de que el índice se actualiza
    displayQuestion(nextQ);
}

// Función para terminar el juego
export function endGame() {
    cleanupGame();

    let totalQuestions = gameQuestions.length;
    let answeredQuestions = gameQuestions.filter(q => q.status === 'correct' || q.status === 'wrong').length;
    let finalMessage = `Has respondido ${correctAnswers} correctamente y fallado ${wrongAnswers}.`;

    if (correctAnswers === totalQuestions) {
        modalTitle.textContent = '¡Felicidades! ¡Has completado el Rosco!';
        modalMessage.textContent = `¡Has acertado todas las ${totalQuestions} preguntas! ¡Eres un crack!`;
    } else if (getTimeLeft() <= 0) {
        modalTitle.textContent = '¡Tiempo Agotado!';
        modalMessage.textContent = `${finalMessage} Te quedaste sin tiempo.`;
    } else {
        modalTitle.textContent = '¡Juego Terminado!';
        modalMessage.textContent = `${finalMessage} Te quedaron ${totalQuestions - answeredQuestions} preguntas sin responder o pasadas.`;
    }

    gameOverModal.classList.add('visible');
}
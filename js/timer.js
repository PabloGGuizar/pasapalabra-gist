// js/timer.js
export const MAX_GAME_TIME = 120; // Tiempo total del juego en segundos (2 minutos)

let timerInterval = null;
let timeLeft;
let ctx; // Contexto de dibujo
let timerCanvasElement; // Para almacenar la referencia al elemento canvas
let timerTextElement; // Para almacenar la referencia al elemento de texto

export const initTimer = (canvasEl, textEl) => {
    timerCanvasElement = canvasEl;
    timerTextElement = textEl;

    if (!timerCanvasElement || !timerTextElement) {
        console.error("Elementos del temporizador (canvas o texto) no proporcionados o no encontrados.");
        return;
    }

    const size = timerCanvasElement.parentElement.offsetWidth;
    timerCanvasElement.width = size;
    timerCanvasElement.height = size;

    ctx = timerCanvasElement.getContext('2d');
    drawTimer(1); // Dibujar el círculo completo inicialmente
    timerTextElement.textContent = MAX_GAME_TIME; // Mostrar el tiempo inicial
};

export const startTimer = (onTick, onTimeEnd) => {
    clearInterval(timerInterval);
    timeLeft = MAX_GAME_TIME; // Reiniciar tiempo

    // Asegurarse de que el canvas y el texto estén configurados antes de empezar
    if (!ctx || !timerCanvasElement || !timerTextElement) {
        console.error("Temporizador no inicializado correctamente antes de iniciar.");
        return;
    }

    timerTextElement.textContent = timeLeft; // Mostrar el tiempo inicial
    drawTimer(timeLeft / MAX_GAME_TIME); // Dibujar el temporizador

    timerInterval = setInterval(() => {
        timeLeft--;
        timerTextElement.textContent = timeLeft;
        drawTimer(timeLeft / MAX_GAME_TIME);
        if (onTick) onTick(timeLeft); // Callback para el game.js si necesita algo

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (onTimeEnd) onTimeEnd(); // Callback para notificar que el tiempo se acabó
        }
    }, 1000);
};

export const stopTimer = () => {
    clearInterval(timerInterval);
};

export const getTimeLeft = () => timeLeft;

export function drawTimer(percentage) {
    if (!ctx || !ctx.canvas) {
        console.warn("Contexto del temporizador o canvas no disponible para dibujar.");
        return;
    }

    const size = ctx.canvas.width;
    const radius = size / 2;
    const safeRadius = Math.max(0, radius - 5);
    const centerX = radius;
    const centerY = radius;

    ctx.clearRect(0, 0, size, size);

    // Dibujar círculo de fondo
    ctx.beginPath();
    ctx.arc(centerX, centerY, safeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#282c34'; // Color de fondo del temporizador
    ctx.fill();

    // Dibujar arco de tiempo restante
    ctx.beginPath();
    // Start at top (-PI/2), go clockwise for percentage
    ctx.arc(centerX, centerY, safeRadius, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * percentage));
    ctx.lineTo(centerX, centerY); // Dibuja una línea hacia el centro para cerrar la forma
    ctx.closePath();
    ctx.fillStyle = percentage > 0.2 ? 'var(--accent-color)' : 'var(--wrong-answer-color)'; // Color del tiempo restante
    ctx.fill();

    // Dibujar borde del círculo
    ctx.beginPath();
    ctx.arc(centerX, centerY, safeRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'var(--accent-color)';
    ctx.lineWidth = 3;
    ctx.stroke();
}
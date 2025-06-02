// js/rosco.js

// Función para inicializar las letras del rosco
export function initializeRosco(roscoContainer, questions) {
    if (!roscoContainer || !questions) {
        console.error("initializeRosco: roscoContainer o questions no proporcionados.");
        return;
    }

    // Limpiar los círculos de letras del rosco si ya existen
    roscoContainer.querySelectorAll('.letter-circle').forEach(circle => circle.remove());

    const roscoRect = roscoContainer.getBoundingClientRect();
    const roscoRadius = roscoRect.width / 2;
    const centerX = roscoRadius;
    const centerY = roscoRadius;
    const letterCircleDiameter = 60; // Tamaño de cada círculo de letra
    const letterCircleRadius = letterCircleDiameter / 2;
    const angleStep = (2 * Math.PI) / questions.length; // Ángulo entre cada letra

    questions.forEach((q, index) => {
        const angle = index * angleStep - (Math.PI / 2); // Ajuste para empezar en la parte superior
        // Calcular posición en el círculo
        const x = centerX + (roscoRadius - letterCircleRadius - 10) * Math.cos(angle) - letterCircleRadius;
        const y = centerY + (roscoRadius - letterCircleRadius - 10) * Math.sin(angle) - letterCircleRadius;

        const letterCircle = document.createElement('div');
        letterCircle.classList.add('letter-circle');
        letterCircle.textContent = q.letter;
        letterCircle.style.left = `${x}px`;
        letterCircle.style.top = `${y}px`;
        roscoContainer.appendChild(letterCircle);
        q.element = letterCircle; // Guardar referencia al elemento DOM en el objeto de la pregunta
        q.status = 'unanswered'; // Estado inicial
    });
}

// Función para actualizar la letra actual resaltada
export function updateRoscoLetter(currentElement, letter) {
    const prevCurrent = document.querySelector('.letter-circle.current');
    if (prevCurrent) {
        prevCurrent.classList.remove('current');
    }
    if (currentElement) {
        currentElement.classList.add('current');
    }
}

// Función para marcar el estado de una letra (correcta, incorrecta, pasada)
export function markLetterStatus(element, status) {
    if (element) {
        element.classList.remove('current', 'correct', 'wrong', 'passed'); // Eliminar clases previas
        element.classList.add(status); // Añadir la nueva clase de estado
    }
}

// Función para reajustar las posiciones de las letras del rosco al redimensionar
export function resizeRoscoLetters(roscoContainer, questions) {
    if (!roscoContainer || !questions || questions.length === 0) return;

    const roscoRect = roscoContainer.getBoundingClientRect();
    const roscoRadius = roscoRect.width / 2;
    const centerX = roscoRadius;
    const centerY = roscoRadius;
    const letterCircleDiameter = 60; // Asumiendo el diámetro base
    const letterCircleRadius = letterCircleDiameter / 2;
    const angleStep = (2 * Math.PI) / questions.length;

    questions.forEach((q, index) => {
        if (q.element) { // Asegúrate de que el elemento DOM existe
            const angle = index * angleStep - (Math.PI / 2);
            const x = centerX + (roscoRadius - letterCircleRadius - 10) * Math.cos(angle) - letterCircleRadius;
            const y = centerY + (roscoRadius - letterCircleRadius - 10) * Math.sin(angle) - letterCircleRadius;
            q.element.style.left = `${x}px`;
            q.element.style.top = `${y}px`;
        }
    });
}
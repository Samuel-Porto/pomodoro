const inputsTempo = document.querySelectorAll('[data-input]');

import { trocarPomodoro } from "./pomodoro.js";

const iniciar = document.querySelector('[data-botao="iniciar"]');

iniciar.addEventListener("click", () => {trocarPomodoro()});

inputsTempo.forEach(input => {
    input.addEventListener('blur', () => {
        formataTempo(input);
    });
});

function formataTempo(campo) {
    campo.value = campo.value.replace(/[^0-9]/g, '0');
    campo.value = campo.value.padStart(2, '0');
}

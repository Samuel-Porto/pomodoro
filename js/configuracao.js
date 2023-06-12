const inputsTempo = document.querySelectorAll('[data-input]');
const nomeAtividade = document.querySelector('[data-nome="atividade"]');

import { trocarPomodoro } from "./pomodoro.js";

const iniciar = document.querySelector('[data-botao="iniciar"]');

iniciar.addEventListener("click", () => {trocarPomodoro(true)});

inputsTempo.forEach(input => {
    input.addEventListener('blur', () => {
        formataTempo(input);
    });
});

nomeAtividade.addEventListener('change', () => {
    let nome = nomeAtividade.value;
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);
    nomeAtividade.value = nome;
})

function formataTempo(campo) {
    campo.value = campo.value.replace(/[^0-9]/g, '0');
    campo.value = campo.value.padStart(2, '0');
}

const inputsTempo = document.querySelectorAll('[data-input]');
const nomeAtividade = document.querySelector('[data-nome="atividade"]');
const temas = document.querySelectorAll('[data-temas]');

import { trocarPomodoro } from "./pomodoro.js";

const iniciar = document.querySelector('[data-botao="iniciar"]');
const temasLista = ['tema-escuro', 'tema-azul', 'tema-verde', 'tema-claro'];

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
});

function formataTempo(campo) {
    campo.value = campo.value.replace(/[^0-9]/g, '0');
    campo.value = campo.value.padStart(2, '0');
}

temas.forEach(tema => {
    tema.addEventListener('click', () => {
        var temaSelecionado = tema.dataset.temas;
        
        temasLista.forEach(temaLista => {
            document.body.classList.remove(temaLista);
        });
        
        switch (temaSelecionado) {
            case 'escuro':
                document.body.classList.add('tema-escuro');
                break;
            case 'verde':
                document.body.classList.add('tema-verde');
                break;
            case 'claro':
                document.body.classList.add('tema-claro');
                break;
        }
    });
});
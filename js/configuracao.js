import { trocarPomodoro } from "./pomodoro.js";

const inputsTempo = document.querySelectorAll('[data-input]');
const temas = document.querySelectorAll('[data-temas]');
const nomeAtividade = document.querySelector('[data-nome="atividade"]');
const iniciar = document.querySelector('[data-botao="iniciar"]');
const botaoHistorico = document.querySelector('[data-botao="historico"]');

const temasLista = ['tema-escuro', 'tema-azul', 'tema-verde', 'tema-claro'];

iniciar.addEventListener("click", () => {trocarPomodoro(true)});

inputsTempo.forEach(input => {
    input.addEventListener('blur', () => {
        formataTempo(input);
    });
});

temas.forEach(tema => {
    tema.addEventListener('click', () => {
        trocaTema(tema.dataset.temas)
    });
});

botaoHistorico.addEventListener('click', () => {
    window.location = '../pages/historico.html';
});

nomeAtividade.addEventListener('blur', () => {
    let nome = nomeAtividade.value.toLowerCase();
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);
    var novoNome = nome.replace(/ /g, '');
    nomeAtividade.value = novoNome;

    if (localStorage.getItem(nomeAtividade.value) != null) {
        var tema = JSON.parse(localStorage.getItem(nomeAtividade.value))['tema'];
        var timers = JSON.parse(localStorage.getItem(nomeAtividade.value))['timers'];

        document.querySelector('[data-input="atividade-minuto"]').value = timers['atividade'][0];
        document.querySelector('[data-input="atividade-segundo"]').value = timers['atividade'][1];
        document.querySelector('[data-input="descanso-minuto"]').value = timers['descanso'][0];
        document.querySelector('[data-input="descanso-segundo"]').value = timers['descanso'][1];
        document.querySelector('[data-input="descanso-longo-minuto"]').value = timers['descansoLongo'][0];
        document.querySelector('[data-input="descanso-longo-segundo"]').value = timers['descansoLongo'][1];
        
        trocaTema(tema);
    }
});

function formataTempo(campo) {
    if (['atividade-segundo', 'descanso-segundo', 'descanso-longo-segundo'].includes(campo.dataset.input) && campo.value >= 60) {
        campo.value = 0;
    }
    
    campo.value = campo.value.replace(/[^0-9]/g, '0');
    campo.value = campo.value.padStart(2, '0');
}

function trocaTema(tema) {
        
    temasLista.forEach(temaLista => {
        const config = {
            temaAtual: tema
        }
        document.body.classList.remove(temaLista);
        localStorage.setItem('config', JSON.stringify(config))
    });
    
    document.body.classList.add(tema);
}
const configuracoesContainer = document.querySelector('[data-configuracoes]');
const nomeAtividade = document.querySelector('[data-nome="atividade"]');
const atividadeAtual = document.querySelector('[data-atividade-atual]');
const timerContainer = document.querySelector('[data-timer-container]');
const botaoHome = document.querySelector('[data-botao-home]');
const botaoMusica = document.getElementById('sons');
const timers = document.querySelectorAll('[data-timer]');
const mensagemLista = document.querySelectorAll('[data-mensagem]');
const audioPomodoro = new Audio('../sounds/pomodoro.mp3');

var sessao;
var audioAmbiente = new Audio;
var atividadeChave;

let tempoDeAtividade;
let descansoLongo;

botaoMusica.addEventListener('change', () => {
    tocaMusica(botaoMusica.value);
});

botaoHome.addEventListener('click', () => {
    home();
});

const mensagens = {
    atividade: {
        0: 'Coloque o seu celular no silencioso. Evitando distrações, você consegue se concentrar melhor.',
        1: 'Revisar a sua matéria ajuda muito a reter o conteúdo aprendido. Revise ao menos 5 minutos por dia o que aprendeu por uma semana e você com certeza verá a diferença!',
        2: 'Estudar com materiais impressos podem ser mais vantajosos do que a tela do computador, pois colaboram com a compreensão do conteúdo.',
        3: 'Ao relacionar os seus estudos com a sua vida real, você deixará mais facil a compreensão de conceitos ao qual estudou, pois estará buscando referências reais para conceitos abstratos',
        4: 'Quando não conseguir dormir, revise as atividades ao qual estudou, você poderá reter o que aprendeu ou sentir sono mais rápido!',
        5: 'Varie o seu conteúdo, concentrar em apenas uma area de estudos não é tão pratico quanto parece. Porém é aconselhado que estude temas correlacionados (como lingua estrangeira e leitura da mesma ou matemática e física)'
    },
    descanso: {
        0: 'Que tal se exercitar? faça um alongamento ou uma atividade física. Estudar é importante, porém a sua saúde também!',
        1: 'Dê preferências a comidas leves, comidas pesadas e gordurosas podem atrapalhar seu ritmo de estudos!',
        2: 'O metodo pomodoro visa não sobrecarregar o cérebro. Acredite, passar horas e horas estudando pode ser pouco produtivo!',
        3: 'Ao revisar um conteúdo, escolha lembrar o que acabou de aprender ao invés de reler o mesmo, a "recordação ativa" diz que recitar o conteúdo aprendido pode ajudar na memorização a longo prazo.',
        4: 'Aproveite este tempinho para mudar de cenário, uma mudança de ambiente pode ajudar bastante nas suas habilidades de aprendizado!',
        5: 'Organize seus materiais, não gaste seu tempo de estudos procurando seu livro ou seu lápis preferido por 5 minutos!'
    }
}

export function trocarPomodoro(iniciar = false) {
    if (iniciar) {
        descansoLongo = 4;
        tempoDeAtividade = 0;
        
        sessao = ['atividade', 'descanso'];
        atividadeChave = document.querySelector('[data-nome="atividade"]').value;

        if (localStorage.getItem(atividadeChave) != null) {
            tempoDeAtividade = JSON.parse(localStorage.getItem(atividadeChave))['tempo'];
        }
    }
    
    audioPomodoro.play();

    configuracoesContainer.style.display = 'none';
    timerContainer.style.display = 'flex'
    timers.forEach(timer => {
        timer.style.display = 'none';

        if (timer.dataset.timer == sessao[0]) {
            timer.style.display = "flex";
        document.querySelector(`[data-minuto="${sessao[0]}"]`).innerHTML = document.querySelector(`[data-input="${sessao[0]}-minuto"]`).value;
        document.querySelector(`[data-segundo="${sessao[0]}"]`).innerHTML = document.querySelector(`[data-input="${sessao[0]}-segundo"]`).value;

        atividadeAtual.innerHTML = nomeAtividade.value;

        mensagemLista.forEach(mensagem => {
            if (sessao[0] == 'descanso-longo') {
                mensagem.innerHTML = mensagens['descanso'][Math.floor(Math.random() * Object.keys(mensagens['descanso']).length)];
            } else {
                mensagem.innerHTML = mensagens[sessao[0]][Math.floor(Math.random() * Object.keys(mensagens[sessao[0]]).length)];
            }
        });
        }
    });
    atualizaTimer();
}

function timer(minutos, segundos) {
    setTimeout(function() {
        
        if (!(minutos.innerHTML == 0 && segundos.innerHTML == 0)){
            atualizaTimer();
        } else {
            sessao.push(sessao[0]);
            sessao.shift();
            if (sessao[0] == 'atividade') {
                descansoLongo--;
                if (descansoLongo == 0) {
                    descansoLongo = 5;
                    sessao[1] = 'descanso-longo';
                } else {
                    sessao[1] = 'descanso';
                }
            }

            trocarPomodoro();
        }

        segundos.innerHTML--;

        if (sessao[0] == 'atividade' && !(document.querySelector(`[data-minuto="${sessao[0]}"]`).innerHTML == document.querySelector(`[data-input="${sessao[0]}-minuto"]`).value && document.querySelector(`[data-segundo="${sessao[0]}"]`).innerHTML == document.querySelector(`[data-input="${sessao[0]}-segundo"]`).value)) {
            tempoDeAtividade++;
            salvaTempo();
        }

        if (segundos.innerHTML < 0) {
            segundos.innerHTML = 59;
            minutos.innerHTML--;
        }

        segundos.innerHTML = String(segundos.innerHTML).padStart(2, '0');
        minutos.innerHTML = String(minutos.innerHTML).padStart(2, '0');
        
    }, 1000);
    
}

function atualizaTimer() {
    var minutos = document.querySelector(`[data-minuto="${sessao[0]}"]`);
    var segundos = document.querySelector(`[data-segundo="${sessao[0]}"]`);
    if (timerContainer.style.display == 'flex') {
        timer(minutos, segundos);
    }
}

function tocaMusica(som) {
    audioAmbiente.pause();
    audioAmbiente.currentTime = 0;
    if (som != 'silencio') {
        audioAmbiente = new Audio(`../sounds/${som}-ambiente.mp3`);
        audioAmbiente.loop = true; 
        audioAmbiente.play();
    }
}

function home() {
    timerContainer.style.display = 'none';
    configuracoesContainer.style.display = 'flex';
    tocaMusica('silencio')
}

function salvaTempo() {
    var informacoes = {
        tempo: tempoDeAtividade,
        tema: document.body.classList[0],
        timers: {
            atividade: [document.querySelector('[data-input="atividade-minuto"]').value, document.querySelector('[data-input="atividade-segundo"]').value],
            descanso: [document.querySelector('[data-input="descanso-minuto"]').value, document.querySelector('[data-input="descanso-segundo"]').value],
            descansoLongo: [document.querySelector('[data-input="descanso-longo-minuto"]').value, document.querySelector('[data-input="descanso-longo-segundo"]').value]
        }
    }
    localStorage.setItem(atividadeChave, JSON.stringify(informacoes));
}

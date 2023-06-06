const configuracoesContainer = document.querySelector('[data-configuracoes]');

const nomeAtividade = document.querySelector('[data-nome="atividade"]');
const atividadeAtual = document.querySelector('[data-atividade-atual]');
const timerContainer = document.querySelector('[data-timer-container]');
const timers = document.querySelectorAll('[data-timer]');
const mensagemLista = document.querySelectorAll('[data-mensagem]');

var sessao = ['atividade', 'descanso'];

let descansoLongo = 4;

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
        3: 'Ao revisar um conteúdo, escolha lembrar do conteúdo ao invés de reler o conteúdo, a "recordação ativa" diz que recitar o conteúdo aprendido pode ajudar na memorização a longo prazo.',
        4: 'Aproveite este tempinho para mudar de cenário, uma mudança de cenário pode ajudar bastante nas suas habilidades de aprendizado!',
        5: 'Organize seus materiais, não gaste seu tempo de estudos procurando seu livro ou seu lápis preferido por 5 minutos!'
    }
}

export function trocarPomodoro() {
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
    iniciarTimer();
}

function timer(minutos, segundos) {
    setTimeout(function() {
        
        if (!(minutos.innerHTML == 0 && segundos.innerHTML == 0)) {
            iniciarTimer();
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

        if (segundos.innerHTML < 0) {
            segundos.innerHTML = 59;
            minutos.innerHTML--;
        }

        segundos.innerHTML = String(segundos.innerHTML).padStart(2, '0');
        minutos.innerHTML = String(minutos.innerHTML).padStart(2, '0');
        
    }, 1000);
    
}

function iniciarTimer() {
    var minutos = document.querySelector(`[data-minuto="${sessao[0]}"]`);
    var segundos = document.querySelector(`[data-segundo="${sessao[0]}"]`);

    timer(minutos, segundos);
}

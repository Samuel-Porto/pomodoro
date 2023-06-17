const temasLista = ['tema-escuro', 'tema-azul', 'tema-verde', 'tema-claro'];
const listaAtividade = document.querySelector('[data-tempo-atividades]');
const atividades = JSON.parse(localStorage.getItem('atividadesLista'));

if (localStorage.getItem('atividadesLista') == null) {
    converteAtividades();
}
mostraAtividades();

temasLista.forEach(temaLista => {
    document.body.classList.remove(temaLista);
});
document.body.classList.add(JSON.parse(localStorage.getItem('config'))['temaAtual'])

function converteAtividades() {
    for (let i = 0; i < localStorage.length; i++) {
        var atividades = {};
        if (localStorage.key(i) != 'config' && localStorage.key(i) != 'atividadesLista') {
            atividades[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
            localStorage.removeItem(localStorage.key(i));
        }

        localStorage.setItem('atividadesLista', JSON.stringify(atividades));
    }
}

function mostraAtividades() {
    Object.keys(atividades).forEach(atividade => {
        const div = document.createElement('div');
        div.className = 'atividade';
        div.innerHTML = `
        <h3>${atividade}</h3>
        <p>${Math.floor(atividades[atividade]['tempo']/60)}:${atividades[atividade]['tempo']%60}</p>
        `
        listaAtividade.appendChild(div);
        console.log('lob')
    })
}
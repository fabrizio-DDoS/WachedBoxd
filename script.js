let likeCounter = 0;
let deslikeCounter = 0;
let lateCounter = 0;

let filmes = [];
let index = 0;
let paginaUser = 1;
let carregando = false;


function proximoFilme() {
    index++;

    // se estiver chegando no fim, carrega mais
    if (index >= filmes.length - 3) {
        buscaFilmes();
    }
    salvarEstado();
    atualizaFilme();
}

function voltar() {
    // Só permite voltar se o index for maior que 0 (ou seja, se não for o primeiro filme)
    if (index > 0) {
        index--; 
        salvarEstado();
        atualizaFilme();
    } else {
        console.log("Você já está no primeiro filme da lista!");
    }
}


function like() {
    likeCounter++;

    if (filmes[index]) {
        salvarFilme(filmes[index], "✅");
    }
    salvarEstado();
    atualiza();
    proximoFilme();
}

function deslike() {
    deslikeCounter++;
    salvarEstado();
    atualiza();
    proximoFilme();
}

function later() {
    lateCounter++;
    if (filmes[index]) {
        salvarTarde(filmes[index], "✅");
    }
    salvarEstado();
    atualiza();
    proximoFilme();
}


function atualiza() {
    document.getElementById("mostraresult").innerHTML =
        `Ainda não: ${deslikeCounter}         |          Assistido: ${likeCounter}`;
}

function atualizaFilme() {
    const filmeAtual = filmes[index];

    if (!filmeAtual) return;

    const imagem =
        "https://image.tmdb.org/t/p/w500" + filmeAtual.poster_path;
    
    document.querySelector(".poster").src = imagem;
    document.getElementById("nomeFilme").innerHTML = filmeAtual.title;
    document.getElementById("popularidadeFilme").innerHTML = "Popularity: " + ~~(filmeAtual.popularity);
}

async function buscaFilmes() {
    if (carregando) return; // Se já estiver buscando, ignora cliques extras
    carregando = true; // Ativa a trava
    try {
        const resposta = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=30b7b3dd9d679e6f954fa0c5061f80e8&sort_by=vote_count.desc&page=${paginaUser}`
        );

        const dados = await resposta.json();

        if (dados.results && dados.results.length > 0) {
            filmes = filmes.concat(dados.results);
            paginaUser++; //Incrementa aqui, preparando de forma segura para a próxima chamada
            salvarEstado();

            if (index === 0) {
                atualizaFilme();
            }
        }
    } catch (err) {
        console.error("Erro ao buscar filmes:", err);
    } finally {
        carregando = false; // 👈 Desativa a trava independente de ter dado certo ou errado
    }
}


function salvarFilme(filme, status) {
    let lista = JSON.parse(localStorage.getItem("filmes")) || [];

    lista.push({
        title: filme.title,
        poster: filme.poster_path,
        status: status,
        release_date: filme.release_date,
        vote_average: filme.vote_average
    });

    localStorage.setItem("filmes", JSON.stringify(lista));
}

function salvarTarde(filme, status) {
    let tarde = JSON.parse(localStorage.getItem("tarde")) || [];

    tarde.push({
        title: filme.title,
        poster: filme.poster_path,
        status: status,
        release_date: filme.release_date,
        vote_average: filme.vote_average
    });

    localStorage.setItem("tarde", JSON.stringify(tarde));
}

function salvarEstado() {
    const estado = {
        index,
        paginaUser,
        filmes,
        likeCounter,
        deslikeCounter,
        lateCounter
    };

    localStorage.setItem("estadoApp", JSON.stringify(estado));
}

function voltar(){
    index -= 1;
    if (index >= filmes.length - 3) {
        buscaFilmes();
    }
    salvarEstado();
    atualizaFilme();
}

function carregarEstado() {
    const estadoSalvo = JSON.parse(localStorage.getItem("estadoApp"));

    if (!estadoSalvo) return;

    index = estadoSalvo.index || 0;
    paginaUser = estadoSalvo.paginaUser || 1;
    filmes = estadoSalvo.filmes || [];
    likeCounter = estadoSalvo.likeCounter || 0;
    deslikeCounter = estadoSalvo.deslikeCounter || 0;
    lateCounter = estadoSalvo.lateCounter || 0;

    atualiza();
    atualizaFilme();
}

function limparLista() {
    localStorage.removeItem("filmes");
    mostraLista();
}
function limparLater() {
    localStorage.removeItem("tarde");
    mostraLater();
}

function mostraLista() {
    const lista = JSON.parse(localStorage.getItem("filmes")) || [];

    let html = "";

    lista.forEach(filme => {
        html += `
            <div style="margin-bottom: 10px;">
                <img src="https://image.tmdb.org/t/p/w200${filme.poster}" 
                     style="width:50px; vertical-align: middle;">
                <span>${filme.title} - ${filme.status}</span>
            </div>
        `;
    });

    document.getElementById("mostraLista").innerHTML = html;
}

function mostraLater() {
    const tarde = JSON.parse(localStorage.getItem("tarde")) || [];

    let html = "";

    tarde.forEach(filme => {
        html += `
            <div style="margin-bottom: 10px;">
                <img src="https://image.tmdb.org/t/p/w200${filme.poster}" 
                     style="width:50px; vertical-align: middle;">
                <span>${filme.title} - ${filme.status}</span>
            </div>
        `;
    });

    document.getElementById("mostraLater").innerHTML = html;
}

function exportarCSV() {
    const lista = JSON.parse(localStorage.getItem("filmes")) || [];

    if (lista.length === 0) {
        alert("Nenhum filme para exportar!");
        return;
    }

    let csv = "Title,Year,Rating\n";

    lista.forEach(filme => {
        const ano = filme.release_date?.slice(0, 4) || "";
        csv += `${filme.title},${ano},${filme.vote_average}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "wachedboxd.csv";
    a.click();

    URL.revokeObjectURL(url);
}

carregarEstado();

if (filmes.length === 0) {
    buscaFilmes();
} else {
    atualizaFilme();
}

function resetarEstado() {
    localStorage.removeItem("estadoApp");

    // reseta variáveis
    likeCounter = 0;
    deslikeCounter = 0;
    lateCounter = 0;

    filmes = [];
    index = 0;
    paginaUser = 1;

    atualiza();

    buscaFilmes();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        like(); // Seta para a Direita dá Like
    } else if (event.key === "ArrowLeft") {
        deslike(); // Seta para a Esquerda dá Deslike
    }
});
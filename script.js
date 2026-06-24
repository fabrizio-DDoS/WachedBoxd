let likeCounter = 0;
let deslikeCounter = 0;
let lateCounter = 0;

let filmes = [];
let index = 0;
let paginaUser = 1;


function proximoFilme() {
    index++;

    // se estiver chegando no fim, carrega mais
    if (index >= filmes.length - 3) {
        paginaUser++;
        buscaFilmes();
    }
    salvarEstado();
    atualizaFilme();
}


function like() {
    likeCounter++;

    if (filmes[index]) {
        salvarFilme(filmes[index], "liked");
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
    salvarEstado();
    atualiza();
    proximoFilme();
}


function atualiza() {
    document.getElementById("mostraresult").innerHTML =
        `deslike: ${deslikeCounter} | like: ${likeCounter} | late: ${lateCounter}`;
}

function atualizaFilme() {
    const filmeAtual = filmes[index];

    if (!filmeAtual) return;

    const imagem =
        "https://image.tmdb.org/t/p/w500" + filmeAtual.poster_path;

    document.querySelector(".poster").src = imagem;
}

async function buscaFilmes() {
    try {
        const resposta = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=30b7b3dd9d679e6f954fa0c5061f80e8&page=${paginaUser}`
        );

        const dados = await resposta.json();
        
        filmes = filmes.concat(dados.results);
        salvarEstado();

        if (index === 0) {
            atualizaFilme();
        }
    } catch (err) {
        console.error("Erro ao buscar filmes:", err);
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
window.onclick("export-btn") = () => {
    document.getElementById("export-btn").onclick = exportarCSV;
};
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

    // recarrega tudo do zero
    buscaFilmes();
}

window.onclick("export-btn") = () => {
    document.getElementById("reset-btn").onclick = resetarEstado;
};
let deslikeCounter = 0;
let likeCounter = 0;
let lateCounter = 0;

let filmes = [];
let index = 0;

let paginaUser = 1;


function deslike(){
    deslikeCounter += 1;
    atualiza();
    buscaFilmes();
    }
function like(){
    likeCounter += 1;
    atualiza();
    buscaFilmes();
    salvarFilme(filmes[index], "liked");
}
function later(){
    lateCounter += 1;
    atualiza();
    buscaFilmes();
}

function atualiza(){
    while((deslikeCounter + likeCounter + lateCounter) == (19 * paginaUser)){
        paginaUser += 1;
    }
    document.getElementById("mostraresult").innerHTML = ("deslike: " + deslikeCounter + " like "+ likeCounter + " late: " + lateCounter);
}


async function buscaFilmes() {
    const resposta = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=30b7b3dd9d679e6f954fa0c5061f80e8&page=" + paginaUser.toString());
    const dados = await resposta.json();
    const poster = dados.results[(likeCounter + deslikeCounter + lateCounter - 19 * (paginaUser-1))].poster_path;
    const baseURL = "https://image.tmdb.org/t/p/w500";
    const posterPath = poster;

    filmes = dados.results;
    
    const imagemCompleta = baseURL + posterPath;

    document.querySelector(".poster").src = imagemCompleta;
}


function mostraLista(){
    const lista = JSON.parse(localStorage.getItem("filmes")) || [];

    let html = "";

    lista.forEach(filme => {
        html += `
            <div style="margin-bottom: 10px;">
                <img src="https://image.tmdb.org/t/p/w200${filme.poster}" style="width:50px; vertical-align: middle;">
                <span>${filme.title} - ${filme.status}</span>
            </div>
        `;
    });

    document.getElementById("mostraLista").innerHTML = html;
}

function salvarFilme(filme, status){
    let lista = JSON.parse(localStorage.getItem("filmes")) || [];

    lista.push({
        title: filme.title,
        poster: filme.poster_path,
        status: status
    });

    localStorage.setItem("filmes", JSON.stringify(lista));
}
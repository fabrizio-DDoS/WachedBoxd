<h1> 🎬 WachedBoxd </h1>

WachedBoxd é uma aplicação web inspirada na experiência do Tinder, criada para ajudar usuários a montar rapidamente uma lista de filmes assistidos ou para assistir depois.

A ideia principal é tornar o processo de catalogar filmes simples, rápido e até divertido, usando interações por decisão (like/dislike) em vez de formulários ou listas complexas.

🚀 Funcionalidades
👍 Marcar filme como assistido
👎 Marcar filme como não assistido
⏳ Salvar filme para assistir depois
🎞️ Exibição dinâmica de filmes populares
💾 Armazenamento local (localStorage)
📋 Visualização da lista salva
📤 Exportação futura para CSV
🧠 Como funciona
A aplicação consome dados da API do TMDB (The Movie Database)
Os filmes são exibidos um por vez na tela
O usuário interage com botões:
✔️ Assistido
❌ Não vi
⏳ Ver depois
Cada ação:
Atualiza contadores
Avança para o próximo filme
Salva o filme no navegador
Os dados ficam armazenados localmente no navegador via localStorage
🛠️ Tecnologias utilizadas
HTML5
CSS3
JavaScript (Vanilla JS)
API do TMDB
📦 Estrutura do projeto
index.html → tela principal (swipe de filmes)
lista.html → exibição dos filmes salvos
script.js → lógica da aplicação
style.css → estilos da interface
💾 Armazenamento de dados

Os filmes são salvos no navegador usando localStorage no seguinte formato:

[
  {
    "title": "Nome do Filme",
    "poster": "/caminho.jpg",
    "status": "liked"
  }
]
⚠️ Limitações atuais
Não há autenticação de usuário
Os dados não são sincronizados entre dispositivos
Possibilidade de repetição de filmes
API key exposta no frontend (apenas para desenvolvimento)
🔮 Melhorias futuras
Sistema de login
Integração com Letterboxd
Recomendação de filmes baseada em preferências
Swipe com animações (gestos)
Filtro por gênero
Exportação completa em CSV
Backend para persistência real
💡 Motivação

O projeto foi criado com o objetivo de:

Fazer uma ferramanta para mim e meus amigos
Praticar desenvolvimento web (HTML, CSS, JS)
Trabalhar com APIs reais
Criar um produto simples, mas útil
Explorar UX inspirada em aplicativos modernos
🧑‍💻 Autor

Desenvolvido por Fabrízio Moura como projeto de estudo e construção de portfólio.
@fabriziommoura

📌 Status do projeto

🚧 Em desenvolvimento (Mas já dá pra usar!)

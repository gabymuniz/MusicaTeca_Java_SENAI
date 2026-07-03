async function pesquisaArtista() {

    const nomeArtista = document.getElementById("nomeArtista").value;
    if (nomeArtista == "") {
        window.alert("Informe um nome válido! Não pode ser vazio!");
    } else {
        const url = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(nomeArtista)}&fmt=json`;

        const response = await fetch(url);
        const dados = await response.json();
        //console.log(dados)

        if (dados.artists.length > 0) {

            const artista = dados.artists[0];

            //localStorage.setItem("Nome Artista", JSON.stringify(dados.artists[0]));

            const artistaSalvo = {

                nome: artista.name,
                pais: artista.country,
                tipo: artista.type,
                tag: artista.tags,
                area: artista.area.name,
                cidadeOrigem: artista["begin-area"].name,
                anoInicio: artista["life-span"].begin

            };

            localStorage.setItem("artista", JSON.stringify(artistaSalvo));

            console.log(artistaSalvo);
            mostraArtista();
            // window.location.href = "../pages/apresentaDados.html";
        } else {
            alert("Artista/ banda não encontrado!!")
        }

        // console.log("Pesquisa artista")
    }
}

function mostraArtista() {

    const artistaString = localStorage.getItem("artista");
    // console.log(artistaString);
    const artista = JSON.parse(artistaString);

    const pNome = document.getElementById("nome");
    pNome.textContent = `Nome: ${artista.nome}`;

    const pPais = document.getElementById("pais");
    pPais.textContent = `Pais: ${artista.pais}`;

    const pTipo = document.getElementById("tipo");
    pTipo.textContent = `Tipo: ${artista.tipo}`;

    const pTag = document.getElementById("tag");

    for (let i = 0; i < artista.tag.length && i < 5; i++) {
        //console.log(artista.tag[i].name);    
        pTag.textContent += `${artista.tag[i].name}, `;
    }
    const pArea = document.getElementById("area");
    pArea.textContent = `Area: ${artista.area}`;

    const pcidadeOrigem = document.getElementById("cidadeOrigem");
    pcidadeOrigem.textContent = `Cidade de Origem: ${artista.cidadeOrigem}`;

    const PanoInicio = document.getElementById("anoInicio");
    PanoInicio.textContent = `Ano de Inicio: ${artista.anoInicio}`;
    // console.log(artista);
}

function pesquisaMusica() {
    //console.log("Pesquisa musica")

}
















/*
Comentários
encodeURI, pega a variavel, no caso nome, e passa ela como parametro para a api de forma segura
de acordo com que mesmo que o nome tenha espaços, a url seja aceita.



Para um MVP da MusicaTeca

Se o objetivo é entregar uma primeira versão funcional, eu priorizaria os seguintes campos:

✅ Nome do artista
✅ País
✅ Gêneros
✅ Biografia curta
✅ Álbuns
✅ Músicas
✅ Data de lançamento dos álbuns
✅ Links para Spotify e YouTube (quando disponíveis)
👤 Artista
-----------------------------------
Foto
Nome
País
Ano de início
Gêneros
Biografia

🎵 Músicas mais conhecidas
• Música 1
• Música 2
• Música 3

💿 Discografia
• Álbum A (2024)
• Álbum B (2022)

🎤 Eventos
• Festival X
• Show Y

🔗 Ouça em
Spotify | YouTube | Deezer

*/

/* console.log(artista.country);
        console.log(artista.type);
        console.log(artista.tags);
        console.log(artista.area);
        console.log(artista["begin-area"].name);
        console.log(artista["life-span"].begin);
        */
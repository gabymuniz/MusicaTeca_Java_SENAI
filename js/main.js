async function pesquisaArtista() {

    const nomeArtista = document.getElementById("nomeArtista").value;
    const url = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(nomeArtista)}&fmt=json`;

    const response = await fetch(url);
    const dados = await response.json();
    // console.log(dados)

    if (dados.artists.length > 0) {

        const artista = dados.artists[0];

        //localStorage.setItem("Nome Artista", JSON.stringify(dados.artists[0]));

        const artistaSalvo = {

            nome: artista.name,
            país: artista.country,
            tipo: artista.type,
            tag: artista.tags,
            area: artista.area.name,
            aidadeOrigem: artista["begin-area"].name,
            anoInicio: artista["life-span"].begin

        };

        localStorage.setItem("artista", JSON.stringify(artistaSalvo));
        console.log(artistaSalvo);
        window.location.href = "../pages/apresentaDados.html";
    } else {
        alert("Artista/ banda não encontrado!!")
    }

    console.log("Pesquisa artista")
}

function pesquisaMusica() {
    //console.log("Pesquisa musica")

}
















/*
Comentários
encodeURI, pega a variavel, no caso nome, e passa ela como parametro para a api de forma segura
de acordo com que mesmo que o nome tenha espaços, a url seja aceita.
*/

/* console.log(artista.country);
        console.log(artista.type);
        console.log(artista.tags);
        console.log(artista.area);
        console.log(artista["begin-area"].name);
        console.log(artista["life-span"].begin);
        */
async function pesquisaMusica() {

    const nomeMusica = document.getElementById("nomeMusica").value.trim();

    if (nomeMusica === "") {
        alert("Informe o nome de uma música!");
        return;
    }

    try {

        const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(nomeMusica)}&fmt=json`;

        const response = await fetch(url);
        const dados = await response.json();

        if (dados.recordings.length > 0) {

            const musica = dados.recordings[0];

            const musicaSalva = {

                titulo: musica.title,
                artista: musica["artist-credit"]?.[0]?.name || "Não informado",
                album: musica.releases?.[0]?.title || "Não informado",
                dataLancamento: musica.releases?.[0]?.date || "Não informado",
                duracao: musica.length || 0

            };

            localStorage.setItem("musica", JSON.stringify(musicaSalva));

            mostraMusica();

        } else {
            alert("Música não encontrada!");
        }

    } catch (erro) {

        console.log(erro);
        alert("Erro ao pesquisar a música.");

    }

}

function mostraMusica() {

    const musicaString = localStorage.getItem("musica");

    if (!musicaString) {
        return;
    }

    const musica = JSON.parse(musicaString);

    document.getElementById("titulo").textContent =
        `Título: ${musica.titulo}`;

    document.getElementById("artista").textContent =
        `Artista: ${musica.artista}`;

    document.getElementById("album").textContent =
        `Álbum: ${musica.album}`;

    document.getElementById("dataLancamento").textContent =
        `Lançamento: ${musica.dataLancamento}`;

    if (musica.duracao > 0) {

        const minutos = Math.floor(musica.duracao / 60000);
        const segundos = Math.floor((musica.duracao % 60000) / 1000);

        document.getElementById("duracao").textContent =
            `Duração: ${minutos}:${segundos.toString().padStart(2, "0")}`;

    } else {

        document.getElementById("duracao").textContent =
            "Duração: Não informada";

    }

}
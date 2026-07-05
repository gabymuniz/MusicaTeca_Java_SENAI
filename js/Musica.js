async function pesquisaMusica(event) {
  // Previne a atualização da página
  event.preventDefault();

  const nomeMusica = document.getElementById("nomeMusica").value.trim();

  if (nomeMusica === "") {
    alert("Informe o nome de uma música!");
    return;
  }

  try {
    // Encontra o modal por id
    const modalElement = document.getElementById("exibirDadosMusica");
    // Inicializa o modal do bootstrap
    const myModal = new bootstrap.Modal(modalElement);
    // Abre o modal
    myModal.show();

    const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(nomeMusica)}&fmt=json`;

    const response = await fetch(url);
    const dados = await response.json();
    console.log(dados);

    if (dados.recordings.length > 0) {
      const musica = dados.recordings[0];

      const musicaSalva = {
        titulo: musica.title,
        artistaMusica: musica["artist-credit"]?.[0]?.name || "Não informado",
        album: musica.releases?.[0]?.title || "Não informado",
        dataLancamento: musica.releases?.[0]?.date || "Não informado",
        duracao: musica.length || 0,
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

  //Se não tem musica sai da função
  if (!musicaString) {
    return;
  }

  const musica = JSON.parse(musicaString);

  document.getElementById("titulo").textContent = `Título: ${musica.titulo}`;

  document.getElementById("artistaMusica").textContent = `Artista/Banda: ${musica.artistaMusica}`;

  document.getElementById("album").textContent = `Álbum: ${musica.album}`;

  document.getElementById("dataLancamento").textContent =
    `Lançamento: ${musica.dataLancamento}`;


//transforma a duração das músicas de milisegundos em minutos e segundos
  if (musica.duracao > 0) {
    const minutos = Math.floor(musica.duracao / 60000);
    const segundos = Math.floor((musica.duracao % 60000) / 1000);

    document.getElementById("duracao").textContent =
      `Duração: ${minutos}:${segundos.toString().padStart(2, "0")}`;
  } else {
    document.getElementById("duracao").textContent = "Duração: Não informada";
  }
}

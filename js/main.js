async function pesquisaArtista(event) {
  // Previne a atualização da página
  event.preventDefault();

  const nomeArtista = document.getElementById("nomeArtista").value;

  if (nomeArtista == "") {
    window.alert("Informe um nome válido! Não pode ser vazio!");
    return;
  }
  try {
    // Encontra o modal por id
    const modalElement = document.getElementById("exibirDadosArtista");
    // Inicializa o modal do bootstrap
    const myModal = new bootstrap.Modal(modalElement);
    // Abre o modal
    myModal.show();

    const url = `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(nomeArtista)}&fmt=json`;

    const response = await fetch(url);
    const dados = await response.json();
    console.log(dados);

    if (dados.artists.length > 0) {
      const artista = dados.artists[0];

      //localStorage.setItem("Nome Artista", JSON.stringify(dados.artists[0]));

      const artistaSalvo = {
        //?. -> significa que vai buscar o campo(nome) e se tiver vai preencher
        // || -> ou, se o valor for vazio vai aparecer "Não informado"
        nome: artista?.name || "Não informado",
        pais: artista?.country || "Não informado",
        tipo: artista?.type || "Não informado",
        tag: artista?.tags || "Não informado",
        area: artista?.area?.name || "Não informado",
        cidadeOrigem: artista["begin-area"]?.name || "Não informado",
        anoInicio: artista["life-span"]?.begin || "Não informado",
      };

      localStorage.setItem("artista", JSON.stringify(artistaSalvo));

      console.log(artistaSalvo);
      mostraArtista();
      // window.location.href = "../pages/apresentaDados.html";
    } else {
      alert("Artista/ banda não encontrado!!");
    }
  } catch (erro) {
    console.log(erro);
    alert("Erro ao pesquisar Artista.");
  }

  // console.log("Pesquisa artista")
}

function mostraArtista() {
  const artistaString = localStorage.getItem("artista");
  // console.log(artistaString);]
  //Se não tem artista sai da função e para
  if (!artistaString) {
    return;
  }
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

function apagarDados() {
  //localStorage.clear();
}

function salvarHistorico(artista) {
  /* console.log("Função: " + nomeDaFuncao);
    console.log("Primeiro número: " + num1);
    console.log("Segundo número: " + num2);
    console.log("Resultado: " + resultado);
    console.log("--------------------------------");

    let operacao = {
        funcao: nomeDaFuncao,
        numero1: num1,
        numero2: num2,
        resultado: resultado
    };
*/
  let historicoLocal =
    JSON.parse(localStorage.getItem("historicoArtista")) || [];

  historicoLocal.push(artista);

  localStorage.setItem("historicoArtista", JSON.stringify(historicoLocal));
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

// Verifica se o usuário está autenticado; se não estiver, redireciona para a página de login (index.html)
if (localStorage.getItem("logado") !== "true") {
  window.location.href = "index.html";
}

// Cria o mapa na div com id "mapa", centralizado nas coordenadas [-23.4251, -51.9386] com zoom 13
const mapa = L.map("mapa").setView([-23.4251, -51.9386], 13);

// Adiciona o tile layer do OpenStreetMap com os devidos créditos ao mapa
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(mapa);

// Define ícones personalizados para cada tipo de ponto de coleta, com caminho para as imagens e tamanho
const icons = {
  "Sucatas eletrônicas": L.icon({ iconUrl: 'icons/eletronicos.png', iconSize: [32, 32] }),
  "Pilhas e baterias": L.icon({ iconUrl: 'icons/pilhas.png', iconSize: [32, 32] }),
  "Vidros": L.icon({ iconUrl: 'icons/vidro.png', iconSize: [32, 32] }),
  "Esponjas": L.icon({ iconUrl: 'icons/esponja.png', iconSize: [32, 32] }),
  "Lâmpadas": L.icon({ iconUrl: 'icons/lampada.png', iconSize: [32, 32] }),
  "Óleo usado": L.icon({ iconUrl: 'icons/oleo.png', iconSize: [32, 32] }),
  "Pneus": L.icon({ iconUrl: 'icons/pneus.png', iconSize: [32, 32] })
};

// --- PONTOS DE COLETA COM COORDENADAS CORRIGIDAS ---
const pontos = [
  // Sucatas Eletrônicas
  { nome: "Paço Municipal", tipo: "Sucatas eletrônicas", lat: -23.42659, lng: -51.93730, endereco: "Av. XV de Novembro, 701", telefone: "(44) 3221-1200" },
  { nome: "Faculdade Maringá", tipo: "Sucatas eletrônicas", lat: -23.41944, lng: -51.93881, endereco: "Av. Prudente de Morais, 815", telefone: "(44) 3027-1103" },
  { nome: "4° Batalhão de Polícia Militar", tipo: "Sucatas eletrônicas", lat: -23.40821, lng: -51.93201, endereco: "Rua Mitsuzo Taguchi, 730", telefone: "(44) 3261-5100" },
  { nome: "Câmara Municipal de Maringá", tipo: "Sucatas eletrônicas", lat: -23.42477, lng: -51.93229, endereco: "Av. Papa João XXIII, 239", telefone: "(44) 3027-4114" },

  // Pilhas e Baterias
  { nome: "Banco Sicoob Maringá", tipo: "Pilhas e baterias", lat: -23.42137, lng: -51.93833, endereco: "Av. Brasil, 2309", telefone: "(44) 3025-6262" },
  { nome: "Atacadão", tipo: "Pilhas e baterias", lat: -23.41679, lng: -51.93326, endereco: "Rua Fernão Dias, 300", telefone: "(44) 3218-8444" },

  // Vidros
  { nome: "4° Batalhão de Polícia Militar (Vidros)", tipo: "Vidros", lat: -23.40826, lng: -51.93213, endereco: "Rua Mitsuzo Taguchi, 99", telefone: "(44) 3261-5100" },
  { nome: "Paróquia Menino Jesus de Praga", tipo: "Vidros", lat: -23.43050, lng: -51.92796, endereco: "Rua Monsenhor Kimura, 31", telefone: "(44) 3227-2983" },
  { nome: "Paróquia Cristo Ressuscitado", tipo: "Vidros", lat: -23.41388, lng: -51.92746, endereco: "Av. Rio Branco, 100", telefone: "(44) 3224-4287" },
  { nome: "Cooper Palmeiras", tipo: "Vidros", lat: -23.43391, lng: -52.00045, endereco: "Rodovia PR 317, 200", telefone: "(44) 99946-5778" },
  { nome: "CooperCanção", tipo: "Vidros", lat: -23.44791, lng: -51.95420, endereco: "Av. Ver. João Batista Sanches, 1234", telefone: "(44) 99905-6064" },
  { nome: "CooperNorte", tipo: "Vidros", lat: -23.43391, lng: -52.00045, endereco: "Rodovia PR 317, 200", telefone: "(44) 99743-1272" },
  { nome: "CooperCicla", tipo: "Vidros", lat: -23.45633, lng: -51.92425, endereco: "Rua Lobélia, 1137", telefone: "(44) 3040-0291" },

  // Esponjas
  { nome: "Instituto Ambiental de Maringá", tipo: "Esponjas", lat: -23.41637, lng: -51.94105, endereco: "Av. Cerro Azul, 544", telefone: "(44) 3293-8750" },
  { nome: "Secretaria de Limpeza Urbana", tipo: "Esponjas", lat: -23.42050, lng: -51.89914, endereco: "Av. das Indústrias, 700", telefone: "(44) 3261-5500" },
  { nome: "Secretaria de Esportes e Lazer", tipo: "Esponjas", lat: -23.42391, lng: -51.94301, endereco: "Av. Duque de Caxias, 1368", telefone: "(44) 3220-5750" },
  { nome: "Secretaria de Mobilidade Urbana", tipo: "Esponjas", lat: -23.41715, lng: -51.92351, endereco: "Av. Colombo, 3114", telefone: "(44) 3221-8500" },
  { nome: "Secretaria da Mulher", tipo: "Esponjas", lat: -23.42435, lng: -51.92972, endereco: "Av. Papa João XXIII, 497", telefone: "(44) 3293-8350" },
  { nome: "Secretaria de Bem-Estar Animal", tipo: "Esponjas", lat: -23.42758, lng: -51.93952, endereco: "Av. Laguna, 668", telefone: "(44) 3901-1885" },
  { nome: "Teatro Calil Haddad", tipo: "Esponjas", lat: -23.40794, lng: -51.94723, endereco: "Av. Dr. Teixeira Mendes, 2500", telefone: "(44) 3218-6100" },

  // Lâmpadas
  { nome: "Supermuffato (Centro)", tipo: "Lâmpadas", lat: -23.42624, lng: -51.91308, endereco: "Av. João Paulino Vieira Filho, 190", telefone: "(44) 4009-1400" },
  { nome: "Supermuffato Cerro Azul", tipo: "Lâmpadas", lat: -23.43541, lng: -51.94432, endereco: "Av. Cerro Azul, 2075", telefone: "(44) 4009-8900" },
  { nome: "Supermuffato Catuaí Shopping", tipo: "Lâmpadas", lat: -23.44755, lng: -51.90786, endereco: "Av. Colombo, 9161", telefone: "(44) 3123-9250" },
  { nome: "Supermuffato Gourmet", tipo: "Lâmpadas", lat: -23.42550, lng: -51.92880, endereco: "Av. São Paulo, 1500", telefone: "(44) 3301-5500" },
  { nome: "Max Atacadista", tipo: "Lâmpadas", lat: -23.42512, lng: -51.89531, endereco: "Av. Colombo, 1515", telefone: "(44) 3366-3200" },
  { nome: "Cidade Canção (Bento Munhoz)", tipo: "Lâmpadas", lat: -23.41720, lng: -51.92267, endereco: "Av. Pedro Taques, 294", telefone: "(44) 3226-1920" },
  { nome: "Cidade Canção (Tamandaré)", tipo: "Lâmpadas", lat: -23.42078, lng: -51.93598, endereco: "Av. Tamandaré, 903", telefone: "(44) 3221-2650" },
  { nome: "Cidade Canção (Rocha Pombo)", tipo: "Lâmpadas", lat: -23.42259, lng: -51.93718, endereco: "Av. Brasil, 2821", telefone: "(44) 3226-1400" },
  { nome: "Cidade Canção (Tuiuti)", tipo: "Lâmpadas", lat: -23.41372, lng: -51.92080, endereco: "Av. Tuiuti, 1672", telefone: "(44) 3268-4455" },
  { nome: "Cidade Canção (Alvorada)", tipo: "Lâmpadas", lat: -23.40051, lng: -51.94723, endereco: "Av. Lucílio de Held, 1477", telefone: "(44) 3228-1097" },
  { nome: "Cidade Canção (Pedro Taques)", tipo: "Lâmpadas", lat: -23.40538, lng: -51.92182, endereco: "Av. Pedro Taques, 1781", telefone: "(44) 3263-1060" },
  { nome: "Cidade Canção (Cerro Azul)", tipo: "Lâmpadas", lat: -23.42394, lng: -51.94165, endereco: "Av. Cerro Azul, 979", telefone: "(44) 3226-5718" },
  { nome: "Cidade Canção (Morangueira)", tipo: "Lâmpadas", lat: -23.39798, lng: -51.93043, endereco: "Av. Morangueira, 1505", telefone: "(44) 3263-8009" },

  // Óleo Usado
  { nome: "Cidade Canção (Palmeiras)", tipo: "Óleo usado", lat: -23.44709, lng: -51.94269, endereco: "Av. das Palmeiras, 356", telefone: "(44) 3263-5531" },
  { nome: "Cidade Canção (Mandacaru)", tipo: "Óleo usado", lat: -23.38613, lng: -51.93451, endereco: "Av. Mandacaru, 2824", telefone: "(44) 3265-7692" },
  { nome: "Cidade Canção (Brasil)", tipo: "Óleo usado", lat: -23.42158, lng: -51.92543, endereco: "Av. Brasil, 4724", telefone: "(44) 3225-5000" },
  { nome: "Cidade Canção (Maringá Velho)", tipo: "Óleo usado", lat: -23.42331, lng: -51.90393, endereco: "Av. Brasil, 7225", telefone: "(44) 3344-5732" },
  { nome: "Cidade Canção (Shopping Mandacaru)", tipo: "Óleo usado", lat: -23.41162, lng: -51.93625, endereco: "Av. Mandacaru, 247", telefone: "(44) 3225-8641" },
  { nome: "Cidade Canção (Gastão)", tipo: "Óleo usado", lat: -23.44040, lng: -51.93774, endereco: "Av. Nildo Ribeiro da Rocha, 343", telefone: "(44) 3344-5732" },
  { nome: "Ecoalternativa", tipo: "Óleo usado", lat: -23.41212, lng: -51.92723, endereco: "Av. Morangueira, 121", telefone: "(44) 98814-8720" },

  // Pneus
  { nome: "Reciclanip", tipo: "Pneus", lat: -23.43460, lng: -51.91610, endereco: "Av. Guaiapó, 4550", telefone: "(44) 99129-6655" }
];

// Seleciona o elemento HTML que exibirá a lista de pontos de coleta
const lista = document.getElementById("lista-coleta");
// Seleciona o elemento select usado para filtrar por tipo de ponto
const filtroTipo = document.getElementById("filtro-tipo");
// Adiciona um evento para quando o filtro mudar, chamar a função para exibir os pontos filtrados
filtroTipo.addEventListener("change", e => exibirPontos(e.target.value));
// Array para guardar os marcadores que são adicionados ao mapa
const marcadores = [];

// Função que exibe os pontos de coleta no mapa e na lista com base no filtro informado
function exibirPontos(filtro = "") {
  // Limpa a lista HTML
  lista.innerHTML = "";
  // Remove todos os marcadores antigos do mapa
  marcadores.forEach(m => mapa.removeLayer(m));
  // Limpa o array de marcadores
  marcadores.length = 0;

  // Percorre todos os pontos de coleta
  pontos.forEach((p, i) => {
    // Se o filtro estiver vazio ou o nome/tipo do ponto corresponder ao filtro (ignorando maiúsculas/minúsculas)
    if (
      filtro === "" ||
      p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      p.tipo.toLowerCase().includes(filtro.toLowerCase())
    ) {
      // Cria um marcador no mapa com a posição do ponto e ícone correspondente ao tipo
      const marker = L.marker([p.lat, p.lng], {
        icon: icons[p.tipo.split(" / ")[0]] || undefined
      }).addTo(mapa)
        // Adiciona um popup ao marcador com informações do ponto
        .bindPopup(`<b>${p.nome}</b><br>${p.tipo}<br>${p.endereco}<br>${p.telefone}`);
      
      // Guarda o marcador para poder removê-lo depois, se necessário
      marcadores.push(marker);

      // Cria um item de lista com as informações do ponto
      const item = document.createElement("li");
      item.innerHTML = `<em>${p.tipo}</em><br><strong>${p.nome}</strong><br>${p.endereco}<br>${p.telefone}`;
      
      // Ao clicar no item da lista, centraliza o mapa no ponto e abre o popup correspondente
      item.onclick = () => {
        mapa.setView([p.lat, p.lng], 16);
        marker.openPopup();
      };
      // Adiciona o item à lista exibida na página
      lista.appendChild(item);
    }
  });
}
// Chama a função inicialmente para exibir todos os pontos sem filtro
exibirPontos();

// Função que realiza logout removendo a flag "logado" e redirecionando para a página de login
function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

// Obtém a pontuação do usuário armazenada no localStorage ou inicia em 0
let pontosDoUsuario = parseInt(localStorage.getItem("pontos") || "0");
// Atualiza a exibição da pontuação na tela ao carregar
atualizarPontuacaoNaTela();

// Seleciona o campo de busca por texto
const inputBusca = document.getElementById("inputBusca");
// Se existir o campo de busca, adiciona evento para filtrar os pontos conforme o texto digitado
if (inputBusca) {
  inputBusca.addEventListener("input", e => exibirPontos(e.target.value));
}

// Função para atualizar o elemento HTML que mostra a pontuação atual do usuário
function atualizarPontuacaoNaTela() {
  const pontosHomeEl = document.getElementById('pontos-home');
  if (pontosHomeEl) {
    pontosHomeEl.textContent = pontosDoUsuario;
  }
}

// Função que valida o código digitado no modal de resgate e atualiza a pontuação se válido
function confirmarResgate() {
  const inputCodigo = document.getElementById('codigoResgate').value.trim();
  let pontosAdicionar = 0;
  let mensagem = "";

  // Objetos com códigos válidos e seus respectivos valores de pontos
  const codigos = {
    "unicesumar10": 10,
    "unicesumar50": 50,
    "unicesumar100": 100
  };

  // Verifica se o código digitado está entre os válidos
  if (inputCodigo in codigos) {
    pontosAdicionar = codigos[inputCodigo];
    pontosDoUsuario += pontosAdicionar;
    localStorage.setItem("pontos", pontosDoUsuario);
    mensagem = `Você ganhou ${pontosAdicionar} pontos!`;
    atualizarPontuacaoNaTela();
    alert(`${mensagem} Total: ${pontosDoUsuario} pontos.`);
  } else if (inputCodigo === "") {
    alert("Por favor, insira um código.");
    return;
  } else {
    alert("Código inválido. Tente novamente.");
  }

  // Fecha o modal após a ação
  fecharModal();
}

// Abre o modal de resgate removendo a classe que o esconde
function abrirModal() {
  document.getElementById('modal-resgatar').classList.remove('hidden');
}
// Fecha o modal adicionando a classe que o esconde e limpa o campo de entrada
function fecharModal() {
  const modal = document.getElementById('modal-resgatar');
  modal.classList.add('hidden');
  document.getElementById('codigoResgate').value = "";
}

// Atualiza a pontuação na tela
function atualizarPontuacaoNaTela() {
  const pontosHomeEl = document.getElementById('pontos-home');
  if (pontosHomeEl) {
    pontosHomeEl.textContent = pontosDoUsuario;
  }
}

// Atualiza a pontuação na tela quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', atualizarPontuacaoNaTela);

// Deixa as funções confirmResgate, abrirModal e fecharModal acessíveis globalmente para serem chamadas no HTML
window.confirmarResgate = confirmarResgate;
window.abrirModal = abrirModal; // Garantia de acesso global
window.fecharModal = fecharModal; // Garantia de acesso global
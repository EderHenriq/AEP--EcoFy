// Redireciona para login se não estiver autenticado
if (localStorage.getItem("logado") !== "true") {
  window.location.href = "index.html";
}

const mapa = L.map("mapa").setView([-23.4251, -51.9386], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(mapa);

const icons = {
  "Sucatas eletrônicas": L.icon({ iconUrl: 'icons/eletronicos.png', iconSize: [32, 32] }),
  "Pilhas e baterias": L.icon({ iconUrl: 'icons/pilhas.png', iconSize: [32, 32] }),
  "Vidros": L.icon({ iconUrl: 'icons/vidro.png', iconSize: [32, 32] }),
  "Esponjas": L.icon({ iconUrl: 'icons/esponja.png', iconSize: [32, 32] }),
  "Lâmpadas": L.icon({ iconUrl: 'icons/lampada.png', iconSize: [32, 32] }),
  "Óleo usado": L.icon({ iconUrl: 'icons/oleo.png', iconSize: [32, 32] }),
  "Pneus": L.icon({ iconUrl: 'icons/pneu.png', iconSize: [32, 32] })
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


const lista = document.getElementById("lista-coleta");
const filtroTipo = document.getElementById("filtro-tipo");
filtroTipo.addEventListener("change", e => exibirPontos(e.target.value));
const marcadores = [];

function exibirPontos(filtro = "") {
  lista.innerHTML = "";
  marcadores.forEach(m => mapa.removeLayer(m));
  marcadores.length = 0;

  // Se filtro vazio, exibe todos
  pontos.forEach((p, i) => {
    // Se filtro vazio, exibe tudo, senão filtra pelo tipo e nome
    if (
      filtro === "" ||
      p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      p.tipo.toLowerCase().includes(filtro.toLowerCase())
    ) {
      const marker = L.marker([p.lat, p.lng], {
        icon: icons[p.tipo.split(" / ")[0]] || undefined
      }).addTo(mapa).bindPopup(`<b>${p.nome}</b><br>${p.tipo}<br>${p.endereco}<br>${p.telefone}`);
      marcadores.push(marker);

      const item = document.createElement("li");
      item.innerHTML = `<em>${p.tipo}</em><br><strong>${p.nome}</strong><br>${p.endereco}<br>${p.telefone}`;
      item.onclick = () => {
        mapa.setView([p.lat, p.lng], 16);
        marker.openPopup();
      };
      lista.appendChild(item);
    }
  });
}
exibirPontos();

inputBusca.addEventListener("input", e => exibirPontos(e.target.value));

exibirPontos();

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

function abrirModal() {
  document.getElementById('modal-resgatar').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modal-resgatar').classList.add('hidden');
}

function confirmarResgate() {
  const input = document.querySelector('#modal-resgatar input').value;
  if (input.trim() === "") {
    alert("Por favor, insira um código válido.");
  } else {
    alert("Você resgatou seus pontos! Obrigado por ajudar o meio ambiente.");
    fecharModal();
  }
}

 document.addEventListener("DOMContentLoaded", function () {
      window.addEventListener("scroll", function () {
        const footer = document.getElementById("footer");
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= documentHeight -1) {
          footer.style.display = "block";
        } else {
          footer.style.display = "none";
        }
      });
    });

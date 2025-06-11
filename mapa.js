if (localStorage.getItem("logado") !== "true") {
  window.location.href = "index.html";
}

const mapa = L.map("mapa").setView([-23.4206, -51.9333], 13); // Maringá

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(mapa);

const pontos = [
  { nome: "EcoPosto Zona 5", lat: -23.4101, lng: -51.9200, tipo: "Óleo usado" },
  { nome: "Supermercado Sustentável", lat: -23.4250, lng: -51.9400, tipo: "Pilhas" },
  { nome: "Recicla Maringá", lat: -23.4300, lng: -51.9350, tipo: "Plástico/eletrônicos" }
];

const lista = document.getElementById("lista-coleta");

pontos.forEach(p => {
  L.marker([p.lat, p.lng]).addTo(mapa).bindPopup(`<b>${p.nome}</b><br>${p.tipo}`);
  const item = document.createElement("li");
  item.textContent = `${p.nome} - ${p.tipo}`;
  lista.appendChild(item);
});

document.querySelector(".btn-resgatar").addEventListener("click", () => {
  let pontos = parseInt(localStorage.getItem("pontos") || "0");
  pontos += 10;
  localStorage.setItem("pontos", pontos);
  alert("Você ganhou 10 pontos por ajudar o meio ambiente!");
});

const extras = JSON.parse(localStorage.getItem("pontosExtra") || "[]");
extras.forEach(p => {
  L.marker([p.lat, p.lng])
    .addTo(mapa)
    .bindPopup(`<b>${p.nome}</b><br>${p.tipo}`);
  const item = document.createElement("li");
  item.textContent = `${p.nome} - ${p.tipo}`;
  lista.appendChild(item);
});

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}
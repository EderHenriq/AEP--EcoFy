const form = document.getElementById("form-ponto");
const lista = document.getElementById("lista-pontos");

const pontos = JSON.parse(localStorage.getItem("pontosColeta")) || [];

function atualizarLista() {
  lista.innerHTML = "";
  pontos.forEach((p, i) => {
    const item = document.createElement("li");
    item.textContent = `${p.nome} - ${p.tipo} (${p.lat}, ${p.lng})`;
    lista.appendChild(item);
  });
}
atualizarLista();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const novo = {
    nome: document.getElementById("nome").value,
    tipo: document.getElementById("tipo").value,
    lat: parseFloat(document.getElementById("lat").value),
    lng: parseFloat(document.getElementById("lng").value),
  };
  pontos.push(novo);
  localStorage.setItem("pontosColeta", JSON.stringify(pontos));
  atualizarLista();
  form.reset();
});

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}
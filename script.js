function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("senha").value;
  const dados = JSON.parse(localStorage.getItem("usuarios")) || [];

  const encontrado = dados.find(u => u.user === user && u.pass === pass);
  if (encontrado) {
    localStorage.setItem("logado", "true");
    window.location.href = "home.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
}

function cadastrar() {
  const user = document.getElementById("novoUsuario").value;
  const pass = document.getElementById("novaSenha").value;
  let dados = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (dados.find(u => u.user === user)) {
    alert("Usuário já existe!");
    return;
  }

  dados.push({ user, pass });
  localStorage.setItem("usuarios", JSON.stringify(dados));
  alert("Cadastro feito com sucesso!");
  document.getElementById("cadastro").classList.add("hidden");
}

function mostrarCadastro() {
  document.getElementById("cadastro").classList.toggle("hidden");
}
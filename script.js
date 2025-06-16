// Função para realizar o login do usuário
function login() {
  // Pega os valores digitados nos campos usuário e senha
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("senha").value;
  // Recupera os usuários cadastrados no localStorage, ou um array vazio se não houver
  const dados = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Procura no array se existe um usuário com o mesmo nome e senha digitados
  const encontrado = dados.find(u => u.user === user && u.pass === pass);
  if (encontrado) {
    // Se encontrado, marca o usuário como logado e redireciona para a página home.html
    localStorage.setItem("logado", "true");
    window.location.href = "home.html";
  } else {
    // Se não encontrado, exibe alerta de usuário ou senha inválidos
    alert("Usuário ou senha inválidos");
  }
}

// Função para cadastrar um novo usuário
function cadastrar() {
  // Pega os valores digitados nos campos de novo usuário e nova senha
  const user = document.getElementById("novoUsuario").value;
  const pass = document.getElementById("novaSenha").value;
  // Recupera a lista atual de usuários cadastrados no localStorage ou array vazio se não houver
  let dados = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se já existe um usuário com o mesmo nome para evitar duplicidade
  if (dados.find(u => u.user === user)) {
    alert("Usuário já existe!");
    return; // Para a execução se o usuário já existir
  }

  // Adiciona o novo usuário com nome e senha no array de dados
  dados.push({ user, pass });
  // Salva o array atualizado no localStorage como string JSON
  localStorage.setItem("usuarios", JSON.stringify(dados));
  // Exibe mensagem de cadastro realizado com sucesso
  alert("Cadastro feito com sucesso!");
  // Esconde a área de cadastro após o registro
  document.getElementById("cadastro").classList.add("hidden");
}

// Função para mostrar ou esconder o formulário de cadastro ao clicar em botão
function mostrarCadastro() {
  // Alterna a classe "hidden" para mostrar ou esconder o elemento com id "cadastro"
  document.getElementById("cadastro").classList.toggle("hidden");
}
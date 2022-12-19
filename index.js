const usuarios = [];

if (localStorage.getItem("usuarios") === null) {
  //se nao tiver usuarios no local storage
  const usuarios = [{ nome: "Thalis", senha: "thalis", id: "jgshdsfdjy" }];
  localStorage.setItem("usuarios", JSON.stringify(usuarios));//salva meu login automatico
}

function login(e) {
  e.preventDefault(); //função para submit nao recarregar a pagina automatico

  const usuarios = JSON.parse(localStorage.getItem("usuarios")); //puxei os usuarios do localstorage
  const nomeEncontrado = usuarios.map((el) => el.nome).includes(usuario.value); //verifiquei o nome do usuario se tem no vetor, se tiver retorna TRUE

  if (nomeEncontrado) {
    //se TRUE
    let senhaEncontrada = usuarios.map((el) => el.senha).includes(senha.value); //checa senha, se acertar retorna TRUE

    if (senhaEncontrada) {
      //se TRUE
      const usuarioParaLogin = usuarios.find((el) => el.nome === usuario.value); //cata o usuario dentro do vetor
      localStorage.setItem("usuarioLogado", usuarioParaLogin.id); //e manda o id do usuario pro localstorage
      window.location.href = "paginaPrincipal.html"; //libera acesso pra proxima pagina
    } else {
      alert("Senha incorreta ou usuario não encontrado");
    }
  } else {
    alert("usuario nao encontrado");
  }
}

function criarConta(e) {
  e.preventDefault();
  window.location.href = "criarConta.html";
}

const usuario = document.querySelector("#nomeUsuario"); //puxando meu input de usuario
const senha = document.querySelector("#senha"); //puxando input de senha
document.querySelector("#entrar").addEventListener("click", login);
document.querySelector("#criarConta").addEventListener("click", criarConta);



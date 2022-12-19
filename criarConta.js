function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function checkUserUnico() {
  let spamUser = document.querySelector("#spamUser")
  let spamUserP = document.querySelector("#spamUserP")
    if (usuario.value === "") {
      usuario.setAttribute("style", "border: 3px solid #DDB940");
      senha.setAttribute("disabled", "true");
      confirmSenha.setAttribute("disabled", "true");
    } else if (usuarios.some((el) => el.nome === usuario.value)) {
      usuario.setAttribute("style", "border: 4px solid red");
      spamUserP.remove()
      spamUser.innerHTML = `<div class="alert alert-danger mb-1 mt-1 p-0 pe-1 ps-1 m-0" id="spamUserD" role="alert">
      Nome inválido.
    </div>`
      setTimeout(() => {
        document.querySelector(".alert").remove()
        spamUser.innerHTML =`<p id="spamUserP" class="m-0">Mínimo 6 caracteres.</p>`
      }, 4000);
    }else if(usuario.value.length < 6){
      usuario.setAttribute("style", "border: 4px solid red");
      spamUserP.remove()
      spamUser.innerHTML = `<div class="alert alert-danger mb-1 mt-1 p-0 pe-1 ps-1 m-0" id="spamUserD" role="alert">
      Nome inválido.
    </div>`
      setTimeout(() => {
        document.querySelector(".alert").remove()
        spamUser.innerHTML =`<p id="spamUserP" class="m-0">Mínimo 6 caracteres.</p>`
      }, 4000);
    } else {
      usuario.setAttribute("style", "border: 2px solid #32A428");
      senha.removeAttribute("disabled");
      spamUserP.remove()
      spamUser.innerHTML = `<p id="spamUserP" class="m-0">&nbsp</p>`
      document.querySelector("#spamSen").innerText="Mínimo 6 caracteres.";
    }
  }
  
  function fazLog() {
    window.location.href = "index.html";
  }

function validarSenha(){
    if (senha.value === "") {
        senha.setAttribute("style", "border: 3px solid #DDB940");
        confirmSenha.setAttribute("disabled", "true");
    }
    else if (senha.value.length >0 && senha.value.length <= 5) {
        senha.setAttribute("style", "border: 4px solid red");
    }else{
      senha.setAttribute("style", "border: 2px solid #32A428");
      confirmSenha.removeAttribute("disabled");
      document.querySelector("#spamSen").innerHTML="&nbsp";
    }
}

function validarConfirm(){
  if (confirmSenha.value === senha.value){
    confirmSenha.setAttribute("style", "border: 2px solid #32A428")
    criaUsuario.setAttribute("style", "cursor: pointer")
    criaUsuario.removeAttribute("disabled")
  }else if(confirmSenha.value === ""){
    confirmSenha.setAttribute("style", "border: 3px solid #DDB940");
  }else{
    confirmSenha.setAttribute("style", "border: 4px solid red");
  }
}

function criarLog(e){
  e.preventDefault()
  id = makeId(10)
  const usuarios = JSON.parse(localStorage.getItem("usuarios"))
  const newUser = {nome:`${usuario.value}`, senha:`${confirmSenha.value}`, id:`${id}`}
  usuarios.push(newUser)
  localStorage.setItem("usuarios",JSON.stringify(usuarios))
    window.location.href="index.html"
}

const usuario = document.getElementById("CriaNomeUsuario");
const senha = document.querySelector("#CriaSenha");
const confirmSenha = document.querySelector("#ConfSenha");
const criaUsuario = document.querySelector("#CriarLogin");

const usuarios = JSON.parse(localStorage.getItem("usuarios"));


usuario.addEventListener("blur", checkUserUnico);
senha.addEventListener("blur",validarSenha)
confirmSenha.addEventListener("blur",validarConfirm)
criaUsuario.addEventListener("click", criarLog)


document.querySelector("#lougin").addEventListener("click", fazLog);

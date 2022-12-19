let lembretes = [];
const descricao = document.querySelector("#descricao");
const detalhamento = document.querySelector("#detalhamento");
const btnSalvar = document.querySelector("#btnSalvar");
const btnSair = document.querySelector("#Sair");
const tabela = document.querySelector("#tabela");

if (localStorage.getItem("usuarioLogado") === null) {
  window.location.href = "index.html";
}

if (
  localStorage.getItem("recados") === null ||
  JSON.parse(localStorage.getItem("recados")) === []
) {
} else {
  const idUser = localStorage.getItem("usuarioLogado");
  const recados = JSON.parse(localStorage.getItem("recados"));
  recados
    .filter((el) => el.idUser === idUser)
    .forEach((el) => {
      modalExcluir(`${el.idRecado}`)
      tabela.innerHTML += `<tr id="recado${el.idRecado}" >
      <th>
          <div class="accordion" id="recados${el.idRecado}">
            <div class="accordion-item">
              <h2 class="accordion-header" id="h2${el.idRecado}">
                <button class="accordion-button pointer" type="button" data-bs-toggle="collapse" data-bs-target="#${el.idRecado}" aria-expanded="true" aria-controls="${el.idRecado}">
                  ${el.descricao} 
                </button>
              </h2>
              <div id="${el.idRecado}" class="accordion-collapse collapse" aria-labelledby="h2${el.idRecado}">
                <div class="accordion-body">
                  <small> ${el.detalhamento} <small/>
                </div>
                <hr class="mt-0 mb-0">
                <div  class="accordion-body">
                  <button class="btn btn-warning">Editar</button>
                  <button onclick="" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal${el.idRecado}">Deletar</button>
                </div>
              </div>
            </div>
          </div>
      </th>
    </tr>`;
    });
}

function salvar() {
  const idRecado = makeId(15);
  const idUser = localStorage.getItem("usuarioLogado");
  const novoLembrete = {
    descricao: `${descricao.value}`,
    detalhamento: `${detalhamento.value}`,
    idUser: `${idUser}`,
    idRecado: `${idRecado}`,
  };
  console.log(novoLembrete);
  if (descricao.value === "" || detalhamento.value === "") {
    function popovers () {
      ('[data-toggle="popover"]').popover()
    }
    popovers();
  } else if (localStorage.getItem("recados") === null) {
    lembretes.push(novoLembrete);
    localStorage.setItem("recados", JSON.stringify(lembretes));
    tabela.innerHTML += `<tr id="recado${idRecado}">
    <th>
        <div class="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="h2${idRecado}">
              <button class="accordion-button pointer" type="button" data-bs-toggle="collapse" data-bs-target="#${idRecado}" aria-expanded="true" aria-controls="${idRecado}">
                ${descricao.value}
              </button>
            </h2>
            <div id="${idRecado}" class="accordion-collapse collapse" aria-labelledby="h2${idRecado}">
              <div class="accordion-body">
              <small>  ${detalhamento.value} <small/>
              </div>
              <hr class="mt-0  mb-0">
              <div class="accordion-body">
              <button class="btn btn-warning ">Editar</button>
              <button onclick="" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal${idRecado}">Deletar</button>
              </div>
            </div>
          </div>
        </div>
    </th>
  </tr>`;
    descricao.value = "";
    detalhamento.value = "";
  } else if (localStorage.getItem("recados") != null) {
    lembretes = JSON.parse(localStorage.getItem("recados"));
    lembretes.push(novoLembrete);
    localStorage.setItem("recados", JSON.stringify(lembretes));
    tabela.innerHTML += `<tr  id="recado${idRecado}">
    <th>
        <div class="accordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="h2${idRecado}">
              <button class="accordion-button pointer" type="button" data-bs-toggle="collapse" data-bs-target="#${idRecado}" aria-expanded="true" aria-controls="${idRecado}">
                ${descricao.value}
              </button>
            </h2>
            <div id="${idRecado}" class="accordion-collapse collapse" aria-labelledby="h2${idRecado}">
            <div class="accordion-body">
            <small>  ${detalhamento.value} <small/>
            </div>
            <hr class="mt-0 mb-0">
            <div class="accordion-body">
            <button class="btn btn-warning">Editar</button>
            <button onclick="" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal${idRecado}">Deletar</button>
            </div>
            </div>
          </div>
        </div>
    </th>
  </tr>`;
    descricao.value = "";
    detalhamento.value = "";
  }
}

function sair() {
  localStorage.removeItem("usuarioLogado");
  if (localStorage.getItem("usuarioLogado") === null) {
    window.location.href = "index.html";
  }
}

function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function modalExcluir(idRecado){
  document.querySelector(".modais").innerHTML += `
  <div class="modal fade" id="modal${idRecado}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Deletar lembrete?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        Caso delete o lembrete, não será possivel recuperá-lo!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button onclick="excluir('recado${idRecado}', '${idRecado}')" type="button" class="btn btn-danger" data-bs-dismiss="modal">Confirmar</button>
      </div>
    </div>
  </div>
</div>`
}



function excluir(idTrRecado, idRecado) {
  document.getElementById(idTrRecado).remove()
  const lembrete = JSON.parse(localStorage.getItem("recados"));
  lembretes = lembrete.filter((el) => el.idRecado != idRecado);
  console.log(lembretes);
  localStorage.setItem("recados", JSON.stringify(lembretes));
  document.querySelector(`#modal${idRecado}`).remove()
}

function editar(idRecado) {
  descricao.setAttribute("style", "border: solid 3px red;");
  detalhamento.setAttribute("style", "border: solid 3px red;");
  const tr = document.getElementById(`${idRecado}`);
  const lembrete = JSON.parse(localStorage.getItem("recados"));
  lembretes = lembrete.find((el) => el.idRecado === idRecado);
  descricao.value = lembretes.descricao;
  detalhamento.value = lembretes.detalhamento;

  tr.remove();
  lembretes = lembrete.filter((el) => el.idRecado != idRecado);
  localStorage.setItem("recados", JSON.stringify(lembretes));
  setTimeout(() => {
    descricao.removeAttribute("style");
    detalhamento.removeAttribute("style");
  }, 2000);
}

btnSalvar.addEventListener("click", salvar);
/* btnSair.addEventListener("click", sair); */

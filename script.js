let isFirst = true;
let ajax;

let adicionar = () => {
  if (isFirst) {
    let newPersonEl = document.querySelector(".newPerson");
    for (let i = 0; i < 2; i++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.setAttribute("onblur", "cadastraAjax()");
      let nomeCampo;
      nomeCampo = i === 0 ? "nome" : "cpf";
      input.setAttribute("id", nomeCampo);
      td.appendChild(input);
      newPersonEl.appendChild(td);
    }
    let td = document.createElement("td");
    let excluir = document.createElement("td");
    td.appendChild(excluir);
    td.innerHTML = "Excluir";
    newPersonEl.appendChild(td);
    isFirst = false;
  }
};

let cadastraAjax = () => {
  const campo0 = document.getElementById("nome");
  const campo1 = document.getElementById("cpf");
  if (campo0.value != "" && campo1.value != "") {
    resultadoEl = document.getElementById("resultado");

    name = campo0.value;
    cpf = campo1.value;

    // Criando a URL para envio
    let link = "insert.php?nome=" + name + "&cpf=" + cpf;

    // Instanciando o objeto XMLHttpRequest
    ajax = new XMLHttpRequest();
    // informando a função de callback
    ajax.onreadystatechange = myCallback;
    // configurar request
    // true assíncrono
    ajax.open("GET", link, true);
    ajax.send();
    load();
    isFirst = true;
  }
};
let myCallback = () => {
  // verificando se a resposta está pronta
  if (ajax.status === 200 && ajax.readyState === 4) {
    //recuperando o resultado
    let resultado = ajax.responseText;
    // transformando para objeto js

    alert("Cliente Cadastrado!");
  }
};

let load = () => {
  var searchString = "select.php";
  objAjax = new XMLHttpRequest();
  objAjax.onreadystatechange = fnResponse;
  objAjax.open("GET", searchString, true);
  objAjax.send();
};

function fnResponse() {
  if (objAjax.readyState === 4 && objAjax.status === 200) {
    // get json from the server
    var json = JSON.parse(objAjax.responseText);
    var table = document.querySelector(".newPerson");
    table.innerHTML = "";
    for (var key in json) {
      createRow(table, json[key]);
    }
  }
}

function createRow(table, json) {
  // Creating table row with the data base id
  var tr = document.createElement("tr");
  tr.setAttribute("onclick", "fnUpdate(" + json.id + ")");
  tr.setAttribute("id", json.id);

  // Creating table columns
  var tdName = document.createElement("td");
  var tdCpf = document.createElement("td");
  var tdDelete = document.createElement("td");

  // adding data in the columns
  tdName.innerText = json.nome;
  tdCpf.innerText = json.cpf;

  // adding the delete image to the column
  var imgDelete = document.createElement("img");
  imgDelete.setAttribute("src", "img/delete.png");
  imgDelete.setAttribute("width", "25");
  imgDelete.setAttribute("onclick", "fnDelete(" + json.id + ");");
  tdDelete.appendChild(imgDelete);

  // adding the columns in the row
  tr.appendChild(tdName);
  tr.appendChild(tdCpf);
  tr.appendChild(tdDelete);

  // adding the row in the table
  table.appendChild(tr);
}

load();

function fnDelete(id) {
  objAjax = new XMLHttpRequest();
  objAjax.onreadystatechange = deleteCallback;
  objAjax.open("GET", "delete.php?id=" + id, true);
  objAjax.send();
}

function deleteCallback() {
  if (objAjax.readyState === 4 && objAjax.status === 200) {
    var json = JSON.parse(objAjax.responseText);
    // If returns true of the server then remove table row
    if (json.result === "true") {
      //gets the table row
      var tr = document.getElementById(json.id);
      // get table row parent
      var trParent = tr.parentNode;
      // remove table row
      trParent.removeChild(tr);
    }
  }
}

function fnUpdate(id) {
  const row = document.getElementById(id);
  for (let i = 0; i < 2; i++) {
    row.children[i].innerHTML = "";

    let td = row.children[i];

    let input = document.createElement("input");
    input.setAttribute("onblur", "editarAjax(" + id + ")");

    let nomeCampo;

    nomeCampo = i === 0 ? "nome" : "cpf";
    input.setAttribute("id", nomeCampo);

    td.appendChild(input);
  }
  console.log(row);
}

let editarAjax = id => {
  const campo0 = document.getElementById("nome");
  const campo1 = document.getElementById("cpf");
  if (campo0.value != "" && campo1.value != "") {
    resultadoEl = document.getElementById("resultado");

    name = campo0.value;
    cpf = campo1.value;

    // Criando a URL para envio
    let link = "editar.php?nome=" + name + "&cpf=" + cpf + "&id=" + id;

    // Instanciando o objeto XMLHttpRequest
    ajax = new XMLHttpRequest();
    // informando a função de callback
    ajax.onreadystatechange = myCallbackEditar;
    // configurar request
    // true assíncrono
    ajax.open("GET", link, true);
    ajax.send();
    load();
    isFirst = true;
  }
};

let myCallbackEditar = () => {
  // verificando se a resposta está pronta
  if (ajax.status === 200 && ajax.readyState === 4) {
    //recuperando o resultado
    let resultado = ajax.responseText;
    // transformando para objeto js

    alert("Cliente Editado!");
  }
};

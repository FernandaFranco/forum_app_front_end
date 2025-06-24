/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/topicos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.topicos.forEach(topico => insertList(topico.titulo, topico.texto, topico.username))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um topico na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postTopico = async (inputTitulo, inputTexto, inputUsername) => {
  const formData = new FormData();
  formData.append('titulo', inputTitulo);
  formData.append('texto', inputTexto);
  formData.append('username', inputUsername);

  let url = 'http://127.0.0.1:5000/topico';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada topico da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um topico da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const tituloTopico = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteTopico(tituloTopico)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um topico da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteTopico = (titulo) => {
  console.log(titulo)
  let url = 'http://127.0.0.1:5000/topico?titulo=' + titulo;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo topico com titulo, texto e username 
  --------------------------------------------------------------------------------------
*/
const newTopico = () => {
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputTexto = document.getElementById("newTexto").value;
  let inputUsername = document.getElementById("newUsername").value;

  if (inputTitulo === '') {
    alert("Escreva o titulo de um topico!");
  } else if (inputTexto === '' || inputUsername === '') {
    alert("Texto e username são necessários!");
  } else {
    insertList(inputTitulo, inputTexto, inputUsername)
    postTopico(inputTitulo, inputTexto, inputUsername)
    alert("Topico adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir topicos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (titulo, texto, username) => {
  var topico = [titulo, texto, username]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < topico.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = topico[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newTitulo").value = "";
  document.getElementById("newTexto").value = "";
  document.getElementById("newUsername").value = "";

  removeElement()
}
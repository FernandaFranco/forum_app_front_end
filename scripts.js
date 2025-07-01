/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = () => {
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
    .then((response) => {
        if (response.ok) {
            insertList(inputTitulo, inputTexto, inputUsername)
            alert("item adicionado com sucesso!")
        }
        console.log(response)
        return response.json()
    })
    .then((data) => {
        console.log(data)
        // alert(data.mesage)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um topico da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeTopico = () => {
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
  Função para mostrar formulário de preenchimento de tópico
  --------------------------------------------------------------------------------------
*/
const showForm = () => {
  document.getElementById("topicoForm").hidden = false;

  document.getElementById("newTopicoBtn").hidden = true;
  document.getElementById("topicosList").hidden = true;
  document.getElementById("topico").hidden = true;

}

/*
  --------------------------------------------------------------------------------------
  Função para mostrar a lista de tópicos
  --------------------------------------------------------------------------------------
*/
const showTopicos = () => {
  document.getElementById("topicosList").hidden = false;

  document.getElementById("newTopicoBtn").hidden = false;
  document.getElementById("topicoForm").hidden = true;
  document.getElementById("topico").hidden = true;

}


/*
  --------------------------------------------------------------------------------------
  Função para obter o topico existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getTopico = (titulo, username) => {
  let url = 'http://127.0.0.1:5000/topico?titulo=' + titulo + '&username=' + username;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        insertTopico(data.titulo, data.texto, data.username)
    })
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
    postTopico(inputTitulo, inputTexto, inputUsername)

    showTopicos()
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir topicos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (titulo, texto, username) => {
  let newDiv = document.createElement('div');
  newDiv.className = "topico d-flex text-muted pt-3";
  newDiv.addEventListener("click", () => {
    getTopico(titulo, username);
  });
                
  let svgHtmlString = "<svg class='bd-placeholder-img flex-shrink-0 me-2 rounded' width='32' height='32' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Placeholder: 32x32' preserveAspectRatio='xMidYMid slice' focusable='false'><title>Placeholder</title><rect width='100%' height='100%' fill='#007bff'></rect><text x='50%' y='50%' fill='#007bff' dy='.3em'>32x32</text></svg>"
  newDiv.insertAdjacentHTML('afterbegin', svgHtmlString);

  let newP = document.createElement('p');
  newP.className = "pb-3 mb-0 small lh-sm border-bottom";

  let newStrong = document.createElement('strong');
  newStrong.className = "d-block text-gray-dark";

  let newSmall = document.createElement('small');
  newSmall.className = "d-block mt-3";

  const newTituloContent = document.createTextNode(titulo);
  const newUsernameContent = document.createTextNode(username);

  newStrong.appendChild(newTituloContent);
  newSmall.appendChild(newUsernameContent);

  newP.appendChild(newStrong);
  newP.appendChild(newSmall);
  newDiv.appendChild(newP);

  // add the newly created element and its content into the DOM
  const topicosRecentes = document.getElementById('topicosRecentes');
  const lista = document.getElementById('topicosList');
  // adicionar ao topo da lista
  lista.insertBefore(newDiv, topicosRecentes.nextSibling);

  document.getElementById("newTitulo").value = "";
  document.getElementById("newTexto").value = "";
  document.getElementById("newUsername").value = "";

//   removeTopico()
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir um topico na visualizacao individual 
  --------------------------------------------------------------------------------------
*/
const insertTopico = (titulo, texto, username) => {
    
    document.getElementById("titulo").innerHTML = titulo;
    document.getElementById("texto").innerHTML = texto;
    document.getElementById("username").innerHTML = username;

    document.getElementById("topico").hidden = false;
    document.getElementById("newTopicoBtn").hidden = true;
    document.getElementById("topicosList").hidden = true;
    document.getElementById("topicoForm").hidden = true;
}
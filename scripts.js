/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = () => {
  let url = "http://127.0.0.1:5000/topicos";
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      data.topicos.forEach((topico) =>
        insertList(topico.titulo, topico.username)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList();

/*
  --------------------------------------------------------------------------------------
  Função para colocar um topico na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postTopico = async (inputTitulo, inputTexto, inputUsername) => {
  const formData = new FormData();
  formData.append("titulo", inputTitulo);
  formData.append("texto", inputTexto);
  formData.append("username", inputUsername);

  let url = "http://127.0.0.1:5000/topico";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        insertList(inputTitulo, inputUsername);
        showAlerta("Item adicionado com sucesso!");
      }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        showForm();
        showAlerta(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/*
  --------------------------------------------------------------------------------------
  Função para colocar um comentário na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postComentario = async (topico_id, inputTexto, inputUsername) => {
  const formData = new FormData();
  formData.append("topico_id", topico_id);
  formData.append("texto", inputTexto);
  formData.append("username", inputUsername);

  let url = "http://127.0.0.1:5000/comentario";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // insertListaComentarios(inputTexto, inputUsername)
        showAlerta("Comentário adicionado com sucesso!");
      }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        showAlerta(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/*
  --------------------------------------------------------------------------------------
  Toggle Alertas
  --------------------------------------------------------------------------------------
*/
const showAlerta = (mensagem) => {
  alertaDiv = document.getElementById("alerta");
  alertaDiv.hidden = false;
  alertaDiv.firstElementChild.innerHTML = mensagem;
};

const closeAlerta = () => {
  alertaDiv = document.getElementById("alerta");
  alertaDiv.hidden = true;
};

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
  document.getElementById("alerta").hidden = true;
};

/*
  --------------------------------------------------------------------------------------
  Função para mostrar formulário de preenchimento de tópico
  --------------------------------------------------------------------------------------
*/
const showComentarioForm = () => {
  document.getElementById("topico").hidden = false;
  document.getElementById("comentarioForm").hidden = false;

  document.getElementById("newComentarioBtn").hidden = true;
  document.getElementById("newTopicoBtn").hidden = true;
  document.getElementById("topicosList").hidden = true;
  document.getElementById("alerta").hidden = true;
};

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
  document.getElementById("comentarioForm").hidden = true;
  document.getElementById("alerta").hidden = true;
};

/*
  --------------------------------------------------------------------------------------
  Função para mostrar um único tópico
  --------------------------------------------------------------------------------------
*/
const showTopico = () => {
  document.getElementById("topico").hidden = false;
  document.getElementById("newComentarioBtn").hidden = false;

  document.getElementById("topicosList").hidden = true;
  document.getElementById("newTopicoBtn").hidden = true;
  document.getElementById("topicoForm").hidden = true;
  document.getElementById("comentarioForm").hidden = true;
  document.getElementById("alerta").hidden = true;
};

/*
  --------------------------------------------------------------------------------------
  Função para obter o topico existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getTopico = (titulo) => {
  let url = "http://127.0.0.1:5000/topico?titulo=" + titulo;
  fetch(url, {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      insertTopico(data.id, data.titulo, data.texto, data.username);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo topico com titulo, texto e username 
  --------------------------------------------------------------------------------------
*/
const newTopico = () => {
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputTexto = document.getElementById("newTexto").value;
  let inputUsername = document.getElementById("newUsername").value;

  if (inputTitulo === "") {
    showAlerta("Escreva o título de um tópico!");
  } else if (inputTexto === "" || inputUsername === "") {
    showAlerta("Texto e username são necessários!");
  } else {
    postTopico(inputTitulo, inputTexto, inputUsername);

    showTopicos();
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo comentario com texto e username 
  --------------------------------------------------------------------------------------
*/
const newComentario = () => {
  let topico_id = document.getElementById("topico").dataset.id;
  let inputTexto = document.getElementById("newComentarioTexto").value;
  let inputUsername = document.getElementById("newComentarioUsername").value;

  if (inputTexto === "" || inputUsername === "") {
    showAlerta("Texto e username são necessários!");
  } else {
    postComentario(topico_id, inputTexto, inputUsername);

    showTopico();
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para inserir topicos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (titulo, username) => {
  let newDiv = document.createElement("div");
  newDiv.className = "topico d-flex text-muted pt-3";
  newDiv.addEventListener("click", () => {
    getTopico(titulo);
  });

  let svgHtmlString =
    "<svg class='bd-placeholder-img flex-shrink-0 me-2 rounded' width='32' height='32' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Placeholder: 32x32' preserveAspectRatio='xMidYMid slice' focusable='false'><title>Placeholder</title><rect width='100%' height='100%' fill='#007bff'></rect><text x='50%' y='50%' fill='#007bff' dy='.3em'>32x32</text></svg>";
  newDiv.insertAdjacentHTML("afterbegin", svgHtmlString);

  let newP = document.createElement("p");
  newP.className = "pb-3 mb-0 small lh-sm border-bottom";

  let newStrong = document.createElement("strong");
  newStrong.className = "d-block text-gray-dark";

  let newSmall = document.createElement("small");
  newSmall.className = "d-block mt-3";

  const newTituloContent = document.createTextNode(titulo);
  const newUsernameContent = document.createTextNode(username);

  newStrong.appendChild(newTituloContent);
  newSmall.appendChild(newUsernameContent);

  newP.appendChild(newStrong);
  newP.appendChild(newSmall);
  newDiv.appendChild(newP);

  // add the newly created element and its content into the DOM
  const topicosRecentes = document.getElementById("topicosRecentes");
  const lista = document.getElementById("topicosList");
  // adicionar ao topo da lista
  lista.insertBefore(newDiv, topicosRecentes.nextSibling);

  document.getElementById("newTitulo").value = "";
  document.getElementById("newTexto").value = "";
  document.getElementById("newUsername").value = "";

  //   removeTopico()
};

/*
  --------------------------------------------------------------------------------------
  Função para inserir um topico na visualizacao individual 
  --------------------------------------------------------------------------------------
*/
const insertTopico = (id, titulo, texto, username) => {
  document.getElementById("topico").dataset.id = id;
  document.getElementById("titulo").innerHTML = titulo;
  document.getElementById("username").innerHTML = username;
  document.getElementById("texto").innerHTML = texto;

  showTopico();
};

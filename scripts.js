/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente de tópicos do servidor via requisição GET
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
        insertList(topico.titulo, topico.username, topico.total_comentarios)
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
        insertComentarioLista(inputTexto, inputUsername);

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
  // atualiza contagem de comentarios

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
      insertTopico(
        data.id,
        data.titulo,
        data.texto,
        data.username,
        data.comentarios
      );
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

    document.getElementById("newComentarioBtn").hidden = false;
    document.getElementById("comentarioForm").hidden = true;
    document.getElementById("secao-comentarios").hidden = false;
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para inserir comentário no tópico apresentado
  --------------------------------------------------------------------------------------
*/
const insertComentarioLista = (texto, username) => {
  const string = `<div class="card mb-4">
                  <div class="card-body">
                    <p>${texto}</p>

                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                          />
                        </svg>
                        <p class="small mb-0 ms-2">${username}</p>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                      </div>
                    </div>
                  </div>
                </div>
`;

  const listaComentarios = document.getElementById("lista-comentarios");
  // adicionar ao topo da lista
  listaComentarios.insertAdjacentHTML("afterbegin", string);

  // atualiza contagem de comentarios
  document.getElementById("total-comentarios").innerHTML = `${
    document.getElementById("lista-comentarios").childElementCount
  } comentários`;

  document.getElementById("newComentarioTexto").value = "";
  document.getElementById("newComentarioUsername").value = "";
};

/*
  --------------------------------------------------------------------------------------
  Função para inserir topicos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (titulo, username, total_comentarios = 0) => {
  const newDiv = construirDOMTopico(titulo, username, total_comentarios);

  const topicosRecentes = document.getElementById("topicosRecentes");
  // adicionar ao topo da lista
  topicosRecentes.insertAdjacentElement("afterend", newDiv);

  document.getElementById("newTitulo").value = "";
  document.getElementById("newTexto").value = "";
  document.getElementById("newUsername").value = "";
};

const construirDOMTopico = (titulo, username, total_comentarios) => {
  let newDiv = document.createElement("div");
  newDiv.className = "topico d-flex text-muted pt-3 border-bottom";
  newDiv.addEventListener("click", () => {
    getTopico(titulo);
  });

  let TopicoSvgHtmlString = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="rgb(0, 128, 157)" class="bi bi-postcard-fill bd-placeholder-img flex-shrink-0 me-2 rounded" viewBox="0 0 16 16">
  <path d="M11 8h2V6h-2z"/>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zM2 5.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5M2.5 7a.5.5 0 0 0 0 1H6a.5.5 0 0 0 0-1zM2 9.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5m8-4v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5"/>
</svg>`;
  // "<svg class='bd-placeholder-img flex-shrink-0 me-2 rounded' width='32' height='32' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Placeholder: 32x32' preserveAspectRatio='xMidYMid slice' focusable='false'><title>Placeholder</title><rect width='100%' height='100%' fill='#007bff'></rect><text x='50%' y='50%' fill='#007bff' dy='.3em'>32x32</text></svg>";
  newDiv.insertAdjacentHTML("afterbegin", TopicoSvgHtmlString);

  let newTituloUsernameP = document.createElement("p");
  newTituloUsernameP.className = "pb-3 mb-0 flex-grow-1";

  let newStrong = document.createElement("strong");
  newStrong.className = "d-block text-gray-dark";

  let newSmall = document.createElement("small");
  newSmall.className = "d-block mt-3";
  let usernameWrapperDiv = document.createElement("div");
  usernameWrapperDiv.className = "d-inline px-1";

  let UsernameSvgHtmlString =
    "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'> <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' /> <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1' /> </svg>";
  newSmall.insertAdjacentHTML("afterbegin", UsernameSvgHtmlString);

  const newTituloContent = document.createTextNode(titulo);
  const newUsernameContent = document.createTextNode(username);

  newStrong.appendChild(newTituloContent);
  usernameWrapperDiv.appendChild(newUsernameContent);
  newSmall.appendChild(usernameWrapperDiv);

  newTituloUsernameP.appendChild(newStrong);
  newTituloUsernameP.appendChild(newSmall);
  newDiv.appendChild(newTituloUsernameP);

  let ComentarioSvgHtmlString = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-chat-fill"
    viewBox="0 0 16 16"
  >
    //{" "}
    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"></path>
    //{" "}
  </svg>
  `;

  let newTotalComentariosP = document.createElement("p");
  newTotalComentariosP.className = "pb-3 mb-0 lh-sm";
  const newTotalComentariosContent = document.createTextNode(total_comentarios);
  newTotalComentariosP.appendChild(newTotalComentariosContent);
  newTotalComentariosP.insertAdjacentHTML("beforeend", ComentarioSvgHtmlString);
  newDiv.appendChild(newTotalComentariosP);

  return newDiv;
};

/*
  --------------------------------------------------------------------------------------
  Função para inserir um topico na visualizacao individual 
  --------------------------------------------------------------------------------------
*/
const insertTopico = (id, titulo, texto, username, comentarios) => {
  document.getElementById("topico").dataset.id = id;
  document.getElementById("titulo").innerHTML = titulo;
  document.getElementById("username").innerHTML = username;
  document.getElementById("texto").innerHTML = texto;

  showTopico();
  popularComentariosDatabase(comentarios);
};

const popularComentariosDatabase = (comentarios) => {
  // Garante que a lista esteja limpa antes de popular comentarios existentes
  document.getElementById("lista-comentarios").innerHTML = "";

  if (comentarios.length === 0) {
    document.getElementById("total-comentarios").innerHTML = "0 comentários";
    document.getElementById("secao-comentarios").hidden = true;
  } else {
    comentarios.forEach((comentario) => {
      insertComentarioLista(comentario.texto, comentario.username);
    });
    console.log(comentarios.length);
    document.getElementById(
      "total-comentarios"
    ).innerHTML = `${comentarios.length} comentários`;
    document.getElementById("secao-comentarios").hidden = false;
  }
};

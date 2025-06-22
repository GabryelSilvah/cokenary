export { byIdReceitas, listarReceitas, byIdAllInfor, cadastrarReceitas, alterarReceitas, deletarReceitas };
import nuxtStorage from 'nuxt-storage';
import Cookies from 'js-cookie';


const URL_BASE_API = "http://localhost:8081/receitas";


const authorization = Cookies.get("token_auth");


//Listar
async function listarReceitas() {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}


//Buscar pelo ID
async function byIdReceitas(id_receita) {
  const { data: responseAPI, error: errorAPI } = await $fetch(URL_BASE_API + "/byId/" + id_receita, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Buscar informações detalhadas
async function byIdAllInfor(id_receita) {

  const { data: responseAPI, error: errorAPI } = await $fetch(URL_BASE_API + "/byIdAllInfor/" + id_receita, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Cadastrar
async function cadastrarReceitas(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarReceitas(id_receita, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_receita, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    },
    body: JSON.stringify(corpo_request)
  });


  return responseAPI;
}



//Deletar
async function deletarReceitas(id_receita) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_receita, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}
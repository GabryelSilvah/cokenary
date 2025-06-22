export { listarUser, byIdUser, cadastrarUser, alterarUser, deletarUser };
import Cookies from 'js-cookie';
const authorization = Cookies.get("token_auth");


const URL_BASE_API = "http://localhost:8081/user";



/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarUser() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Buscar pelo ID
async function byIdUser(id_user) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_user, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Cadastrar
async function cadastrarUser(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: {
        "Content-Type": "appliuserion/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarUser(id_user, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_user, {
    method: "PUT",
    headers: {
      "Content-Type": "appliuserion/json",
      "Authorization": 'Bearer ' + authorization
    },
    body: JSON.stringify(corpo_request)
  });;

  return responseAPI;
}

//Deletar
async function deletarUser(id_user) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_user, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}
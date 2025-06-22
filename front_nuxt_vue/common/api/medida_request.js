export { listarMedidas, byIdMedidas, cadastrarMedida, alterarMedida, deletarMedida };
import Cookies from 'js-cookie';
const authorization = Cookies.get("token_auth");


const URL_BASE_API = "http://localhost:8081/receitas/medida";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarMedidas() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Buscar pelo ID
async function byIdMedidas(id_med) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_med,{
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Cadastrar
async function cadastrarMedida(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: {
        "Content-Type": "applimedion/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarMedida(id_med, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_med, {
    method: "PUT",
    headers: {
      "Content-Type": "applimedion/json",
      "Authorization": 'Bearer ' + authorization
    },
    body: JSON.stringify(corpo_request)
  });

  return responseAPI;
}

//Deletar
async function deletarMedida(id_med) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_med, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}
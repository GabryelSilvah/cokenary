export { listarAvaliacao, byIdAvaliacao, byIdDegustador, listReceitasNaoAvaliadas, cadastrarAvaliacao, alterarAvaliacao, deletarAvaliacao };
import Cookies from 'js-cookie';
const authorization = Cookies.get("token_auth");



const URL_BASE_API = "http://localhost:8081/avaliacao";

function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + authorization
  }
}


/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarAvaliacao() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar", {
    headers: headers()
  });

  return responseAPI;
}

async function listReceitasNaoAvaliadas(id_avaliador) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar-nao-avaliadas/" + id_avaliador, {
    headers: headers()
  });

  if (errorAPI.value) {
    return errorAPI;
  }

  return responseAPI;
}



//Buscar pelo ID
async function byIdAvaliacao(id_avaliacao) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_avaliacao, {
    headers: headers()
  });

  return responseAPI;
}


async function byIdDegustador(id_degustador) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byDegustador/" + id_degustador, {
    headers: headers()
  });

  return responseAPI;
}



//Cadastrar
async function cadastrarAvaliacao(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(corpo_request)
    });

  if (errorAPI.value) {
    return errorAPI;
  }

  return responseAPI;
}

//Alterar
async function alterarAvaliacao(id_avaliacao, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_avaliacao, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(corpo_request)
  });

  if (errorAPI.value) {
    return errorAPI;
  }

  return responseAPI;
}

//Deletar
async function deletarAvaliacao(id_avaliacao) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_avaliacao, {
    method: "DELETE",
    headers: headers()
  });

  return responseAPI;
}
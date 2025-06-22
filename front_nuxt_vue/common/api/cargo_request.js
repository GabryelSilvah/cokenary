export { listarCargos, byIdCargos, cadastrarCargos, alterarCargos, deletarCargos };
import Cookies from 'js-cookie';
const authorization = Cookies.get("token_auth");


const URL_BASE_API = "http://localhost:8081/cargos";

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
async function listarCargos() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar", {
    headers: headers()
  });

  return responseAPI;
}

//Buscar pelo ID
async function byIdCargos(id_cargo) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_cargo, {
    headers: headers()
  });

  return responseAPI;
}

//Cadastrar
async function cadastrarCargos(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarCargos(id_cargo, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_cargo, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(corpo_request)
  });;

  return responseAPI;
}

//Deletar
async function deletarCargos(id_cargo) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_cargo, {
    headers: headers()
  });

  return responseAPI;
}
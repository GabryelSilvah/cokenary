export { listarFuncionarios, byIdFuncionarios, byNomeCargoFuncionarios, cadastrarFuncionarios, alterarFuncionarios, deletarFuncionarios };
import Cookies from 'js-cookie';
const authorization = Cookies.get("token_auth");



const URL_BASE_API = "http://localhost:8081/funcionarios";


/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarFuncionarios() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Buscar pelo ID
async function byIdFuncionarios(id_func) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_func, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Buscar pelo nome do cargo
async function byNomeCargoFuncionarios(id_nome_cargo) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byCargo/" + id_nome_cargo, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    }
  });

  return responseAPI;
}

//Cadastrar
async function cadastrarFuncionarios(corpo_request) {
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
async function alterarFuncionarios(id_func, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_func, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + authorization
    },
    body: JSON.stringify(corpo_request)
  });;

  return responseAPI;
}

//Deletar
async function deletarFuncionarios(id_func) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_func,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      }
    }
  );

  return responseAPI;
}
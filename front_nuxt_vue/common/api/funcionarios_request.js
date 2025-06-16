export { listarFuncionarios, byIdFuncionarios, cadastrarFuncionarios, alterarFuncionarios, deletarFuncionarios };

const URL_BASE_API = "http://localhost:8081/funcionarios";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarFuncionarios() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar");

  return responseAPI;
}

//Buscar pelo ID
async function byIdFuncionarios(id_func) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_func);

  return responseAPI;
}

//Cadastrar
async function cadastrarFuncionarios(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: { "Content-Type": "applifuncion/json" },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarFuncionarios(id_func, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_func, {
    method: "PUT",
    headers: { "Content-Type": "applifuncion/json" },
    body: JSON.stringify(corpo_request)
  });;

  return responseAPI;
}

//Deletar
async function deletarFuncionarios(id_func) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_func);

  return responseAPI;
}
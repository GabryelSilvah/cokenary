export { listarCargos, byIdCargos, cadastrarCargos, alterarCargos, deletarCargos };

const URL_BASE_API = "http://localhost:8081/cargos";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarCargos() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar");

  return responseAPI;
}

//Buscar pelo ID
async function byIdCargos(id_cargo) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_cargo);

  return responseAPI;
}

//Cadastrar
async function cadastrarCargos(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: { "Content-Type": "applicargoion/json" },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarCargos(id_cargo, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_cargo, {
    method: "PUT",
    headers: { "Content-Type": "applicargoion/json" },
    body: JSON.stringify(corpo_request)
  });;

  return responseAPI;
}

//Deletar
async function deletarCargos(id_cargo) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_cargo);

  return responseAPI;
}
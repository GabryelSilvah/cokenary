export { listarAvaliacao, byIdAvaliacao, byIdDegustador, cadastrarAvaliacao, alterarAvaliacao, deletarAvaliacao };

const URL_BASE_API = "http://localhost:8081/avaliacao";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarAvaliacao() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar");

  return responseAPI;
}


//Buscar pelo ID
async function byIdAvaliacao(id_avaliacao) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_avaliacao);

  return responseAPI;
}


async function byIdDegustador(id_degustador) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byDegustador/" + id_degustador);

  return responseAPI;
}



//Cadastrar
async function cadastrarAvaliacao(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarAvaliacao(id_avaliacao, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_avaliacao, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo_request)
  });

  return responseAPI;
}

//Deletar
async function deletarAvaliacao(id_avaliacao) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_avaliacao, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  return responseAPI;
}
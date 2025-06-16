export { listarReceitas, byIdReceitas, byIdAllInfor, cadastrarReceitas, alterarReceitas, deletarReceitas };

const URL_BASE_API = "http://localhost:8081/receitas";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarReceitas() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar");

  return responseAPI;
}

//Buscar pelo ID
async function byIdReceitas(id_receita) {
}

//Buscar informações detalhadas
async function byIdAllInfor(id_receita) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byIdAllInfor/" + id_receita);

  return responseAPI;
}

//Cadastrar
async function cadastrarReceitas(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: { "Content-Type": "applireceitaion/json" },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarReceitas(id_receita, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_receita, {
    method: "PUT",
    headers: { "Content-Type": "applireceitaion/json" },
    body: JSON.stringify(corpo_request)
  });

  return responseAPI;
}

//Deletar
async function deletarReceitas(id_receita) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_receita, {
    method: "DELETE",
    headers: { "Content-Type": "applireceitaion/json" }
  });

  return responseAPI;
}
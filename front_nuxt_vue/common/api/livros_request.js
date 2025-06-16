export { listarLivros, byIdLivros, byIdAllInfor, cadastrarLivros, alterarLivros, deletarLivros };

const URL_BASE_API = "http://localhost:8081/livros";

/*
*Não altere, adicione ou retire nada da estrutura, 
*código ou quaisquer outra coisa desse arquivo sem permissão
*/

//Listar
async function listarLivros() {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/listar");

  return responseAPI;
}

//Buscar pelo ID
//Buscar pelo ID
async function byIdLivros(id_livro) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byId/" + id_livro);

  return responseAPI;
}

//Buscar informações detalhadas
async function byIdAllInfor(id_livro) {

  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/byIdAllInfor/" + id_livro);

  return responseAPI;
}

//Cadastrar
async function cadastrarLivros(corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/cadastrar",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo_request)
    });

  return responseAPI;
}

//Alterar
async function alterarLivros(id_livro, corpo_request) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/alterar/" + id_livro, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo_request)
  });

  return responseAPI;
}

//Deletar
async function deletarLivros(id_livro) {
  const { data: responseAPI, error: errorAPI } = await useFetch(URL_BASE_API + "/excluir/" + id_livro, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  return responseAPI;
}
//Request de receitas (recebendo lista de receitas)
export { receitasListar, receitaById, receitaCadastrar, receitaAlterar, receitaDeletar };

//Endereço padrão da API (Spring Boot)
const URL_BASE_API = "http://localhost:8081";


//Listar todos
async function receitasListar() {
    const {
        data: responseAPI,
        error: errosReceitas
    } = await useFetch(URL_BASE_API + "/receitas/listar");

    return responseAPI;
}


// Buscar por ID
async function receitaById(id_receita) {
    const {
        data: responseAPI,
        error: errosReceitas
    } = await useFetch(URL_BASE_API + "/receitas/byId/" + id_receita);

    return responseAPI;
}


//Cadastrar
async function receitaCadastrar(corpo_request) {
    const {
        data: responseAPI,
        error: errosReceitas
    } =
        await useFetch(URL_BASE_API + "/receitas/cadastrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Atualizar
async function receitaAlterar(id_receita, corpo_request) {
    const { data: responseAPI, error: errosReceitas } =
        await useFetch(URL_BASE_API + "/receitas/alterar/" + id_receita, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Deletar
async function receitaDeletar(id_receita) {
    const { data: responseAPI, error: errosReceitas } =
        await useFetch(URL_BASE_API + "/receitas/excluir/" + id_receita, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        });

    return responseAPI;
}
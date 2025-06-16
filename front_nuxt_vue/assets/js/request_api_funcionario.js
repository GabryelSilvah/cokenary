//Request de receitas (recebendo lista de receitas)
export { funcionarioListar, funcionarioById, funcionarioCadastrar, funcionarioAlterar, funcionarioDeletar };

//Endereço padrão da API (Spring Boot)
const URL_BASE_API = "http://localhost:8081";


//Listar todos
async function funcionarioListar() {
    const {
        data: responseAPI,
        error: errosFuncionario
    } = await useFetch(URL_BASE_API + "/funcionarios/listar");

    return responseAPI;
}


// Buscar por ID
async function funcionarioById(id_funcionario) {
    const {
        data: responseAPI,
        error: errosFuncionario
    } = await useFetch(URL_BASE_API + "/funcionarios/byId/" + id_funcionario);

    return responseAPI;
}


//Cadastrar
async function funcionarioCadastrar(corpo_request) {
    const {
        data: responseAPI,
        error: errosFuncionario
    } =
        await useFetch(URL_BASE_API + "/funcionarios/cadastrar", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Atualizar
async function funcionarioAlterar(id_funcionario, corpo_request) {
    const { data: responseAPI, error: errosFuncionario } =
        await useFetch(URL_BASE_API + "/funcionarios/alterar/" + id_funcionario, {
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(corpo_request)
        });

    return responseAPI;
}


// Deletar
async function funcionarioDeletar(id_funcionario) {
    const { data: responseAPI, error: errosFuncionario } =
        await useFetch(URL_BASE_API + "/funcionarios/excluir/" + id_funcionario, {
            headers: { "Content-Type": "application/json" },
            method: "DELETE"
        });

    return responseAPI;
}
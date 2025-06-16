//Request de receitas (recebendo lista de receitas)
const {
    data: listasReceitas, //armazenando lista de receitas vindo da API (back-end)
    error: errosReceitas //Capturando erros da requisição
} = await useFetch(URL_BASE_API + "/receitas/listar");

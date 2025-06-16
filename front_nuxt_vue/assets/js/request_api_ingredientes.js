//Request de receitas (recebendo lista de receitas)
export { ingredientesListar, ingredientesById, ingredientesCadastrar, ingredientesAlterar, ingredientesDeletar };

//Endereço padrão da API (Spring Boot)
const URL_BASE_API = "http://localhost:8081";

// Função auxiliar para tratamento de erros
const handleApiError = (error) => {
  console.error('API Error:', error);
  throw new Error(error.value?.message || 'Erro na comunicação com o servidor');
};

//Listar todos
async function ingredientesListar() {
    try {
      const { data: responseAPI, error: errosIngredientes } = 
        await useFetch(URL_BASE_API + "/ingredientes/listar");
      
      if (errosIngredientes.value) {
        throw errosIngredientes.value;
      }
      
      // Adicione este log para verificar a estrutura
      console.log('Dados recebidos:', responseAPI.value);
      
      return {
        data: responseAPI.value.data, // ou responseAPI.value se a estrutura for diferente
        status: responseAPI.status
      };
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

// Buscar por ID
async function ingredientesById(id_ingredientes) {
  try {
    const { data: responseAPI, error: errosIngredientes } = 
      await useFetch(URL_BASE_API + "/ingredientes/byId/" + id_ingredientes);
    
    if (errosIngredientes.value) {
      throw errosIngredientes.value;
    }
    
    return responseAPI.value.data;
  } catch (error) {
    handleApiError(error);
  }
}

//Cadastrar
async function ingredientesCadastrar(corpo_request) {
  try {
    const { data: responseAPI, error: errosIngredientes } =
      await useFetch(URL_BASE_API + "/ingredientes/cadastrar", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(corpo_request)
      });
    
    if (errosIngredientes.value) {
      throw errosIngredientes.value;
    }
    
    return responseAPI.value.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Atualizar
async function ingredientesAlterar(id_ingredientes, corpo_request) {
  try {
    const { data: responseAPI, error: errosIngredientes } =
      await useFetch(URL_BASE_API + "/ingredientes/alterar/" + id_ingredientes, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(corpo_request)
      });
    
    if (errosIngredientes.value) {
      throw errosIngredientes.value;
    }
    
    return responseAPI.value.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Deletar
async function ingredientesDeletar(id_ingredientes) {
  try {
    const { data: responseAPI, error: errosIngredientes } =
      await useFetch(URL_BASE_API + "/ingredientes/excluir/" + id_ingredientes, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE"
      });
    
    if (errosIngredientes.value) {
      throw errosIngredientes.value;
    }
    
    return responseAPI.value.data;
  } catch (error) {
    handleApiError(error);
  }
}
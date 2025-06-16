const URL_BASE_API = "http://localhost:8081/receitas/categoria";

/**
 * Lista todas as categorias
 * @returns {Promise<Array|null>} Lista de categorias ou null em caso de erro
 */
export async function categoriaListar() {
  try {
    const { data, error } = await useFetch(URL_BASE_API + "/listar");
    
    if (error.value) {
      console.error("Erro ao listar categorias:", error.value);
      return null;
    }

    // Debug: exibe a estrutura completa da resposta
    console.log("[DEBUG] Resposta completa da API:", data.value);

    // Tenta diferentes formas de acessar os dados
    const categorias = data.value?.data || data.value?.result || data.value || null;
    
    if (!categorias) {
      console.warn("A resposta da API não contém dados de categorias");
      return null;
    }

    return categorias;
  } catch (err) {
    console.error("Erro inesperado ao listar categorias:", err);
    return null;
  }
}

/**
 * Obtém uma categoria pelo ID
 * @param {number} id_cat - ID da categoria
 * @returns {Promise<Object|null>} Objeto da categoria ou null se não encontrado
 */
export async function categoriaById(id_cat) {
  if (!id_cat) {
    console.error("ID da categoria é obrigatório");
    return null;
  }

  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/byId/${id_cat}`);
    
    if (error.value) {
      console.error(`Erro ao buscar categoria ID ${id_cat}:`, error.value);
      return null;
    }

    const categoria = data.value?.data || data.value;
    
    if (!categoria || !categoria.nome_categoria) {
      console.warn(`Categoria com ID ${id_cat} não encontrada ou sem nome`);
      return null;
    }

    return categoria;
  } catch (err) {
    console.error(`Erro inesperado ao buscar categoria ID ${id_cat}:`, err);
    return null;
  }
}

/**
 * Cadastra uma nova categoria
 * @param {Object} corpo_request - Deve conter { nome_categoria: string }
 * @returns {Promise<Object|null>} Dados da categoria criada ou null em caso de erro
 */
export async function categoriaCadastrar(corpo_request) {
  if (!corpo_request?.nome_categoria) {
    console.error("O campo 'nome_categoria' é obrigatório");
    return null;
  }

  try {
    const { data, error } = await useFetch(URL_BASE_API + "/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo_request),
    });

    if (error.value) {
      console.error("Erro ao cadastrar categoria:", error.value);
      return null;
    }

    const resultado = data.value?.data || data.value;
    
    if (!resultado) {
      console.warn("Resposta da API vazia ao cadastrar categoria");
      return null;
    }

    return resultado;
  } catch (err) {
    console.error("Erro inesperado ao cadastrar categoria:", err);
    return null;
  }
}

/**
 * Atualiza uma categoria existente
 * @param {number} id_cat - ID da categoria a ser atualizada
 * @param {Object} corpo_request - Deve conter { nome_categoria: string }
 * @returns {Promise<Object|null>} Dados atualizados ou null em caso de erro
 */
export async function categoriaAlterar(id_cat, corpo_request) {
  if (!id_cat || !corpo_request?.nome_categoria) {
    console.error("ID da categoria e 'nome_categoria' são obrigatórios");
    return null;
  }

  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/alterar/${id_cat}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo_request),
    });

    if (error.value) {
      console.error(`Erro ao alterar categoria ID ${id_cat}:`, error.value);
      return null;
    }

    const resultado = data.value?.data || data.value;
    return resultado || null;
  } catch (err) {
    console.error(`Erro inesperado ao alterar categoria ID ${id_cat}:`, err);
    return null;
  }
}

/**
 * Remove uma categoria
 * @param {number} id_cat - ID da categoria a ser removida
 * @returns {Promise<boolean>} True se removido com sucesso, false caso contrário
 */
export async function categoriaDeletar(id_cat) {
  if (!id_cat) {
    console.error("ID da categoria é obrigatório");
    return false;
  }

  try {
    const { error } = await useFetch(`${URL_BASE_API}/excluir/${id_cat}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (error.value) {
      console.error(`Erro ao deletar categoria ID ${id_cat}:`, error.value);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Erro inesperado ao deletar categoria ID ${id_cat}:`, err);
    return false;
  }
}
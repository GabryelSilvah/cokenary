import Cookies from 'js-cookie';

const URL_BASE_API = "http://localhost:8081/receitas/categoria";

// Recupera o token do cookie
function getAuthorization() {
  return Cookies.get('token_auth');
}

// Cria headers padrão para requisições autenticadas
function getAuthHeaders() {
  const token = getAuthorization();
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  };
}

/**
 * Lista todas as categorias
 */
export async function categoriaListar() {
  try {
    const token = getAuthorization();
    const res = await fetch(`${URL_BASE_API}/listar`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
    if (!res.ok) {
      console.error("Erro HTTP:", res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    console.log("Resposta da API listar:", data);
    return data.data || data;
  } catch (err) {
    console.error("Erro inesperado ao listar categorias:", err);
    return null;
  }
}


/**
 * Buscar categoria por ID
 */
export async function categoriaById(id_cat) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/byId/${id_cat}`, getAuthHeaders());

    if (error.value) throw error.value;

    return data.value?.data || null;
  } catch (err) {
    console.error(`Erro ao buscar categoria ID ${id_cat}:`, err);
    return null;
  }
}

/**
 * Cadastrar nova categoria
 */
export async function categoriaCadastrar(corpo_request) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/cadastrar`, {
      method: "POST",
      body: JSON.stringify(corpo_request),
      ...getAuthHeaders()
    });

    if (error.value) throw error.value;

    return data.value?.data || null;
  } catch (err) {
    console.error("Erro ao cadastrar categoria:", err);
    return null;
  }
}

/**
 * Alterar categoria existente
 */
export async function categoriaAlterar(id_cat, corpo_request) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/alterar/${id_cat}`, {
      method: "PUT",
      body: JSON.stringify(corpo_request),
      ...getAuthHeaders()
    });

    if (error.value) throw error.value;

    return data.value?.data || null;
  } catch (err) {
    console.error(`Erro ao alterar categoria ID ${id_cat}:`, err);
    return null;
  }
}

/**
 * Excluir categoria
 */
export async function categoriaDeletar(id_cat) {
  try {
    const { error } = await useFetch(`${URL_BASE_API}/excluir/${id_cat}`, {
      method: "DELETE",
      ...getAuthHeaders()
    });

    if (error.value) throw error.value;

    return true;
  } catch (err) {
    console.error(`Erro ao deletar categoria ID ${id_cat}:`, err);
    return false;
  }
}

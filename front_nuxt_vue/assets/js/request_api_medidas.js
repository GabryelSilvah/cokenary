import Cookies from "js-cookie";

const URL_BASE_API = "http://localhost:8081/receitas/medida";

// Função para obter token, tentando cookie primeiro e depois localStorage
function getAuthorization() {
  return Cookies.get('token_auth') || localStorage.getItem('token') || '';
}

// Função para criar headers com token e Content-Type
function getAuthHeaders() {
  const token = getAuthorization();
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
}

// Listar todas as medidas
export async function medidasListar() {
  try {
    const response = await fetch(`${URL_BASE_API}/listar`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao listar medidas:", error);
    throw error;
  }
}

// Buscar medida por ID
export async function medidasById(id_med) {
  try {
    const response = await fetch(`${URL_BASE_API}/byId/${id_med}`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao buscar medida com ID ${id_med}:`, error);
    return null;
  }
}

// Cadastrar nova medida
export async function medidasCadastrar(medida) {
  try {
    const response = await fetch(`${URL_BASE_API}/cadastrar`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(medida)
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar medida:", error);
    throw error;
  }
}

// Alterar medida existente
export async function medidasAlterar(id_med, medida) {
  try {
    const response = await fetch(`${URL_BASE_API}/alterar/${id_med}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(medida)
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao alterar medida com ID ${id_med}:`, error);
    return null;
  }
}

// Excluir medida
export async function medidasDeletar(id_med) {
  try {
    const response = await fetch(`${URL_BASE_API}/excluir/${id_med}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao excluir medida com ID ${id_med}:`, error);
    return null;
  }
}

import Cookies from 'js-cookie';

const URL_BASE_API = "http://localhost:8081";

function getAuthorization() {
  return Cookies.get('token_auth'); // Ou o nome do cookie onde seu token está armazenado
}

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Erro na requisição');
  }
  
  try {
    return await response.json();
  } catch (e) {
    return null; // Para casos onde a resposta é vazia (como em alguns DELETE)
  }
}

// Listar todos os cargos
async function cargoListar() {
  try {
    const authorization = getAuthorization();
    const response = await fetch(URL_BASE_API + "/cargos/listar", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dados recebidos da API:', data); // Adicione este log
    return data;
    
  } catch (error) {
    console.error("Erro ao listar cargos:", error.message);
    throw error;
  }
}

// Buscar por ID
async function cargoById(id_cargo) {
  try {
    const authorization = getAuthorization();
    const response = await fetch(URL_BASE_API + "/cargos/byId/" + id_cargo, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      }
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao buscar cargo ID ${id_cargo}:`, error.message);
    throw error;
  }
}

// Cadastrar novo cargo
async function cargoCadastrar(corpo_request) {
  try {
    const authorization = getAuthorization();
    const response = await fetch(URL_BASE_API + "/cargos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(corpo_request),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Erro ao cadastrar cargo:", error.message);
    throw error;
  }
}

// Atualizar cargo
async function cargoAlterar(id_cargo, corpo_request) {
  try {
    const authorization = getAuthorization();
    const response = await fetch(URL_BASE_API + "/cargos/alterar/" + id_cargo, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(corpo_request),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao alterar cargo ID ${id_cargo}:`, error.message);
    throw error;
  }
}

// Deletar cargo
async function cargoDeletar(id_cargo) {
  try {
    const authorization = getAuthorization();
    const response = await fetch(URL_BASE_API + "/cargos/excluir/" + id_cargo, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao deletar cargo ID ${id_cargo}:`, error.message);
    throw error;
  }
}

export {
  cargoListar,
  cargoById,
  cargoCadastrar,
  cargoAlterar,
  cargoDeletar,
};
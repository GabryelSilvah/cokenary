import Cookies from 'js-cookie';

const URL_BASE_API = "http://localhost:8081";

function getAuthHeaders() {
  const token = Cookies.get('token_auth');
  if (!token) {
    console.error('Token não encontrado');
    throw new Error('Autenticação necessária');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Erro HTTP: ${response.status}`);
  }
  return response.json();
}

// Listar ingredientes
export async function ingredientesListar() {
  try {
    const response = await fetch(`${URL_BASE_API}/ingredientes/listar`, {
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao listar ingredientes:', error);
    throw error;
  }
}

// Cadastrar ingrediente
export async function ingredientesCadastrar(dados) {
  try {
    const response = await fetch(`${URL_BASE_API}/ingredientes/cadastrar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(dados)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao cadastrar ingrediente:', error);
    throw error;
  }
}

// Atualizar ingrediente
export async function ingredientesAlterar(id, dados) {
  try {
    const response = await fetch(`${URL_BASE_API}/ingredientes/alterar/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(dados)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao atualizar ingrediente ${id}:`, error);
    throw error;
  }
}

// Deletar ingrediente
export async function ingredientesDeletar(id) {
  try {
    const response = await fetch(`${URL_BASE_API}/ingredientes/excluir/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Erro ao deletar ingrediente ${id}:`, error);
    throw error;
  }
}
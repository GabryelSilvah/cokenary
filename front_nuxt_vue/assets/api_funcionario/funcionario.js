import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8081/funcionarios';

// Função auxiliar para obter o token do cookie
function getAuthHeaders() {
  const token = Cookies.get('token_auth');
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
}

export async function funcionarioListar() {
  try {
    const response = await fetch(`${API_URL}/listar`, {
      headers: getAuthHeaders()
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    return [];
  }
}

export async function funcionarioCadastrar(funcionario) {
  try {
    const response = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(funcionario)
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error);
    return null;
  }
}

export async function funcionarioAlterar(id, funcionario) {
  try {
    const response = await fetch(`${API_URL}/alterar/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(funcionario)
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Erro ao alterar funcionário:', error);
    return null;
  }
}

export async function funcionarioDeletar(id) {
  try {
    const response = await fetch(`${API_URL}/excluir/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const json = await response.json();
    return json.status === 'CREATED';
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error);
    return false;
  }
}

export async function funcionarioPorId(id) {
  try {
    const response = await fetch(`${API_URL}/byId/${id}`, {
      headers: getAuthHeaders()
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Erro ao buscar funcionário por ID:', error);
    return null;
  }
}

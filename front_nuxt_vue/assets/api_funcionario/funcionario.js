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
    return json.data || json; // Adaptação para diferentes formatos de resposta
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    return [];
  }
}

export async function funcionarioCadastrar(funcionario) {
  try {
    // Estrutura do objeto conforme esperado pelo backend
    const payload = {
      nome: funcionario.nome,
      rg: funcionario.rg,
      dt_adm: funcionario.dt_adm,
      salario: funcionario.salario,
      cargo: funcionario.cargo,  // Já vem como objeto {id: x} do componente
      idRestaurante: funcionario.idRestaurante,
      nome_usuario: funcionario.nome_usuario,
      senha_usuarios: funcionario.senha_usuarios
    };

    const response = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao cadastrar funcionário');
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error);
    throw error;
  }
}

export async function funcionarioAlterar(id, funcionario) {
  try {
    const payload = {
      nome: funcionario.nome,
      rg: funcionario.rg,
      dt_adm: funcionario.dt_adm,
      salario: funcionario.salario,
      cargo: funcionario.cargo,
      idRestaurante: funcionario.idRestaurante
      // Não incluímos usuário/senha na alteração por padrão
    };

    const response = await fetch(`${API_URL}/alterar/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao alterar funcionário');
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error('Erro ao alterar funcionário:', error);
    throw error;
  }
}

export async function funcionarioDeletar(id) {
  try {
    const response = await fetch(`${API_URL}/excluir/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao excluir funcionário');
    }

    const json = await response.json();
    return json.status === 'CREATED' || json.success;
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error);
    throw error;
  }
}

export async function funcionarioPorId(id) {
  try {
    const response = await fetch(`${API_URL}/byId/${id}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao buscar funcionário');
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error('Erro ao buscar funcionário por ID:', error);
    throw error;
  }
}
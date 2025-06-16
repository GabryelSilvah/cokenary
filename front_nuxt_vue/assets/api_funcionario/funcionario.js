const API_URL = 'http://localhost:8081/funcionarios';

export async function funcionarioListar() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    const json = await response.json();
    return json.data; // retorna apenas o array de funcionários
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    return [];
  }
}

export async function funcionarioCadastrar(funcionario) {
  try {
    const response = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(funcionario)
    });
    const json = await response.json();
    return json.data; // retorna o funcionário cadastrado
  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error);
    return null;
  }
}

export async function funcionarioAlterar(id, funcionario) {
  try {
    const response = await fetch(`${API_URL}/alterar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
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
      method: 'DELETE'
    });
    const json = await response.json();
    return json.status === 'CREATED'; // true se deletou
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error);
    return false;
  }
}

export async function funcionarioPorId(id) {
  try {
    const response = await fetch(`${API_URL}/byId/${id}`);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Erro ao buscar funcionário por ID:', error);
    return null;
  }
}

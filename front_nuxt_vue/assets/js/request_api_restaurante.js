import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8081/restaurantes';

function getAuthorization() {
  return Cookies.get('token_auth'); // Nome do cookie onde o token JWT está armazenado
}

/**
 * Função para listar todos os restaurantes
 * @returns {Promise<Array>} Lista de restaurantes
 */
export const listarRestaurantes = async () => {
  const authorization = getAuthorization();

  try {
    const response = await fetch(`${API_BASE_URL}/listar`, {
      headers: {
        "Authorization": 'Bearer ' + authorization
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || 'Erro ao listar restaurantes');
    }
  } catch (error) {
    console.error('Erro ao listar restaurantes:', error);
    throw error;
  }
};

/**
 * Função para buscar um restaurante por ID
 * @param {number} id - ID do restaurante
 * @returns {Promise<Object>} Dados do restaurante
 */
export const buscarRestaurantePorId = async (id) => {
  const authorization = getAuthorization();

  try {
    const response = await fetch(`${API_BASE_URL}/byId/${id}`, {
      headers: {
        "Authorization": 'Bearer ' + authorization
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || 'Restaurante não encontrado');
    }
  } catch (error) {
    console.error(`Erro ao buscar restaurante com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Função para cadastrar um novo restaurante
 * @param {Object} restaurante - Dados do restaurante a ser cadastrado
 * @returns {Promise<Object>} Dados do restaurante cadastrado
 */
export const cadastrarRestaurante = async (restaurante) => {
  const authorization = getAuthorization();

  try {
    const response = await fetch(`${API_BASE_URL}/cadastrar`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(restaurante),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || 'Erro ao cadastrar restaurante');
    }
  } catch (error) {
    console.error('Erro ao cadastrar restaurante:', error);
    throw error;
  }
};

/**
 * Função para alterar um restaurante existente
 * @param {number} id - ID do restaurante a ser alterado
 * @param {Object} restaurante - Novos dados do restaurante
 * @returns {Promise<Object>} Dados do restaurante atualizado
 */
export const alterarRestaurante = async (id, restaurante) => {
  const authorization = getAuthorization();

  try {
    const response = await fetch(`${API_BASE_URL}/alterar/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + authorization
      },
      body: JSON.stringify(restaurante),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(data.message || 'Erro ao alterar restaurante');
    }
  } catch (error) {
    console.error(`Erro ao alterar restaurante com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Função para excluir um restaurante
 * @param {number} id - ID do restaurante a ser excluído
 * @returns {Promise<boolean>} True se a exclusão foi bem-sucedida
 */
export const excluirRestaurante = async (id) => {
  const authorization = getAuthorization();

  try {
    const response = await fetch(`${API_BASE_URL}/excluir/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": 'Bearer ' + authorization
      },
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return true;
    } else {
      throw new Error(data.message || 'Erro ao excluir restaurante');
    }
  } catch (error) {
    console.error(`Erro ao excluir restaurante com ID ${id}:`, error);
    throw error;
  }
};

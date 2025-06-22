// ~/assets/js/request_api_adm.js
import Cookies from 'js-cookie'; // Se estiver usando cookies

const baseUrl = 'http://localhost:8081';

// Função para montar os headers com token de autenticação
function getAuthHeaders() {
  // Tente pegar o token do localStorage ou dos Cookies
  const token = localStorage.getItem('token') || Cookies.get('token_auth');
  
  if (!token) {
    console.error('Token de autenticação não encontrado.');
    throw new Error('Autenticação necessária.');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
}

// Função principal que busca os números do painel com autenticação
export async function getPainelNumeros() {
  const endpoint = '/painel/listar_numeros';

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      // Se token inválido ou expirado
      if (response.status === 401) {
        // Remove token inválido
        localStorage.removeItem('token');
        Cookies.remove('token_auth');

        // Redireciona para login (opcional)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText} - ${errorData.message || 'Erro desconhecido'}`);
    }

    const result = await response.json();
    return result.data;

  } catch (error) {
    console.error('Ocorreu um erro ao buscar os números do painel:', error);
    throw error;
  }
}

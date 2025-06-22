// ~/assets/js/request_perfil.js

import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8081/perfil';

// Função para obter token
function getToken() {
  return localStorage.getItem('token') || Cookies.get('token_auth');
}

// Função para obter headers com autenticação
function getAuthHeaders() {
  const token = getToken();
  if (!token) {
    throw new Error('Token de autenticação não encontrado.');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
}

// Decodifica JWT (assumindo base64) e extrai ID do funcionário
function getLoggedUserId() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id_funcionario || payload.id || null;
  } catch (e) {
    console.error('Erro ao decodificar token:', e);
    return null;
  }
}

// Buscar perfil por ID
export async function getPerfilById(idFuncionario) {
  const res = await fetch(`${API_URL}/id_func/${idFuncionario}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error('Erro ao buscar perfil');

  const data = await res.json();
  return data.data;
}

// Atualizar perfil
export async function updatePerfil(idFuncionario, perfil) {
  const payload = {
    nome_usuario: perfil.nome_usuario,
    cargo_usuario: perfil.cargo_usuario,
    foto_usuario: perfil.foto_usuario || null
  };

  const res = await fetch(`${API_URL}/alterar/${idFuncionario}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error('Erro ao atualizar perfil');

  const json = await res.json();
  return json.data;
}

// 🔍 Nova função: obter perfil do usuário logado
export async function getPerfilLogado() {
  const id = getLoggedUserId();
  if (!id) throw new Error('ID do usuário logado não encontrado');
  return await getPerfilById(id);
}

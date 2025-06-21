const API_URL = 'http://localhost:8081/perfil';

export async function getPerfilById(idFuncionario) {
  const res = await fetch(`${API_URL}/id_func/${idFuncionario}`);
  const data = await res.json();
  return data.data;
}

export async function updatePerfil(idFuncionario, perfil) {
    const payload = {
      nome_usuario: perfil.nome_usuario,
      cargo_usuario: perfil.cargo_usuario,
      foto_usuario: perfil.foto_usuario || null
    };
  
    const res = await fetch(`http://localhost:8081/perfil/alterar/${idFuncionario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  
    const json = await res.json();
    return json.data;
  }

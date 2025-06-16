

const URL_BASE_API = "http://localhost:8081/receitas/medida";

// Listar todas as medidas
export async function medidasListar() {
    try {
      const { data, error } = await useFetch(`${URL_BASE_API}/listar`);
  
      if (error.value) throw error.value;
  
      // Compatível com retorno direto ou dentro de `data`
      return Array.isArray(data.value) ? data.value : data.value?.data || [];
    } catch (e) {
      console.error("Erro ao listar medidas:", e);
      return [];
    }
  }
  

// Buscar medida por ID
export async function medidasById(id_med) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/byId/${id_med}`);

    if (error.value) throw error.value;
    return data.value?.data || null;
  } catch (e) {
    console.error(`Erro ao buscar medida com ID ${id_med}:`, e);
    return null;
  }
}

// Cadastrar nova medida
export async function medidasCadastrar(medida) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/cadastrar`, {
      method: "POST",
      body: JSON.stringify(medida),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error.value) throw error.value;
    return data.value?.data;
  } catch (e) {
    console.error("Erro ao cadastrar medida:", e);
    return null;
  }
}

// Alterar medida existente
export async function medidasAlterar(id_med, medida) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/alterar/${id_med}`, {
      method: "PUT",
      body: JSON.stringify(medida),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error.value) throw error.value;
    return data.value?.data;
  } catch (e) {
    console.error(`Erro ao alterar medida com ID ${id_med}:`, e);
    return null;
  }
}

// Excluir medida
export async function medidasDeletar(id_med) {
  try {
    const { data, error } = await useFetch(`${URL_BASE_API}/excluir/${id_med}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (error.value) throw error.value;
    return data.value;
  } catch (e) {
    console.error(`Erro ao excluir medida com ID ${id_med}:`, e);
    return null;
  }
}

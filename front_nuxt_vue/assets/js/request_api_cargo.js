const URL_BASE_API = "http://localhost:8081";

// Listar todos os cargos
async function cargoListar() {
  try {
    const res = await fetch(URL_BASE_API + "/cargos/listar");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { error };
  }
}

// Buscar por ID
async function cargoById(id_cargo) {
  try {
    const res = await fetch(URL_BASE_API + "/cargos/byId/" + id_cargo);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { error };
  }
}

// Cadastrar novo cargo
async function cargoCadastrar(corpo_request) {
  try {
    const res = await fetch(URL_BASE_API + "/cargos/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo_request),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { error };
  }
}

// Atualizar cargo
async function cargoAlterar(id_cargo, corpo_request) {
  try {
    const res = await fetch(URL_BASE_API + "/cargos/alterar/" + id_cargo, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo_request),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { error };
  }
}

// Deletar cargo
async function cargoDeletar(id_cargo) {
  try {
    const res = await fetch(URL_BASE_API + "/cargos/excluir/" + id_cargo, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { error };
  }
}

export {
  cargoListar,
  cargoById,
  cargoCadastrar,
  cargoAlterar,
  cargoDeletar,
};

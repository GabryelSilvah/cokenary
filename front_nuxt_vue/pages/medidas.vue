<template>
  <Menu />

  <main>
    <section v-if="role_usuario == 'administrador'">
      <div class="medidas-container">
        <div class="header-section">
          <h1>Lista de Medidas</h1>
          <div class="search-add-container">
            <div class="search-bar">
              <i class="fas fa-search"></i>
              <input type="text" v-model="searchQuery" placeholder="Pesquisar medidas..." @input="filterMedidas" />
            </div>
            <button class="add-button" @click="openAddModal">
              <i class="fas fa-plus"></i> Adicionar Medida
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <div v-if="loading" class="loading">Carregando medidas...</div>

          <table v-if="!loading && filteredMedidas.length > 0" class="medidas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome da Medida</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="medida in filteredMedidas" :key="medida.id_med">
                <td>{{ medida.id_med }}</td>
                <td>{{ medida.nome_med }}</td>
                <td class="actions-cell">
                  <button class="edit-btn" @click="editMedida(medida)">
                    <i class="fas fa-edit"></i> Editar
                  </button>
                  <button class="delete-btn" @click="confirmDelete(medida)">
                    <i class="fas fa-trash"></i> Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="!loading && filteredMedidas.length === 0" class="no-results">
            Nenhuma medida encontrada
          </div>
        </div>

        <!-- Modal para adicionar/editar medida -->
        <div v-if="showAddModal" class="modal-overlay">
          <div class="modal-content">
            <h2>{{ editingMedida ? "Editar Medida" : "Adicionar Medida" }}</h2>
            <input type="text" v-model="currentMedida.nome_med" placeholder="Nome da Medida"
              @keyup.enter="saveMedida" />
            <div class="modal-actions">
              <button @click="saveMedida" :disabled="!currentMedida.nome_med.trim()">
                Salvar
              </button>
              <button @click="closeModal">Cancelar</button>
            </div>
          </div>
        </div>

        <!-- Modal para confirmar exclusão -->
        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal-content">
            <h3>Confirmar Exclusão</h3>
            <p>Deseja realmente excluir a medida "{{ medidaToDelete.nome_med }}"?</p>
            <div class="modal-actions">
              <button @click="deleteMedida">Excluir</button>
              <button @click="closeModal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Mensagem de bloqueio do usuário -->
    <div v-else class="mensagem_acesso">
      Seu nível de acesso não é compatível com essa funcionalidade...
    </div>
  </main>
</template>

<script>
import {
  medidasListar,
  medidasCadastrar,
  medidasAlterar,
  medidasDeletar,
} from '~/assets/js/request_api_medidas.js';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      medidas: [],
      filteredMedidas: [],
      searchQuery: '',
      showAddModal: false,
      showConfirmModal: false,
      editingMedida: false,
      currentMedida: {
        id_med: null,
        nome_med: '',
      },
      medidaToDelete: {},
      loading: false,
      role_usuario: Cookies.get("cargo_user")
    };
  },
  mounted() {
    this.carregarMedidas();
  },
  methods: {
    async carregarMedidas() {
      try {
        const resultado = await medidasListar();
        console.log('Dados recebidos:', resultado);

        if (Array.isArray(resultado)) {
          this.medidas = resultado;
        } else if (resultado && Array.isArray(resultado.data)) {
          this.medidas = resultado.data;
        } else {
          this.medidas = [];
        }

        this.filteredMedidas = [...this.medidas];
      } catch (error) {
        console.error("Erro ao carregar medidas:", error);
      }
    }
    ,
    filterMedidas() {
      if (!this.searchQuery) {
        this.filteredMedidas = [...this.medidas];
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredMedidas = this.medidas.filter((medida) => {
        const nome = medida.nome_med ? medida.nome_med.toLowerCase() : "";
        const id = medida.id_med ? medida.id_med.toString() : "";
        return nome.includes(query) || id.includes(query);
      });
    },
    openAddModal() {
      this.currentMedida = { id_med: null, nome_med: "" };
      this.editingMedida = false;
      this.showAddModal = true;
    },
    editMedida(medida) {
      this.currentMedida = { ...medida };
      this.editingMedida = true;
      this.showAddModal = true;
    },
    async saveMedida() {
      if (!this.currentMedida.nome_med.trim()) return;

      try {
        if (this.editingMedida) {
          await medidasAlterar(this.currentMedida.id_med, this.currentMedida);
        } else {
          await medidasCadastrar(this.currentMedida);
        }
        await this.carregarMedidas();
        this.filterMedidas();
        this.closeModal();
      } catch (e) {
        console.error("Erro ao salvar medida:", e);
      }
    },
    confirmDelete(medida) {
      this.medidaToDelete = { ...medida };
      this.showConfirmModal = true;
    },
    async deleteMedida() {
      try {
        await medidasDeletar(this.medidaToDelete.id_med);
        await this.carregarMedidas();
        this.filterMedidas();
        this.closeModal();
      } catch (e) {
        console.error("Erro ao excluir medida:", e);
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentMedida = { id_med: null, nome_med: "" };
      this.editingMedida = false;
      this.medidaToDelete = {};
    },
  },
};
</script>

<style scoped>
@import url("~/assets/css/medida.css");
@import url("~/assets/css/acesso_role.css");

.search-add-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
}

.search-bar {
  flex-grow: 1;
  position: relative;
  max-width: 400px;
}

.search-bar i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-bar input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-bar input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #333;
  font-weight: bold;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Modal content */
.modal-content {
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.modal-content input[type="text"] {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.modal-actions button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.modal-actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal-actions button:first-child {
  background-color: #4a90e2;
  color: white;
}

.modal-actions button:first-child:hover:not(:disabled) {
  background-color: #357ABD;
}

.modal-actions button:last-child {
  background-color: #eee;
}

.modal-actions button:last-child:hover {
  background-color: #ddd;
}

/* Ajuste para mobile */
@media (max-width: 768px) {
  .search-add-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    max-width: 100%;
    margin-bottom: 10px;
  }

  .add-button {
    width: 100%;
  }

  .modal-content {
    width: 95%;
  }
}
</style>

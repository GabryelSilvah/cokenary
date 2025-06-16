<template>
  <Menu />

  <div class="ingredientes-container">
    <div class="header-section">
      <h1>Lista de Ingredientes</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Adicionar Ingrediente
      </button>
    </div>

    <div v-if="loading" class="loading-message">Carregando ingredientes...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <div class="table-responsive" v-if="!loading && !error">
      <table class="ingredientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Ingrediente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingrediente in ingredientes" :key="ingrediente.id_ingred">
            <td>{{ ingrediente.id_ingred }}</td>
            <td>{{ ingrediente.nome }}</td>
            <td class="actions-cell">
              <button class="edit-btn" @click="editIngrediente(ingrediente)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="delete-btn" @click="confirmDelete(ingrediente)">
                <i class="fas fa-trash"></i> Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Adicionar/Editar -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ editingIngrediente ? 'Editar Ingrediente' : 'Adicionar Novo Ingrediente' }}</h2>
        <div class="form-group">
          <label>Nome do Ingrediente:</label>
          <input type="text" v-model="currentIngrediente.nome" placeholder="Digite o nome do ingrediente"
            class="modal-input" />
        </div>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveIngrediente" :disabled="saving">
            {{ saving ? 'Salvando...' : (editingIngrediente ? 'Salvar' : 'Adicionar') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal confirm-modal">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o ingrediente "{{ ingredienteToDelete.nome }}"?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
          <button class="delete-confirm-btn" @click="deleteIngrediente" :disabled="deleting">
            {{ deleting ? 'Excluindo...' : 'Confirmar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ingredientesListar, ingredientesCadastrar, ingredientesAlterar, ingredientesDeletar } from '~/assets/js/request_api_ingredientes.js';

export default {
  data() {
    return {
      ingredientes: [],
      showAddModal: false,
      showConfirmModal: false,
      editingIngrediente: false,
      currentIngrediente: {
        id_ingred: null,
        nome: '',
      },
      ingredienteToDelete: {},
      loading: false,
      saving: false,
      deleting: false,
      error: null
    }
  },
  async created() {
    await this.loadIngredientes();
  },
  methods: {
    async loadIngredientes() {
      try {
        this.loading = true;
        this.error = null;
        const response = await ingredientesListar();
        this.ingredientes = response.data || [];
      } catch (err) {
        this.error = err.message || 'Erro ao carregar ingredientes';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    editIngrediente(ingrediente) {
      this.currentIngrediente = { ...ingrediente };
      this.editingIngrediente = true;
      this.showAddModal = true;
    },
    async saveIngrediente() {
      if (!this.currentIngrediente.nome.trim()) {
        this.error = 'O nome do ingrediente é obrigatório';
        return;
      }

      try {
        this.saving = true;
        this.error = null;

        if (this.editingIngrediente) {
          // Atualizar ingrediente existente
          await ingredientesAlterar(this.currentIngrediente.id_ingred, {
            nome: this.currentIngrediente.nome
          });
        } else {
          // Criar novo ingrediente
          await ingredientesCadastrar({
            nome: this.currentIngrediente.nome
          });
        }

        // Recarregar a lista após salvar
        await this.loadIngredientes();
        this.closeModal();
      } catch (err) {
        this.error = err.message || 'Erro ao salvar ingrediente';
        console.error(err);
      } finally {
        this.saving = false;
      }
    },
    confirmDelete(ingrediente) {
      this.ingredienteToDelete = { ...ingrediente };
      this.showConfirmModal = true;
    },
    async deleteIngrediente() {
      try {
        this.deleting = true;
        this.error = null;
        
        await ingredientesDeletar(this.ingredienteToDelete.id_ingred);
        
        // Recarregar a lista após excluir
        await this.loadIngredientes();
        this.showConfirmModal = false;
      } catch (err) {
        this.error = err.message || 'Erro ao excluir ingrediente';
        console.error(err);
      } finally {
        this.deleting = false;
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentIngrediente = { id_ingred: null, nome: '' };
      this.editingIngrediente = false;
      this.error = null;
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/ingrediente.css");

.loading-message, .error-message {
  padding: 1rem;
  text-align: center;
  margin: 1rem 0;
}

.error-message {
  color: #ff4444;
  background-color: #ffebee;
  border-radius: 4px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
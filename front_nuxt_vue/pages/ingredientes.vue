<template>
  <Menu />

  <div class="ingredientes-container">
    <div class="header-section">
      <h1>Lista de Ingredientes</h1>
      <div class="search-add-container">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquisar ingredientes..."
            @input="filterIngredientes"
          />
        </div>
        <button class="add-button" @click="showAddModal = true">
          <i class="fas fa-plus"></i> Adicionar Ingrediente
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-message">
      <i class="fas fa-spinner fa-spin"></i> Carregando ingredientes...
    </div>
    <div v-else-if="error" class="error-message">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>
    <div v-else class="table-responsive">
      <table class="ingredientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Ingrediente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingrediente in filteredIngredientes" :key="ingrediente.id_ingred">
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
      <div v-if="filteredIngredientes.length === 0 && !loading" class="no-results">
        Nenhum ingrediente encontrado
      </div>
    </div>

    <!-- Modais mantidos iguais -->
  </div>
</template>

<script>
import { ingredientesListar, ingredientesCadastrar, ingredientesAlterar, ingredientesDeletar } from '~/assets/js/request_api_ingredientes.js';

export default {
  data() {
    return {
      ingredientes: [],
      filteredIngredientes: [],
      searchQuery: '',
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
        this.filteredIngredientes = [...this.ingredientes]; // Inicializa a lista filtrada
      } catch (err) {
        this.error = err.message || 'Erro ao carregar ingredientes';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    filterIngredientes() {
      if (!this.searchQuery) {
        this.filteredIngredientes = [...this.ingredientes];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredIngredientes = this.ingredientes.filter(ingrediente =>
        ingrediente.nome.toLowerCase().includes(query) ||
        ingrediente.id_ingred.toString().includes(query)
      );
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
          await ingredientesAlterar(this.currentIngrediente.id_ingred, {
            nome: this.currentIngrediente.nome
          });
        } else {
          await ingredientesCadastrar({
            nome: this.currentIngrediente.nome
          });
        }

        await this.loadIngredientes();
        this.filterIngredientes(); // Reaplica o filtro após salvar
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
        
        await this.loadIngredientes();
        this.filterIngredientes(); // Reaplica o filtro após excluir
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

/* Estilos para a barra de pesquisa */
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

.loading-message, .error-message {
  padding: 1rem;
  text-align: center;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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
}
</style>
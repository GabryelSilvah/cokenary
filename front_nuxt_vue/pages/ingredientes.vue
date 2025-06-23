<template>
  <Menu />
  <main>
    <section v-if="role_usuario == 'administrador'">
      <div class="container-crud">
        <div class="header-section">
          <h1>Lista de Ingredientes</h1>
          <input type="text" v-model="searchQuery" placeholder="Pesquisar ingredientes..."
            @input="filterIngredientes"  class="search-bar"/>
          <button class="add-button" @click="showAddModal = true">
            <i class="fas fa-plus"></i> Adicionar Ingrediente
          </button>
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
                <th>Editar</th>
                <th>Excluir</th>
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
                </td>
                <td>
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


        <!-- Modal de Adição/Edição -->
        <div v-if="showAddModal" class="modal-overlay">
          <div class="modal">
            <h2>{{ editingIngrediente ? 'Editar Ingrediente' : 'Adicionar Ingrediente' }}</h2>
            <div class="form-group">
              <label>Nome do Ingrediente:</label>
              <input type="text" v-model="currentIngrediente.nome" placeholder="Digite o nome do ingrediente"
                class="modal-input" />
            </div>
            <div v-if="error" class="error-message">{{ error }}</div>
            <div class="modal-buttons">
              <button class="cancel-btn" @click="closeModal">Cancelar</button>
              <button class="save-btn" @click="saveIngrediente" :disabled="saving">
                {{ saving ? 'Salvando...' : (editingIngrediente ? 'Salvar' : 'Adicionar') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Modal de Confirmação de Exclusão -->
        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal confirm-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o ingrediente "{{ ingredienteToDelete.nome }}"?</p>
            <div v-if="error" class="error-message">{{ error }}</div>
            <div class="modal-buttons">
              <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
              <button class="delete-confirm-btn" @click="deleteIngrediente" :disabled="deleting">
                {{ deleting ? 'Excluindo...' : 'Confirmar' }}
              </button>
            </div>
          </div>
        </div>
        <!-- Fim dos modais -->

      </div>
    </section>

    <!-- Mensagem de bloqueio do usuário -->
    <div v-else class="mensagem_acesso">
      Seu nível de acesso não é compatível com essa funcionalidade...
    </div>
  </main>
</template>

<style scoped>
@import url("~/assets/css/tabelas.css");
@import url("~/assets/css/acesso_role.css");
</style>

<script>
import { ingredientesListar, ingredientesCadastrar, ingredientesAlterar, ingredientesDeletar } from '~/assets/js/request_api_ingredientes.js';
import Cookies from 'js-cookie';


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
      error: null,
      role_usuario: Cookies.get("cargo_user")
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


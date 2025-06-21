<template>
  <main>
    <Menu />

    <div class="medidas-container">
      <div class="header-section">
        <h1>Lista de Medidas</h1>
        <div class="search-add-container">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Pesquisar medidas..."
              @input="filterMedidas"
            />
          </div>
          <button class="add-button" @click="showAddModal = true">
            <i class="fas fa-plus"></i> Adicionar Medida
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="medidas-table">
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
        <div v-if="filteredMedidas.length === 0" class="no-results">
          Nenhuma medida encontrada
        </div>
      </div>

      <!-- Modais mantidos iguais -->
    </div>
  </main>
</template>

<script>
import {
  medidasListar,
  medidasCadastrar,
  medidasAlterar,
  medidasDeletar
} from '~/assets/js/request_api_medidas.js';

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
        nome_med: ''
      },
      medidaToDelete: {}
    };
  },
  mounted() {
    this.carregarMedidas();
  },
  methods: {
    async carregarMedidas() {
      this.medidas = await medidasListar();
      this.filteredMedidas = [...this.medidas]; // Inicializa com todas as medidas
    },
    filterMedidas() {
      if (!this.searchQuery) {
        this.filteredMedidas = [...this.medidas];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredMedidas = this.medidas.filter(medida =>
        medida.nome_med.toLowerCase().includes(query) ||
        medida.id_med.toString().includes(query)
      );
    },
    editMedida(medida) {
      this.currentMedida = { ...medida };
      this.editingMedida = true;
      this.showAddModal = true;
    },
    async saveMedida() {
      if (!this.currentMedida.nome_med.trim()) return;

      if (this.editingMedida) {
        await medidasAlterar(this.currentMedida.id_med, this.currentMedida);
      } else {
        await medidasCadastrar(this.currentMedida);
      }

      this.closeModal();
      await this.carregarMedidas();
      this.filterMedidas(); // Reaplica o filtro após atualização
    },
    confirmDelete(medida) {
      this.medidaToDelete = { ...medida };
      this.showConfirmModal = true;
    },
    async deleteMedida() {
      await medidasDeletar(this.medidaToDelete.id_med);
      this.showConfirmModal = false;
      await this.carregarMedidas();
      this.filterMedidas(); // Reaplica o filtro após exclusão
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentMedida = { id_med: null, nome_med: '' };
      this.editingMedida = false;
    }
  }
};
</script>

<style scoped>
@import url("~/assets/css/medida.css");

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
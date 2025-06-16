<template>
  <main>
    <Menu />

    <div class="medidas-container">
      <div class="header-section">
        <h1>Lista de Medidas</h1>
        <button class="add-button" @click="showAddModal = true">
          <i class="fas fa-plus"></i> Adicionar Medida
        </button>
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
            <tr v-for="medida in medidas" :key="medida.id_med">
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
      </div>

      <!-- Modal de Adicionar/Editar -->
      <div v-if="showAddModal" class="modal-overlay">
        <div class="modal">
          <h2>{{ editingMedida ? 'Editar Medida' : 'Adicionar Nova Medida' }}</h2>
          <div class="form-group">
            <label>Nome da Medida:</label>
            <input type="text" v-model="currentMedida.nome_med" class="modal-input" required />
          </div>
          <div class="modal-buttons">
            <button class="cancel-btn" @click="closeModal">Cancelar</button>
            <button class="save-btn" @click="saveMedida">
              {{ editingMedida ? 'Salvar' : 'Adicionar' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Confirmação -->
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal confirm-modal">
          <h2>Confirmar Exclusão</h2>
          <p>Tem certeza que deseja excluir a medida "{{ medidaToDelete.nome_med }}"?</p>
          <div class="modal-buttons">
            <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
            <button class="delete-confirm-btn" @click="deleteMedida">Confirmar</button>
          </div>
        </div>
      </div>
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
    },
    confirmDelete(medida) {
      this.medidaToDelete = { ...medida };
      this.showConfirmModal = true;
    },
    async deleteMedida() {
      await medidasDeletar(this.medidaToDelete.id_med);
      this.showConfirmModal = false;
      await this.carregarMedidas();
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
</style>

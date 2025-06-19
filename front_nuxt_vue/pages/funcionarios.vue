<template>
  <main>
    <Menu />

    <div class="container">
      <h1>Funcionários</h1>
      <input type="text" v-model="search" placeholder="Buscar funcionário..." class="search-input" />

      <button @click="openAdd" class="add-button">
        Adicionar Funcionário
      </button>

      <table class="employee-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Salário</th>
            <th>RG</th>
            <th>Admissão</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in filteredFuncionarios" :key="f.id">
            <td>{{ f.nome }}</td>
            <td>R$ {{ f.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
            <td>{{ f.rg }}</td>
            <td>{{ formatDate(f.dt_adm) }}</td>
            <td>{{ f.cargo?.nome || f.cargo || 'N/A' }}</td>
            <td>
              <button @click="edit(f)" class="edit-button">Editar</button>
              <button @click="confirmDelete(f)" class="delete-button">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modais -->
      <div v-if="renderModals">
        <!-- Modal Adicionar/Editar -->
        <div v-if="showAddModal" class="modal-overlay">
          <div class="modal">
            <h2>{{ editing ? 'Editar Funcionário' : 'Adicionar Funcionário' }}</h2>

            <label>Nome:</label>
            <input v-model="current.nome" type="text" required />

            <label>Salário:</label>
            <input v-model="current.salario" type="number" step="0.01" required />

            <label>RG:</label>
            <input v-model="current.rg" type="number" required />

            <label>Data de Admissão:</label>
            <input v-model="current.dt_adm" type="date" required />

            <label>Cargo:</label>
            <select v-model="current.cargo_id" required>
              <option disabled value="">Selecione um cargo</option>
              <option v-for="cargo in cargos" :key="cargo.id_cargo" :value="cargo.id_cargo">
                {{ cargo.nome }}
              </option>
            </select>

            <div class="modal-actions">
              <button @click="save" class="save-button">Salvar</button>
              <button @click="closeModal" class="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>

        <!-- Modal de Confirmação -->
        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal">
            <h2>Confirmar Exclusão</h2>
            <p>Deseja realmente excluir o funcionário <strong>{{ current.nome }}</strong>?</p>
            <div class="modal-actions">
              <button @click="deleteNow" class="delete-button">Excluir</button>
              <button @click="closeModal" class="cancel-button">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  funcionarioListar,
  funcionarioCadastrar,
  funcionarioAlterar,
  funcionarioDeletar
} from '~/assets/api_funcionario/funcionario.js';

import { cargoListar } from '~/assets/js/request_api_cargo.js';

export default {
  data() {
    return {
      funcionarios: [],
      cargos: [],
      current: {
        id_func: null,
        nome: '',
        salario: 0,
        rg: null,
        dt_adm: '',
        cargo_id: ''
      },
      editing: false,
      showAddModal: false,
      showConfirmModal: false,
      search: '',
      renderModals: true
    };
  },
  computed: {
    filteredFuncionarios() {
      return this.funcionarios.filter(f =>
        f.nome.toLowerCase().includes(this.search.toLowerCase()) ||
        f.rg.toString().includes(this.search)
      );
    }
  },
  async created() {
    await this.fetchFuncionarios();
    await this.fetchCargos();
  },
  methods: {
    async fetchFuncionarios() {
      try {
        const response = await funcionarioListar();
        this.funcionarios = Array.isArray(response) ? response : [];
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        this.funcionarios = [];
      }
    },
    async fetchCargos() {
      try {
        const response = await cargoListar();
        const cargosArray = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Object.values(response)[0];

        this.cargos = Array.isArray(cargosArray)
          ? cargosArray.map(cargo => ({
            id_cargo: cargo.id_cargo || cargo.id,
            nome: cargo.nome
          }))
          : [];
      } catch (error) {
        console.error('Erro ao carregar cargos:', error);
        this.cargos = [];
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    },
    formatDateForAPI(dateString) {
      return new Date(dateString).toISOString().split('T')[0];
    },
    openAdd() {
      this.editing = false;
      this.resetCurrent();
      this.showAddModal = true;
    },
    edit(funcionario) {
      // 🔍 Encontrar o cargo correto pelo ID (funciona com id ou id_cargo)
      const cargoId = funcionario.cargo?.id || funcionario.cargo?.id_cargo || '';
      this.current = {
        id_func: funcionario.id_func || funcionario.id,
        nome: funcionario.nome,
        salario: funcionario.salario,
        rg: funcionario.rg,
        dt_adm: funcionario.dt_adm ? new Date(funcionario.dt_adm).toISOString().split('T')[0] : '',
        cargo_id: cargoId
      };

      this.editing = true;
      this.showAddModal = true;
    },
    validateForm() {
      const erros = [];

      if (!this.current.nome) erros.push('Nome é obrigatório!');
      if (!this.current.rg) erros.push('RG é obrigatório!');
      if (!this.current.dt_adm) erros.push('Data de admissão é obrigatória!');
      if (!this.current.cargo_id) erros.push('Selecione um cargo!');

      if (erros.length) {
        console.warn('Validação falhou:', erros.join(', '));
        return false;
      }

      return true;
    },
    async save() {
      try {
        if (!this.validateForm()) return;

        const funcionarioData = {
          nome: this.current.nome.trim(),
          salario: parseFloat(this.current.salario),
          rg: this.current.rg.toString(),
          dt_adm: this.formatDateForAPI(this.current.dt_adm),
          cargo: { id: parseInt(this.current.cargo_id) }
        };

        console.log('Dados do funcionário a serem salvos:', funcionarioData);

        if (this.editing) {
          await funcionarioAlterar(this.current.id_func, funcionarioData);
          console.log('Funcionário editado com sucesso!');
        } else {
          await funcionarioCadastrar(funcionarioData);
          console.log('Funcionário adicionado com sucesso!');
        }

        await this.fetchFuncionarios();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar:', error.response?.data || error.message);
      }
    }
    ,
    confirmDelete(funcionario) {
      this.current = {
        ...funcionario,
        id_func: funcionario.id_func || funcionario.id
      };
      this.showConfirmModal = true;
    },
    async deleteNow() {
      try {
        await funcionarioDeletar(this.current.id_func);
        await this.fetchFuncionarios();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.resetCurrent();
    },
    resetCurrent() {
      this.current = {
        id_func: null,
        nome: '',
        salario: 0,
        rg: null,
        dt_adm: '',
        cargo_id: ''
      };
    }
  }
};
</script>


<style scoped>
@import url("~/assets/css/funcionario.css");
</style>
<template>

  <Menu />

  <main>

    <div class="container">
      <h1>Funcionários</h1>
      <input type="text" v-model="search" placeholder="Buscar funcionário..." class="search-input" />

      <button @click="openAdd" class="add-button">Adicionar Funcionário</button>

      <table class="employee-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Salário</th>
            <th>RG</th>
            <th>Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in filteredFuncionarios" :key="f.id">
            <td>{{ f.nome }}</td>
            <td>{{ f.salario }}</td>
            <td>{{ f.rg }}</td>
            <td>{{ f.admissao }}</td>
            <td>
              <button @click="edit(f)" class="edit-button">Editar</button>
              <button @click="confirmDelete(f)" class="delete-button">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modais -->
      <div v-if="renderModals">
        <!-- Modal de Adicionar/Editar -->
        <div v-if="showAddModal" class="modal-overlay">
          <div class="modal">
            <h2>{{ editing ? 'Editar Funcionário' : 'Adicionar Funcionário' }}</h2>
            <label>Nome:</label>
            <input v-model="current.nome" type="text" />
            <label>Salário:</label>
            <input v-model="current.salario" type="number" />
            <label>RG:</label>
            <input v-model="current.rg" type="text" />
            <label>Admissão:</label>
            <input v-model="current.admissao" type="date" />

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
export default {
  data() {
    return {
      funcionarios: [
        { id: 1, nome: 'Ana Lima', salario: 3500, rg: '123456', admissao: '2023-01-10' },
        { id: 2, nome: 'Carlos Souza', salario: 4200, rg: '654321', admissao: '2022-09-15' }
      ],
      current: { id: null, nome: '', salario: '', rg: '', admissao: '' },
      editing: false,
      showAddModal: false,
      showConfirmModal: false,
      search: '',
      renderModals: true
    }
  },
  computed: {
    filteredFuncionarios() {
      return this.funcionarios.filter(f =>
        f.nome.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    openAdd() {
      this.editing = false
      this.resetCurrent()
      this.toggleModalAdd(true)
    },
    edit(f) {
      this.current = { ...f }
      this.editing = true
      this.toggleModalAdd(true)
    },
    confirmDelete(f) {
      this.current = { ...f }
      this.showConfirmModal = true
    },
    deleteNow() {
      this.funcionarios = this.funcionarios.filter(f => f.id !== this.current.id)
      this.closeModal()
    },
    save() {
      if (this.editing) {
        const index = this.funcionarios.findIndex(f => f.id === this.current.id)
        if (index !== -1) this.funcionarios.splice(index, 1, { ...this.current })
      } else {
        const newId = this.funcionarios.length ? Math.max(...this.funcionarios.map(f => f.id)) + 1 : 1
        this.funcionarios.push({ ...this.current, id: newId })
      }
      this.closeModal()
    },
    closeModal() {
      this.showAddModal = false
      this.showConfirmModal = false
      this.resetCurrent()
      this.forceRerenderModals()
    },
    toggleModalAdd(val) {
      this.showAddModal = val
      if (!val) {
        this.resetCurrent()
        this.forceRerenderModals()
      }
    },
    resetCurrent() {
      this.current = { id: null, nome: '', salario: '', rg: '', admissao: '' }
    },
    forceRerenderModals() {
      this.renderModals = false
      this.$nextTick(() => (this.renderModals = true))
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/funcionario.css");
</style>

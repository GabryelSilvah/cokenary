<template>

  <Menu />

  <main>

    <section v-if="role_usuario == 'administrador'">
      <div class="container-crud">
        <div class="header-section">
          <h1>Lista de Restaurantes</h1>
          <input type="text" placeholder="Buscar cargo pelo nome..." class="search-bar" />
          <button class="add-button" @click="showAddModal = true">
            <i class="fas fa-plus"></i> Adicionar Restaurante
          </button>
        </div>

        <div class="table-responsive">
          <table class="restaurantes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Contato</th>
                <th>Telefone</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="restaurante in restaurantes" :key="restaurante.id">
                <td>{{ restaurante.id }}</td>
                <td>{{ restaurante.nome }}</td>
                <td>{{ restaurante.contato || '-' }}</td>
                <td>{{ formatTelefone(restaurante.telefone) }}</td>
                <td class="actions-cell">
                  <button class="edit-btn" @click="editRestaurante(restaurante)">
                    <i class="fas fa-edit"></i> Editar
                  </button>
                </td>
                <td>
                  <button class="delete-btn" @click="confirmDelete(restaurante)">
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
            <h2>{{ editingRestaurante ? 'Editar Restaurante' : 'Adicionar Novo Restaurante' }}</h2>
            <div class="form-group">
              <label>Nome do Restaurante:</label>
              <input type="text" v-model="currentRestaurante.nome" placeholder="Digite o nome do restaurante"
                class="modal-input" required />
            </div>
            <div class="form-group">
              <label>Nome do Contato:</label>
              <input type="text" v-model="currentRestaurante.contato" placeholder="Digite o nome do contato"
                class="modal-input" />
            </div>
            <div class="form-group">
              <label>Telefone:</label>
              <input type="tel" v-model="currentRestaurante.telefone" placeholder="Digite o telefone (ex: 11987654321)"
                class="modal-input" @input="formatTelefoneInput" maxlength="11" />
            </div>
            <div class="modal-buttons">
              <button class="cancel-btn" @click="closeModal">Cancelar</button>
              <button class="save-btn" @click="saveRestaurante">
                {{ editingRestaurante ? 'Salvar' : 'Adicionar' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Modal de Confirmação -->
        <div v-if="showConfirmModal" class="modal-overlay">
          <div class="modal confirm-modal">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o restaurante "{{ restauranteToDelete.nome }}"?</p>
            <div class="modal-buttons">
              <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
              <button class="delete-confirm-btn" @click="deleteRestaurante">Confirmar</button>
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
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      restaurantes: [
        { id: 1, nome: 'Restaurante Sabor Caseiro', contato: 'João Silva', telefone: '11987654321' },
        { id: 2, nome: 'Cantina Italiana', contato: 'Maria Oliveira', telefone: '21988776655' },
        { id: 3, nome: 'Churrascaria Gaúcha', contato: 'Carlos Souza', telefone: '51999887766' },
      ],
      showAddModal: false,
      showConfirmModal: false,
      editingRestaurante: false,
      currentRestaurante: {
        id: null,
        nome: '',
        contato: '',
        telefone: ''
      },
      restauranteToDelete: {},
      role_usuario: Cookies.get("cargo_user")
    }
  },
  methods: {
    editRestaurante(restaurante) {
      this.currentRestaurante = { ...restaurante };
      this.editingRestaurante = true;
      this.showAddModal = true;
    },
    saveRestaurante() {
      if (!this.currentRestaurante.nome.trim()) return;

      if (this.editingRestaurante) {
        const index = this.restaurantes.findIndex(r => r.id === this.currentRestaurante.id);
        if (index !== -1) {
          this.restaurantes.splice(index, 1, { ...this.currentRestaurante });
        }
      } else {
        const newId = Math.max(...this.restaurantes.map(r => r.id), 0) + 1;
        this.restaurantes.push({
          id: newId,
          nome: this.currentRestaurante.nome,
          contato: this.currentRestaurante.contato,
          telefone: this.currentRestaurante.telefone
        });
      }

      this.closeModal();
    },
    confirmDelete(restaurante) {
      this.restauranteToDelete = { ...restaurante };
      this.showConfirmModal = true;
    },
    deleteRestaurante() {
      this.restaurantes = this.restaurantes.filter(r => r.id !== this.restauranteToDelete.id);
      this.showConfirmModal = false;
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentRestaurante = { id: null, nome: '', contato: '', telefone: '' };
      this.editingRestaurante = false;
    },
    formatTelefone(telefone) {
      if (!telefone) return '-';
      // Formata como (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
      return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    },
    formatTelefoneInput(event) {
      // Remove tudo que não é dígito
      let value = event.target.value.replace(/\D/g, '');
      // Limita a 11 caracteres (DDD + número com 9 dígitos)
      value = value.substring(0, 11);
      this.currentRestaurante.telefone = value;
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/tabelas.css");
@import url("~/assets/css/acesso_role.css");
</style>
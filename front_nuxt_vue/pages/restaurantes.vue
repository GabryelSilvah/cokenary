<template>


  <main>
    <section v-if="role_usuario == 'administrador'" class="section_administrador">
      <MenuLateral class="menuLateral" />

      <div class="container_right">

        <div class="container-crud">
          <div class="header-section">
            <h1>Restaurantes</h1>
            <button class="add-button" @click="showAddModal = true">
              <i class="fas fa-plus"></i> Adicionar Restaurante
            </button>
          </div>

          <div v-if="loading" class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Carregando restaurantes...
          </div>

          <div v-else-if="error" class="error-message">
            <i class="fas fa-exclamation-triangle"></i> {{ error }}
          </div>

          <div v-else class="table-responsive">
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
                <tr v-for="restaurante in restaurantes" :key="restaurante.idRestaurante">
                  <td>{{ restaurante.idRestaurante }}</td>
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
                <input type="tel" v-model="currentRestaurante.telefone"
                  placeholder="Digite o telefone (ex: 11955550000)" class="modal-input" @input="formatTelefoneInput"
                  maxlength="15" ref="telefoneInput" />
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
import {
  listarRestaurantes,
  cadastrarRestaurante,
  alterarRestaurante,
  excluirRestaurante
} from '~/assets/js/request_api_restaurante';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      restaurantes: [],
      loading: false,
      error: null,
      showAddModal: false,
      showConfirmModal: false,
      editingRestaurante: false,
      currentRestaurante: {
        idRestaurante: null,
        nome: '',
        contato: '',
        telefone: ''
      },
      restauranteToDelete: {},
      role_usuario: Cookies.get("cargo_user")
    }
  },
  async created() {
    await this.fetchRestaurantes();
  },
  methods: {
    async fetchRestaurantes() {
      this.loading = true;
      this.error = null;
      try {
        this.restaurantes = await listarRestaurantes();
      } catch (err) {
        console.error('Erro ao carregar restaurantes:', err);
        this.error = 'Erro ao carregar restaurantes. Tente novamente mais tarde.';
      } finally {
        this.loading = false;
      }
    },
    editRestaurante(restaurante) {
      this.currentRestaurante = { ...restaurante };
      this.editingRestaurante = true;
      this.showAddModal = true;

      // Atualiza o campo de telefone com a formatação quando editar
      this.$nextTick(() => {
        if (this.$refs.telefoneInput && this.currentRestaurante.telefone) {
          this.$refs.telefoneInput.value = this.formatTelefone(this.currentRestaurante.telefone);
        }
      });
    },
    async saveRestaurante() {
      if (!this.currentRestaurante.nome.trim()) {
        alert('O nome do restaurante é obrigatório');
        return;
      }

      try {
        if (this.editingRestaurante) {
          await alterarRestaurante(this.currentRestaurante.idRestaurante, this.currentRestaurante);
        } else {
          await cadastrarRestaurante(this.currentRestaurante);
        }
        await this.fetchRestaurantes();
        this.closeModal();
      } catch (err) {
        console.error('Erro ao salvar restaurante:', err);
        alert('Erro ao salvar restaurante. Tente novamente.');
      }
    },
    confirmDelete(restaurante) {
      this.restauranteToDelete = { ...restaurante };
      this.showConfirmModal = true;
    },
    async deleteRestaurante() {
      try {
        await excluirRestaurante(this.restauranteToDelete.idRestaurante);
        await this.fetchRestaurantes();
        this.showConfirmModal = false;
      } catch (err) {
        console.error('Erro ao excluir restaurante:', err);
        alert('Erro ao excluir restaurante. Tente novamente.');
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentRestaurante = { idRestaurante: null, nome: '', contato: '', telefone: '' };
      this.editingRestaurante = false;
    },
    formatTelefone(telefone) {
      if (!telefone) return '-';
      // Formata como (XX) 9XXXX-XXXX
      const cleaned = telefone.toString().replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return telefone; // Retorna sem formatação se não tiver o tamanho correto
    },
    formatTelefoneInput(event) {
      // Remove tudo que não é dígito
      let value = event.target.value.replace(/\D/g, '');

      // Aplica a máscara enquanto o usuário digita
      if (value.length > 0) {
        value = value.replace(/^(\d{0,2})/, '($1');
      }
      if (value.length > 3) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      }
      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }

      // Limita a 11 dígitos (DDD + 9 dígitos)
      value = value.substring(0, 15); // Espaço para os caracteres não numéricos

      // Atualiza o valor exibido com a formatação
      event.target.value = value;

      // Salva apenas os dígitos no v-model
      this.currentRestaurante.telefone = value.replace(/\D/g, '');
    }
  }
}
</script>

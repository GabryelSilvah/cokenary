<template>

  <main>
    <section v-if="role_usuario == 'administrador'" class="section_administrador">
      <MenuLateral class="menuLateral" />

      <div class="container_right">
        <div class="container-crud">
          <div class="header-section">
            <h1>Cargos</h1>
            <input v-model="searchTerm" type="text" placeholder="Buscar cargo pelo nome..." class="search-bar" />
            <button class="add-button" @click="showAddModal = true">
              <i class="fas fa-plus"></i> Adicionar Cargo
            </button>
          </div>

          <!-- Barra de Pesquisa -->



          <div class="table-responsive">
            <table class="cargos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome do Cargo</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cargo in cargosFiltrados" :key="cargo.id">
                  <td>{{ cargo.id }}</td>
                  <td>{{ cargo.nome }}</td>
                  <td class="actions-cell">
                    <button class="edit-btn" @click="editCargo(cargo)">
                      <i class="fas fa-edit"></i> Editar
                    </button>
                  </td>
                  <td>
                    <button class="delete-btn" @click="confirmDelete(cargo)">
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
              <h2>{{ editingCargo ? 'Editar Cargo' : 'Adicionar Novo Cargo' }}</h2>
              <div class="form-group">
                <label>Nome do Cargo:</label>
                <input type="text" v-model="currentCargo.nome" placeholder="Digite o nome do cargo"
                  class="modal-input" />
              </div>
              <div class="modal-buttons">
                <button class="cancel-btn" @click="closeModal">Cancelar</button>
                <button class="save-btn" @click="saveCargo">
                  {{ editingCargo ? 'Salvar' : 'Adicionar' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Modal de Confirmação -->
          <div v-if="showConfirmModal" class="modal-overlay">
            <div class="modal confirm-modal">
              <h2>Confirmar Exclusão</h2>
              <p>Tem certeza que deseja excluir o cargo "{{ cargoToDelete.nome }}"?</p>
              <div class="modal-buttons">
                <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
                <button class="delete-confirm-btn" @click="deleteCargo">Confirmar</button>
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
  cargoListar,
  cargoCadastrar,
  cargoAlterar,
  cargoDeletar
} from '~/assets/js/request_api_cargo.js';
import Cookies from 'js-cookie';
import MenuLateral from '~/components/MenuLateral.vue';

export default {
  data() {
    return {
      cargos: [],
      searchTerm: '', // Campo da barra de busca
      showAddModal: false,
      showConfirmModal: false,
      editingCargo: false,
      currentCargo: {
        id: null,
        nome: ''
      },
      cargoToDelete: {},
      loading: false,
      error: null,
      role_usuario: Cookies.get("cargo_user")
    };
  },
  computed: {
    cargosFiltrados() {
      if (!this.searchTerm.trim()) return this.cargos;
      const termo = this.searchTerm.toLowerCase();
      return this.cargos.filter(cargo =>
        cargo.nome.toLowerCase().includes(termo)
      );
    }
  },
  async mounted() {
    await this.loadCargos();
  },
  methods: {
    async loadCargos() {
      this.loading = true;
      try {
        const { data, error } = await cargoListar();
        if (error) throw error;

        this.cargos = Array.isArray(data)
          ? data
          : data?.value || [];

      } catch (error) {
        console.error('Erro ao carregar cargos:', error);
        this.error = 'Falha ao carregar a lista de cargos';
      } finally {
        this.loading = false;
      }
    },
    editCargo(cargo) {
      this.currentCargo = { ...cargo };
      this.editingCargo = true;
      this.showAddModal = true;
    },
    async saveCargo() {
      if (!this.currentCargo.nome.trim()) {
        this.error = 'O nome do cargo é obrigatório';
        return;
      }

      this.loading = true;
      try {
        if (this.editingCargo) {
          const { error } = await cargoAlterar(this.currentCargo.id, {
            nome: this.currentCargo.nome
          });
          if (error) throw error;
        } else {
          const { error } = await cargoCadastrar({
            nome: this.currentCargo.nome
          });
          if (error) throw error;
        }

        await this.loadCargos();
        this.closeModal();

      } catch (error) {
        console.error('Erro ao salvar cargo:', error);
        this.error = 'Erro ao salvar o cargo';
      } finally {
        this.loading = false;
      }
    },
    confirmDelete(cargo) {
      this.cargoToDelete = { ...cargo };
      this.showConfirmModal = true;
    },
    async deleteCargo() {
      this.loading = true;
      try {
        const { error } = await cargoDeletar(this.cargoToDelete.id);
        if (error) throw error;

        await this.loadCargos();
        this.showConfirmModal = false;

      } catch (error) {
        console.error('Erro ao excluir cargo:', error);
        this.error = 'Erro ao excluir o cargo';
      } finally {
        this.loading = false;
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentCargo = { id: null, nome: '' };
      this.editingCargo = false;
      this.error = null;
    }
  }
};
</script>

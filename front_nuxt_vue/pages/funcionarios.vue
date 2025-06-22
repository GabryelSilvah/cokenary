<template>
  <Menu />
  <main>

    <section v-if="role_usuario == 'administrador'">
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
              <th>Cargo</th>
              <th>Restaurante</th>
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
              <td>{{ f.restaurante?.nome || 'N/A' }}</td>
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
              <input v-model="current.rg" type="number" :readonly="editing" :class="{ 'readonly-field': editing }"
                required />

              <label>Data de Admissão:</label>
              <input v-model="current.dt_adm" type="date" required />

              <label>Cargo:</label>
              <select v-model="current.cargo_id" required>
                <option disabled value="">Selecione um cargo</option>
                <option v-for="cargo in cargos" :key="cargo.id_cargo" :value="cargo.id_cargo">
                  {{ cargo.nome }}
                </option>
              </select>

              <label>Restaurante:</label>
              <select v-model="current.idRestaurante" required>
                <option disabled value="">Selecione um restaurante</option>
                <option v-for="restaurante in restaurantes" :key="restaurante.idRestaurante"
                  :value="restaurante.idRestaurante">
                  {{ restaurante.nome }}
                </option>
              </select>

              <label>Usuário:</label>
              <input v-model="current.username" type="text" :required="!editing" />

              <label>Senha:</label>
              <input v-model="current.password" type="password" :required="!editing" />

              <label>Confirmar Senha:</label>
              <input v-model="current.confirmPassword" type="password" :required="!editing" />

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
    </section>


    <!-- Mensagem de bloqueio do usuário -->
    <div v-else class="mensagem_acesso">
      Seu nível de acesso não é compatível com essa funcionalidade...
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
import Cookies from 'js-cookie';
import { cargoListar } from '~/assets/js/request_api_cargo.js';
import { listarRestaurantes } from '~/assets/js/request_api_restaurante.js';

export default {
  data() {
    return {
      funcionarios: [],
      cargos: [],
      restaurantes: [],
      current: {
        id_func: null,
        nome: '',
        salario: 0,
        rg: null,
        dt_adm: '',
        cargo_id: '',
        idRestaurante: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      editing: false,
      showAddModal: false,
      showConfirmModal: false,
      search: '',
      renderModals: true,
      role_usuario: Cookies.get("cargo_user")
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
    await this.fetchRestaurantes();
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
    async fetchRestaurantes() {
      try {
        const response = await listarRestaurantes();
        this.restaurantes = Array.isArray(response) ? response : response.data || [];
      } catch (error) {
        console.error('Erro ao carregar restaurantes:', error);
        this.restaurantes = [];
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
      const cargoId = funcionario.cargo?.id || funcionario.cargo?.id_cargo || '';
      const restauranteId = funcionario.restaurante?.id || funcionario.restaurante?.idRestaurante || '';

      this.current = {
        id_func: funcionario.id_func || funcionario.id,
        nome: funcionario.nome,
        salario: funcionario.salario,
        rg: funcionario.rg,
        dt_adm: funcionario.dt_adm ? new Date(funcionario.dt_adm).toISOString().split('T')[0] : '',
        cargo_id: cargoId,
        idRestaurante: restauranteId,
        username: '', // não trazemos a senha e username na edição por segurança
        password: '',
        confirmPassword: ''
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
      if (!this.current.idRestaurante) erros.push('Selecione um restaurante!');
      if (!this.editing && !this.current.username) erros.push('Usuário é obrigatório!');
      if (!this.editing && !this.current.password) erros.push('Senha é obrigatória!');

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
          cargo: { id: parseInt(this.current.cargo_id) },
          restaurante: { id: parseInt(this.current.idRestaurante) }
        };

        if (!this.editing) {
          funcionarioData.username = this.current.username;
          funcionarioData.password = this.current.password;
        }

        if (this.editing) {
          await funcionarioAlterar(this.current.id_func, funcionarioData);
        } else {
          await funcionarioCadastrar(funcionarioData);
        }

        await this.fetchFuncionarios();
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar funcionário:', error.response?.data || error.message);
      }
    },
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
        cargo_id: '',
        imagem_perfil: "",
        listaRestaurante: [{ idRestaurante: 1 }],
        nome_usuario: '',
        senha_usuarios: ''
      };
    }
  }
};
</script>

<style scoped>
@import url("~/assets/css/funcionario.css");
@import url("~/assets/css/acesso_role.css");
</style>

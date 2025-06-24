<template>

  <main>
    <section v-if="role_usuario == 'administrador'" class="section_administrador">
      <MenuLateral class="menuLateral" />

      <div class="container_right">

        <div class="container container-crud">
          <div class="header-section">
            <h1>Funcionários</h1>
            <input type="text" v-model="search" placeholder="Buscar funcionário..." class="search-bar" />
            <button @click="openAdd" class="add-button">Adicionar Funcionário</button>
          </div>

          <table class="employee-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Salário</th>
                <th>RG</th>
                <th>Admissão</th>
                <th>Cargo</th>
                <th>Restaurante</th>
                <th>Status</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in filteredFuncionarios" :key="f.id">
                <td>{{ f.nome }}</td>
                <td>R$ {{ f.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
                <td>{{ f.rg }}</td>
                <td>{{ formatDate(f.dt_adm) }}</td>
                <td>{{ f.cargo.nome || f.cargo || 'N/A' }}</td>
                <td>{{ f.listaRestaurante[0]?.nome || 'N/A' }}</td>
                <td>
                  {{ f.statusFunc ? 'Ativo': 'Inativo'}}
                </td>
                <td>
                  <button @click="edit(f)" class="edit-button edit-btn">Editar</button>
                </td>
                <td>
                  <button @click="confirmDelete(f)" class="delete-button delete-btn">Excluir</button>
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
                <input v-model="current.nome" type="text" required placeholder="Digite o nome completo..." />

                <label>Salário:</label>
                <input v-model="current.salario" type="number" step="0.01" required />

                <label>RG:</label>
                <input v-model="current.rg" type="number" :readonly="editing" :class="{ 'readonly-field': editing }"
                  required placeholder="Digite sem traços e pontos..." />

                <label>Cargo:</label>
                <select v-model="current.cargo_id" required>
                  <option disabled value="">Selecione um cargo</option>
                  <option v-for="cargo in cargos" :key="cargo.id_cargo" :value="cargo.id_cargo">
                    {{ cargo.nome }}
                  </option>
                </select>

                <label>Restaurante:</label>
                <select v-model="current.idRestaurante" required>
                  <option disabled value="0">Selecione um restaurante</option>
                  <option v-for="restaurante in restaurantes" :key="restaurante.idRestaurante"
                    :value="restaurante.idRestaurante">
                    {{ restaurante.nome }}
                  </option>
                </select>

                <label>Status:</label>
                <select v-model="current.statusFunc" required>
                  <option value="1" selected>Ativo</option>
                  <option value="0">Inativo</option>
                </select>

                <label>Usuário:</label>
                <input v-model="current.nome_usuario" type="text" :required="!editing"
                  placeholder="Digite o nome para login..." />

                <label>Senha:</label>
                <input v-model="current.senha_usuarios" type="password" :required="!editing"
                  placeholder="Crie a senha do usuário para login..." />

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
        cargo_id: 0,
        idRestaurante: 0,
        nome_usuario: '',
        senha_usuarios: '',
        statusFunc: 1
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
      const restauranteId = funcionario.restaurante?.id || funcionario.restaurante?.listaRestaurante || '';

      this.current = {
        id_func: funcionario.id_func || funcionario.id,
        nome: funcionario.nome,
        salario: funcionario.salario,
        rg: funcionario.rg,
        cargo_id: funcionario.cargo.id,
        idRestaurante: funcionario.listaRestaurante[0].idRestaurante,
        nome_usuario: '', // não trazemos na edição por segurança
        senha_usuarios: '',
        statusFunc: Number(funcionario.statusFunc)
      };

      this.editing = true;
      this.showAddModal = true;
    },
    validateForm() {
      const erros = [];

      if (!this.current.nome) erros.push('Nome é obrigatório!');
      if (!this.current.rg) erros.push('RG é obrigatório!');
      if (!this.current.cargo_id) erros.push('Selecione um cargo!');
      // if (!this.current.listaRestaurante) erros.push('Selecione um restaurante!');
      if (!this.editing && !this.current.nome_usuario) erros.push('Usuário é obrigatório!');
      if (!this.editing && !this.current.senha_usuarios) erros.push('Senha é obrigatória!');

      if (erros.length) {
        alert(erros.join('\n'));
        return false;
      }

      return true;
    },
    async save() {
      try {
        if (!this.validateForm()) return;

        console.log("Testando restaurante" + this.current.idRestaurante)

        const funcionarioData = {
          nome: this.current.nome.trim(),
          rg: this.current.rg.toString(),
          salario: parseFloat(this.current.salario),
          cargo: {  // Agora enviamos um objeto Cargo completo
            id: this.current.cargo_id
          },
          listaRestaurante: [
            {
              idRestaurante: this.current.idRestaurante
            }
          ],
          nome_usuario: this.current.nome_usuario,
          senha_usuarios: this.current.senha_usuarios,
          statusFunc: this.current.statusFunc
        };

        if (this.editing) {
          await funcionarioAlterar(this.current.id_func, funcionarioData);
          alert('Funcionário atualizado com sucesso!');
        } else {
          await funcionarioCadastrar(funcionarioData);
          alert('Funcionário cadastrado com sucesso!');
        }

        await this.fetchFuncionarios();
        this.closeModal();
      } catch (error) {
        console.error('Erro:', error);
        alert(error.message || 'Ocorreu um erro ao salvar o funcionário');
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
        alert('Erro ao excluir funcionário: ' + error.message);
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
        idRestaurante: 0,
        nome_usuario: '',
        senha_usuarios: ''
      };
    }
  }
};
</script>

<style scoped>
@import url("~/assets/css/tabelas.css");
@import url("~/assets/css/acesso_role.css");
</style>
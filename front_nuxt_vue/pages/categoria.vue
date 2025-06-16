<template>

  <main>
  <Menu />
  <div class="categorias-container">
    <div class="header-section">
      <h1>Lista de Categorias</h1>
      <button class="add-button" @click="showAddModal = true">
        <i class="fas fa-plus"></i> Adicionar Categoria
      </button>
    </div>

    <div class="table-responsive">
      <table class="categorias-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome da Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id_cat">
            <td>{{ categoria.id_cat }}</td>
            <td>{{ categoria.nome_categoria }}</td>
            <td class="actions-cell">
              <button class="edit-btn" @click="editCategoria(categoria)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="delete-btn" @click="confirmDelete(categoria)">
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
        <h2>{{ editingCategoria ? 'Editar Categoria' : 'Adicionar Nova Categoria' }}</h2>
        <div class="form-group">
          <label>Nome da Categoria:</label>
          <input
            type="text"
            v-model="currentCategoria.nome_categoria"
            placeholder="Digite o nome da categoria"
            class="modal-input"
            required
          />
        </div>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveCategoria">
            {{ editingCategoria ? 'Salvar' : 'Adicionar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal confirm-modal">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir a categoria "{{ categoriaToDelete.nome_categoria }}"?</p>
        <div class="modal-buttons">
          <button class="cancel-btn" @click="showConfirmModal = false">Cancelar</button>
          <button class="delete-confirm-btn" @click="deleteCategoria">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
// importe suas funções de API
import {
  categoriaListar,
  categoriaById,
  categoriaCadastrar,
  categoriaAlterar,
  categoriaDeletar,
}from "@/assets/js/request_api_categorias.js";

export default {
  data() {
    return {
      categorias: [],
      showAddModal: false,
      showConfirmModal: false,
      editingCategoria: false,
      currentCategoria: {
        id_cat: null,
        nome_categoria: "",
      },
      categoriaToDelete: {},
    };
  },
  mounted() {
    this.carregarCategorias();
  },
  methods: {
    async carregarCategorias() {
      const data = await categoriaListar();
      if (data) {
        this.categorias = data;
      } else {
        this.categorias = [];
      }
    },
    editCategoria(categoria) {
      this.currentCategoria = { ...categoria };
      this.editingCategoria = true;
      this.showAddModal = true;
    },
    async saveCategoria() {
      if (!this.currentCategoria.nome_categoria.trim()) {
        alert("O nome da categoria é obrigatório.");
        return;
      }

      if (this.editingCategoria) {
        // Atualizar categoria via API
        const atualizado = await categoriaAlterar(
          this.currentCategoria.id_cat,
          { nome_categoria: this.currentCategoria.nome_categoria }
        );
        if (atualizado) {
          await this.carregarCategorias();
          this.closeModal();
        } else {
          alert("Erro ao atualizar categoria.");
        }
      } else {
        // Cadastrar nova categoria via API
        const cadastrado = await categoriaCadastrar({
          nome_categoria: this.currentCategoria.nome_categoria,
        });
        if (cadastrado) {
          await this.carregarCategorias();
          this.closeModal();
        } else {
          alert("Erro ao cadastrar categoria.");
        }
      }
    },
    confirmDelete(categoria) {
      this.categoriaToDelete = { ...categoria };
      this.showConfirmModal = true;
    },
    async deleteCategoria() {
      const deletado = await categoriaDeletar(this.categoriaToDelete.id_cat);
      if (deletado) {
        await this.carregarCategorias();
        this.showConfirmModal = false;
      } else {
        alert("Erro ao excluir categoria.");
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showConfirmModal = false;
      this.currentCategoria = { id_cat: null, nome_categoria: "" };
      this.editingCategoria = false;
    },
  },
};
</script>

<style scoped>
@import url("~/assets/css/categoria.css");
</style>

<template>

  <Menu />

  <div class="book-management">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <header class="header">
      <h1 class="title">Gestão de Livros de Receitas</h1>
      <p class="subtitle">Gerencie os livros a serem publicados</p>
    </header>

    <div class="actions">
      <button @click="showAddModal = true" class="action-button add-button">
        <i class="fas fa-plus"></i> Adicionar Livro
      </button>
      <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Pesquisar livros..." class="search-input">
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>

    <div class="book-list-container">
      <div v-if="filteredBooks.length === 0" class="empty-state">
        <i class="fas fa-book-open empty-icon"></i>
        <p>Nenhum livro encontrado</p>
        <button @click="showAddModal = true" class="empty-button">
          Adicionar seu primeiro livro
        </button>
      </div>

      <div class="book-list">
        <div v-for="book in filteredBooks" :key="book.id" class="book-card">
          <div class="book-cover">
            <img :src="book.cover || 'https://via.placeholder.com/300x200?text=Capa+do+Livro'" alt="Capa do livro">
          </div>
          <div class="book-info">
            <h3>{{ book.title }}</h3>
            <p class="author">Por {{ book.author }}</p>
            <p class="description">{{ book.description }}</p>
            <div class="status" :class="book.status">
              {{ book.status === 'published' ? 'Publicado' : 'Rascunho' }}
            </div>
          </div>
          <div class="book-actions">
            <button @click="editBook(book)" class="icon-button" title="Editar">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="viewBook(book)" class="icon-button" title="Visualizar">
              <i class="fas fa-eye"></i>
            </button>
            <button @click="deleteBook(book)" class="icon-button danger" title="Excluir"
              :disabled="book.status === 'published'">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Adição/Edição -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editingBook ? 'Editar Livro' : 'Adicionar Novo Livro' }}</h2>
          <button @click="closeModal" class="close-button">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitBook">
            <div class="form-group">
              <label for="title">Título do Livro</label>
              <input id="title" v-model="currentBook.title" type="text" required>
            </div>
            <div class="form-group">
              <label for="author">Autor</label>
              <input id="author" v-model="currentBook.author" type="text" required>
            </div>
            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea id="description" v-model="currentBook.description" rows="4"></textarea>
            </div>
            <div class="form-group">
              <label for="cover">URL da Capa</label>
              <input id="cover" v-model="currentBook.cover" type="url" placeholder="https://exemplo.com/capa.jpg">
            </div>
            <div class="form-actions">
              <button type="button" @click="closeModal" class="cancel-button">
                Cancelar
              </button>
              <button type="submit" class="submit-button">
                {{ editingBook ? 'Salvar Alterações' : 'Adicionar Livro' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Visualização -->
    <div v-if="viewingBook" class="modal-overlay">
      <div class="modal view-modal">
        <div class="modal-header">
          <h2>{{ viewingBook.title }}</h2>
          <button @click="viewingBook = null" class="close-button">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="book-view">
            <div class="book-view-cover">
              <img :src="viewingBook.cover || 'https://via.placeholder.com/300x200?text=Capa+do+Livro'"
                alt="Capa do livro">
            </div>
            <div class="book-view-details">
              <p class="book-view-author">Por {{ viewingBook.author }}</p>
              <p class="book-view-description">{{ viewingBook.description }}</p>
              <div class="book-view-meta">
                <span class="book-view-status" :class="viewingBook.status">
                  Status: {{ viewingBook.status === 'published' ? 'Publicado' : 'Rascunho' }}
                </span>
                <span class="book-view-date">
                  Criado em: {{ formatDate(viewingBook.createdAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="viewingBook = null" class="close-view-button">
            <i class="fas fa-times"></i> Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      showAddModal: false,
      editingBook: null,
      viewingBook: null,
      currentBook: {
        title: '',
        author: '',
        description: '',
        cover: '',
        status: 'draft',
        createdAt: new Date()
      },
      books: [
        {
          id: 1,
          title: 'Receitas Caseiras da Vovó',
          author: 'Maria Silva',
          description: 'Coleção de receitas tradicionais passadas de geração em geração.',
          cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          status: 'draft',
          createdAt: new Date('2023-01-15')
        },
        {
          id: 2,
          title: 'Culinária Contemporânea',
          author: 'Carlos Andrade',
          description: 'Técnicas modernas para cozinheiros ambiciosos.',
          cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          status: 'published',
          createdAt: new Date('2023-02-20')
        },
        {
          id: 3,
          title: 'Doces e Sobremesas',
          author: 'Ana Paula',
          description: 'Receitas doces para todos os gostos e ocasiões.',
          cover: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          status: 'draft',
          createdAt: new Date('2023-03-10')
        }
      ]
    }
  },
  computed: {
    filteredBooks() {
      if (!this.searchQuery) return this.books
      const query = this.searchQuery.toLowerCase()
      return this.books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    editBook(book) {
      this.editingBook = book
      this.currentBook = { ...book }
      this.showAddModal = true
    },
    viewBook(book) {
      this.viewingBook = { ...book }
    },
    deleteBook(book) {
      if (book.status === 'published') return
      if (confirm(`Tem certeza que deseja excluir o livro "${book.title}"?`)) {
        this.books = this.books.filter(b => b.id !== book.id)
      }
    },
    closeModal() {
      this.showAddModal = false
      this.editingBook = null
      this.currentBook = {
        title: '',
        author: '',
        description: '',
        cover: '',
        status: 'draft',
        createdAt: new Date()
      }
    },
    submitBook() {
      if (this.editingBook) {
        const index = this.books.findIndex(b => b.id === this.editingBook.id)
        this.books.splice(index, 1, { ...this.currentBook })
      } else {
        this.books.push({
          ...this.currentBook,
          id: Math.max(...this.books.map(b => b.id), 0) + 1
        })
      }
      this.closeModal()
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR')
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/livro.css");
</style>
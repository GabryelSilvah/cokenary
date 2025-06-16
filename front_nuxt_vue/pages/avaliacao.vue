<template>
  <Menu />

  <main>


    <div class="avaliacoes-container">
      <div class="header-section">
        <h1>Avaliações de Receitas</h1>
        <div class="search-filter">
          <input v-model="searchQuery" placeholder="Buscar receitas..." class="search-input">
          <select v-model="filterRating" class="filter-select">
            <option value="">Todas as avaliações</option>
            <option value="9">⭐ 9+ (Excelente)</option>
            <option value="7">⭐ 7+ (Bom)</option>
            <option value="5">⭐ 5+ (Regular)</option>
            <option value="3">⭐ 3+ (Ruim)</option>
          </select>
        </div>
      </div>

      <div class="receitas-list">
        <div v-for="receita in filteredReceitas" :key="receita.id" class="receita-card">
          <div class="receita-info">
            <h3>{{ receita.nome }}</h3>
            <p class="receita-desc">{{ receita.descricao }}</p>

            <div class="rating-section">
              <div class="rating-display">
                <span class="rating-value">{{ receita.avaliacao }}</span>
                <div class="stars">
                  <span v-for="star in 10" :key="star"
                    :class="['star', { 'filled': star <= receita.avaliacao }]">★</span>
                </div>
                <span class="rating-count">({{ receita.totalAvaliacoes }} avaliações)</span>
              </div>

              <div class="rating-input" v-if="!userHasRated(receita.id)">
                <span class="rating-label">Sua avaliação:</span>
                <div class="star-rating">
                  <span v-for="star in 10" :key="star"
                    :class="['star', { 'selected': star <= currentRating[receita.id] }]"
                    @click="setRating(receita.id, star)" @mouseover="hoverRating[receita.id] = star"
                    @mouseleave="hoverRating[receita.id] = 0">★</span>
                </div>
                <button class="submit-rating" @click="submitRating(receita.id)" :disabled="!currentRating[receita.id]">
                  Enviar
                </button>
              </div>
              <div v-else class="already-rated">
                <i class="fas fa-check-circle"></i> Você já avaliou esta receita
              </div>
            </div>
          </div>
          <div class="receita-image">
            <img :src="receita.imagem" :alt="receita.nome" v-if="receita.imagem">
            <div class="image-placeholder" v-else>
              <i class="fas fa-utensils"></i>
            </div>
          </div>
        </div>

        <div v-if="filteredReceitas.length === 0" class="empty-state">
          <i class="fas fa-search"></i>
          <p>Nenhuma receita encontrada</p>
        </div>
      </div>

      <!-- Modal de Confirmação -->
      <div v-if="showSuccessModal" class="modal-overlay">
        <div class="modal confirm-modal">
          <h2>Avaliação Registrada!</h2>
          <p>Obrigado por avaliar a receita "{{ lastRatedReceita }}".</p>
          <div class="modal-buttons">
            <button class="confirm-btn" @click="showSuccessModal = false">OK</button>
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
      searchQuery: '',
      filterRating: '',
      currentRating: {},
      hoverRating: {},
      userRatings: {},
      showSuccessModal: false,
      lastRatedReceita: '',
      receitas: [
        {
          id: 1,
          nome: 'Lasanha à Bolonhesa',
          descricao: 'Lasanha tradicional com molho à bolonhesa e queijo derretido',
          avaliacao: 8.7,
          totalAvaliacoes: 124,
          imagem: 'https://example.com/lasanha.jpg'
        },
        {
          id: 2,
          nome: 'Bolo de Chocolate',
          descricao: 'Bolo fofinho com cobertura de ganache',
          avaliacao: 9.2,
          totalAvaliacoes: 89,
          imagem: ''
        },
        {
          id: 3,
          nome: 'Frango Grelhado',
          descricao: 'Filé de frango temperado e grelhado',
          avaliacao: 7.5,
          totalAvaliacoes: 56,
          imagem: 'https://example.com/frango.jpg'
        },
        {
          id: 4,
          nome: 'Salada Caesar',
          descricao: 'Salada com molho caesar e croutons',
          avaliacao: 6.8,
          totalAvaliacoes: 42,
          imagem: ''
        },
      ]
    }
  },
  computed: {
    filteredReceitas() {
      let filtered = this.receitas

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(receita =>
          receita.nome.toLowerCase().includes(query) ||
          receita.descricao.toLowerCase().includes(query))
      }

      if (this.filterRating) {
        const minRating = parseInt(this.filterRating)
        filtered = filtered.filter(receita => receita.avaliacao >= minRating)
      }

      return filtered
    }
  },
  methods: {
    setRating(receitaId, rating) {
      this.$set(this.currentRating, receitaId, rating)
    },
    submitRating(receitaId) {
      const receita = this.receitas.find(r => r.id === receitaId)
      if (receita && this.currentRating[receitaId]) {
        // Em uma aplicação real, aqui você enviaria para o backend
        const newRating = this.currentRating[receitaId]

        // Atualiza a média (simulação)
        const newTotal = receita.totalAvaliacoes + 1
        const newAverage = ((receita.avaliacao * receita.totalAvaliacoes) + newRating) / newTotal

        receita.avaliacao = parseFloat(newAverage.toFixed(1))
        receita.totalAvaliacoes = newTotal

        // Marca como avaliado pelo usuário
        this.$set(this.userRatings, receitaId, newRating)

        // Mostra feedback
        this.lastRatedReceita = receita.nome
        this.showSuccessModal = true
      }
    },
    userHasRated(receitaId) {
      return this.userRatings[receitaId] !== undefined
    }
  }
}
</script>

<style scoped>
@import url("~/assets/css/avaliacao.css");
</style>
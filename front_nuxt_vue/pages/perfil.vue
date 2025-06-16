<template>

  <Menu/>
  <div class="profile-container">
    <div class="profile-header">
      <h1>Meu Perfil</h1>
      <p>Gerencie suas informações pessoais</p>
    </div>

    <div class="profile-content">
      <div class="profile-sidebar">
        <div class="profile-summary">
          <div class="profile-avatar">
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Foto de perfil">
          </div>
          <h2>Marcos Souza</h2>
          <p class="profile-role">Chef de Cozinha</p>
          <p>membro desde março 2022</p>
          <button class="change-photo-btn">Alterar Foto</button>
        </div>

        <nav class="profile-menu">
          <a href="#" class="active">Informações Pessoais</a>
          <a href="#">Configurações</a>
          <a href="#">Segurança</a>
          <a href="#">Notificações</a>
        </nav>
      </div>

      <div class="profile-details">
        <section class="personal-info">
  <h2>Dados do Funcionário</h2>
  <p>Veja as informações relacionadas ao seu trabalho</p>

  <div class="info-grid">
    <div class="info-item">
      <label>Quantidade de Receitas</label>
      <div class="info-value">35</div> <!-- Substitua pelo valor real com variável se desejar -->
    </div>

    <div class="info-item">
      <label>Restaurante</label>
      <div class="info-value">Restaurante Sabor do Chef</div> <!-- Substitua por variável dinâmica se quiser -->
    </div>

    <div class="info-item">
      <label>Cargo</label>
      <div class="info-value">Chef de Cozinha</div>
    </div>

    <div class="info-item">
      <label>Membro desde</label>
      <div class="info-value">Março 2022</div>
    </div>
  </div>
</section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Meu Perfil'
    }
  }
}
</script>

<style>
@import url("~/assets/css/perfil.css");
</style>

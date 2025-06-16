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
          <h2>Informações Pessoais</h2>
          <p>Atualize suas informações de perfil</p>

          <div class="info-grid">
            <div class="info-item">
              <label>Nome</label>
              <div class="info-value">Marcos</div>
            </div>

            <div class="info-item">
              <label>Email</label>
              <div class="info-value">marcos.souza@exemplo.com</div>
            </div>

            <div class="info-item">
              <label>Telefone</label>
              <div class="info-value">(21) 98765-4321</div>
            </div>

            <div class="info-item">
              <label>Endereço</label>
              <div class="info-value">Av. Brasil, 1500</div>
            </div>

            <div class="info-item">
              <label>Cidade</label>
              <div class="info-value">Rio de Janeiro</div>
            </div>

            <div class="info-item full-width">
              <label>Sobre você</label>
              <div class="info-value">
                Desenvolvedor web com 5 anos de experiência, especializado em Vue.js e Node.js. Apaixonado por criar soluções eficientes e interfaces intuitivas.
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="cancel-btn">Cancelar</button>
            <button class="save-btn">Salvar Alterações</button>
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

<template>
  <div class="container_login banner_login">

    <form action="" method="post" @submit.prevent="" class="form_login">

      <div class="container_campos">
        <label for="">Usuário:</label>
        <input type="text" placeholder="Digite seu usuário...">
      </div>

      <div class="container_campos">
        <label for="">Senha:</label>
        <input type="password" placeholder="Digite sua senha...">
      </div>

      <button class="btn_form" type="submit">Entrar</button>
      <div class="container_opcoes_login">
        <NuxtLink class="btn_opcoes_login" :to="{ path: `/esqueceu_senha` }">Esqueceu a senha?</NuxtLink>
      </div>
    </form>

  </div>
</template>

<script lang="js" scoped>

</script>



<style lang="css">
@import url("~/assets/css/login.css");
</style>
<template>
  <div class="container_login">

    <form action="" method="post" @submit.prevent="" class="form_login" style="align-items: center;">
      <label for="">Digite seu nome de usuário:</label>
      <input type="text" placeholder="Digite seu usuário...">

      <button class="btn_form" type="submit">Enviar notificação</button>
      <div class="container_opcoes_login">
        <NuxtLink class="btn_opcoes_login" :to="{ path: `/login` }">Voltar</NuxtLink>
      </div>
    </form>

  </div>
</template>

<script lang="js" setup>

</script>

<style>
@import url("~/assets/css/login.css");
</style>
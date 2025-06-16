<template>

  <Menu />
  <div class="container_login">

    <form action="" method="post" @submit.prevent="" class="form_login">
      <div class="container_campos">
        <label for="">Usuário:</label>
        <input type="text" placeholder="Digite seu usuário...">
      </div>

      <div class="container_campos">
        <label for="">Senha:</label>
        <input type="password" placeholder="Digite sua senha...">
      </div>


      <div class="container_campos">
        <label for="">Confirmar Senha:</label>
        <input type="password" placeholder="Digite sua senha...">
      </div>

      <select class="select_option">
        <option value="0">Selecione</option>
        <option value="1">Editor</option>
        <option value="2">Cozinheiro</option>
      </select>

      <button class="btn_form" type="submit">Cadastrar</button>
      <div class="container_opcoes_login">
        <NuxtLink class="btn_opcoes_login" :to="{ path: `/login` }">Cancelar</NuxtLink>
      </div>
    </form>



  </div>
</template>

<script lang="js" setup>

</script>

<style lang="css" scoped>
@import url("~/assets/css/cadastro.css");
</style>
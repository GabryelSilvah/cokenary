<template>
  <div class="container_login banner_login">

    <form action="" method="post" @submit.prevent="" class="form_login" @submit="autenticar">

      <div class="container_campos">
        <label for="">Usuário:</label>
        <input type="text" placeholder="Digite seu usuário..." v-model="loginModel.email">
      </div>

      <div class="container_campos">
        <label for="">Senha:</label>
        <input type="password" placeholder="Digite sua senha..." v-model="loginModel.senha">
      </div>

      <button class="btn_form" type="submit">Entrar</button>
      <div class="container_opcoes_login">
        <NuxtLink class="btn_opcoes_login" :to="{ path: `/esqueceu_senha` }">Esqueceu a senha?</NuxtLink>
      </div>
    </form>

  </div>
</template>



<script lang="js" setup>
import { autenticar_user } from '~/common/api/auth_request';
import Cookies from 'js-cookie';



//Referências de login
const loginModel = defineModel("loginModel", {
  default: {
    email: "",
    senha: ""
  }
})


async function autenticar(){
  const respostaAPI = await autenticar_user(loginModel.value);
  Cookies.set("token_auth",respostaAPI.value.data.token)
}

</script>



<style lang="css">
@import url("~/assets/css/login.css");
</style>
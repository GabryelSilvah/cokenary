<template>

  <header class="menu">
    <nav>

      <div class="Marca">
        <NuxtLink to="#" class="titulo_page">
          <h2>Cooknary <span class="role_menu">{{ role_usuario }}</span></h2>
        </NuxtLink>
      </div>
      <ul>
        <NuxtLink to="/food" v-if="role_usuario == 'cozinheiro'">
          <li>Receitas</li>
        </NuxtLink>
        <NuxtLink to="/livros/listar" v-if="role_usuario == 'editor'">
          <li>Livros</li>
        </NuxtLink>
        <NuxtLink to="/livros/listar" v-if="role_usuario == 'degustador'">
          <li>Avaliações</li>
        </NuxtLink>
        <NuxtLink to="/perfil">
          <li>Perfil</li>
        </NuxtLink>
        <li @click="logout">Sair</li>
      </ul>
    </nav>
  </header>

  <main>
    <NuxtPage />
  </main>

  <footer>

  </footer>


</template>

<style>
@import url("~/assets/css_components/menu.css");

main {
  margin-bottom: 50px;
}
</style>


<script lang="js" setup>
import Cookies from 'js-cookie';

const role_usuario = Cookies.get("cargo_user");

function logout() {
  Cookies.remove("token_auth");
  Cookies.remove("id_user");
  Cookies.remove("cargo_user");
  window.location = "/login";
}



</script>

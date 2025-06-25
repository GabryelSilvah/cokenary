<template>

  <header class="menu">
    <nav>

      <div class="Marca">
        <NuxtLink to="/livros/listar" class="titulo_page">
          <h2>Cooknary <span class="role_menu">Editor</span></h2>
        </NuxtLink>
      </div>
      <ul>
        <NuxtLink to="/livros/listar">
          <li>Livros</li>
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



function logout() {
  Cookies.remove("token_auth");
  Cookies.remove("id_user");
  Cookies.remove("cargo_user");
  window.location = "/login";
}



</script>

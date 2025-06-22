<template>

  <header class="menu">
    <nav>

      <div class="Marca">
        <NuxtLink to="/" class="titulo_page">
          <h2>Cooknary</h2>
        </NuxtLink>
      </div>
      <ul>

        <select name="" id="">
          <option value="">Opções</option>
          <option value="">Receitas</option>
          <option value="">Livros</option>
          <option value="">Funcionários</option>
          <option value="">Avaliações</option>
          <option value="">Painel Adm</option>
          <option value="">Painel Adm</option>
          <option value="">Painel Adm</option>
        </select>
        <NuxtLink to="/food">
          <li>Receitas</li>
        </NuxtLink>
        <NuxtLink to="/livros/listar">
          <li>Livros</li>
        </NuxtLink>
        <NuxtLink to="/funcionarios">
          <li>Funcionários</li>
        </NuxtLink>
        <NuxtLink to="/perfil">
          <li>Perfil</li>
        </NuxtLink>
        <NuxtLink to="/admin">
          <li>Painel</li>
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
  Cookies.remove("cargo_user");
}



</script>

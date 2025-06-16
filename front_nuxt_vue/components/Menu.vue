<template>

  <header class="menu">
    <nav>

      <div class="Marca">
        <NuxtLink to="/" class="titulo_page">
          <h2>Cooknary</h2>
        </NuxtLink>
      </div>
      <ul>
        <NuxtLink to="/">
          <li>Home</li>
        </NuxtLink>
        <NuxtLink to="/food">
          <li>Receitas</li>
        </NuxtLink>
        <NuxtLink to="/funcionarios">
          <li>Funcionários</li>
        </NuxtLink>
        <NuxtLink to="/perfil">
          <li>Perfil</li>
        </NuxtLink>
        <NuxtLink to="/sair">
          <li>Sair</li>
        </NuxtLink>
      </ul>
    </nav>
  </header>

  <main>
    <NuxtPage />
  </main>

  <footer>

  </footer>


</template>

<script lang="js" setup>

</script>

<style>
@import url("~/assets/css_components/menu.css");

main {
  margin-bottom: 50px;
}
</style>
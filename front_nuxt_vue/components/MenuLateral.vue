<template>


  <div class="sidebar">
    <div class="sidebar-header">
      <h1>Painel Administrativo</h1>
      <p class="subtitle">Gerencie todos os aspectos do seu sistema</p>
    </div>

    <nav>
      <ul>
        <li>
          <NuxtLink :to="{ path: '/admin' }" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/cargos' }"><i class="fas fa-id-badge"></i> Cargos</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/categoria' }"><i class="fa fa-list-alt"></i> Categoria</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/medidas' }"><i class="fas fa-weight"></i> Medidas</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/ingredientes' }"><i class="fas fa-carrot"></i> Ingredientes</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/restaurantes' }"><i class="fas fa-store"></i> Restaurantes</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/funcionarios' }"><i class="fas fa-users"></i> Funcionários</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ path: '/perfil_adm' }"><i class="fas fa-user"></i>Meu Perfil</NuxtLink>
        </li>
        <li class="logout-link" @click="logout"><a href="#"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
      </ul>
    </nav>
  </div>


</template>

<style scoped>
@import url("~/assets/css/admin.css");
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

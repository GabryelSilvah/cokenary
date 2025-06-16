<template>
  <div class="admin-panel">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h1>Painel Administrativo</h1>
        <p class="subtitle">Gerencie todos os aspectos do seu sistema</p>
        
      </div>

      <nav>
        <ul>
          <li><a href="#" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
          <li><a href="#"><i class="fas fa-utensils"></i> Receitas</a></li>
          <li>
            <NuxtLink :to="{ path: '/restaurantes', query: { id_restaurantes: 1 } }">
              <i class="fas fa-store"></i> Restaurantes
            </NuxtLink>
          </li>
        
          <li>
            <NuxtLink :to="{ path: '/funcionarios', query: { id_funcionario: 1 } }">
              <i class="fas fa-users"></i> funcionários
            </NuxtLink>
          </li>

          <li>
            <NuxtLink :to="{ path: '/cargos', query: { id_cargos: 1 } }">
              <i class="fas fa-id-badge"></i> Cargos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/ingredientes', query: { id_ingrediente: 1 } }">

              <i class="fas fa-carrot"></i> Ingredientes
            </NuxtLink>
          </li>
          <li>
            <nuxt-link :to="{ path: '/medidas', query: { id_medidas: 1 } }">
              <i class="fas fa-weight"></i> Medidas
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ path: '/livro' }">
              <i class="fas fa-book"></i> Livro
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ path: '/categoria', query: { id_categoria: 1 } }">
              <i class="fa fa-list-alt"></i> Categoria
            </nuxt-link>
          </li>

          <li>
            <NuxtLink :to="{ path: '/cadastro', query: { id_funcionario: 1 } }">
              <i class="fas fa-users"></i> Cadastrar de usuario
            </NuxtLink>
          </li>

          <li><a href="#"><i class="fas fa-cog"></i> Configurações</a></li>
          <li class="logout-link"><a href="#"><i class="fas fa-sign-out-alt"></i> Sair</a></li>


      

        </ul>

      </nav>
    </div>


    <!-- Main Content -->
    <div class="main-content">
      <div class="content-wrapper">
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-utensils"></i></div>
            <div class="stat-info">
              <h3>Receitas</h3>
              <div class="stat-value">8</div>
              <a href="#" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-store"></i></div>
            <div class="stat-info">
              <h3>Restaurantes</h3>
              <div class="stat-value">6</div>
              <a href="#" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-users"></i></div>
            <div class="stat-info">
              <h3>Funcionários</h3>
              <div class="stat-value">12</div>
              <a href="#" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-id-badge"></i></div>
            <div class="stat-info">
              <h3>Cargos</h3>
              <div class="stat-value">5</div>
              <a href="#" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-carrot"></i></div>
            <div class="stat-info">
              <h3>Ingredientes</h3>
              <div class="stat-value">5</div>
              <a href="#" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-weight"></i></div>
            <div class="stat-info">
              <h3>Medidas</h3>
              <div class="stat-value">5</div>
              <a href="#" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <div class="activities-container">
          <div class="activities-header">
            <h2>Atividades Recentes</h2>
            <p class="subtitle">Monitoramento das últimas ações no sistema</p>
          </div>

          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon success"><i class="fas fa-plus-circle"></i></div>
              <div class="activity-content">
                <h3>Nova receita adicionada</h3>
                <p>Por: Admin • 10 minutos atrás</p>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon warning"><i class="fas fa-user-edit"></i></div>
              <div class="activity-content">
                <h3>Funcionário atualizado</h3>
                <p>Por: Gerente • 1 hora atrás</p>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon danger"><i class="fas fa-trash-alt"></i></div>
              <div class="activity-content">
                <h3>Restaurante excluído</h3>
                <p>Por: Admin • 2 horas atrás</p>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon info"><i class="fas fa-id-card"></i></div>
              <div class="activity-content">
                <h3>Novo cargo criado</h3>
                <p>Por: Gerente RH • Ontem</p>
              </div>
            </div>
          </div>

          <a href="#" class="view-all">Ver todas as atividades <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      // Dados podem ser adicionados aqui
    }
  }
}
</script>

<style>
@import url("~/assets/css/admin.css");	
</style>
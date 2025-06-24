<template>
  <main v-if="role_usuario == 'administrador'">
    <div class="admin-panel">
      <div class="sidebar">
        <div class="sidebar-header">
          <h1>Painel Administrativo</h1>
          <p class="subtitle">Gerencie todos os aspectos do seu sistema</p>
        </div>

        <nav>
          <ul>
            <li><a href="#" class="active"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
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
            <li class="logout-link"><a href="#"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
          </ul>
        </nav>
      </div>

      <div class="main-content">
        <div class="content-wrapper">
          <div class="stats-container">
            <div class="stat-card">
              <div class="stat-icon"><i class="fas fa-utensils"></i></div>
              <div class="stat-info">
                <h3>Receitas</h3>
                <div class="stat-value">{{ painelData.numero_receita }}</div>
                <a href="/food" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon"><i class="fas fa-store"></i></div>
              <div class="stat-info">
                <h3>Restaurantes</h3>
                <div class="stat-value">{{ painelData.numero_restaurante }}</div>
                <a href="/restaurantes" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon"><i class="fas fa-users"></i></div>
              <div class="stat-info">
                <h3>Funcionários</h3>
                <div class="stat-value">{{ painelData.numero_funcionario }}</div>
                <a href="/funcionarios" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon"><i class="fas fa-id-badge"></i></div>
              <div class="stat-info">
                <h3>Cargos</h3>
                <div class="stat-value">{{ painelData.numero_cargo }}</div>
                <a href="/cargos" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon"><i class="fas fa-carrot"></i></div>
              <div class="stat-info">
                <h3>Ingredientes</h3>
                <div class="stat-value">{{ painelData.numero_ingrediente }}</div>
                <a href="/ingredientes" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>



            <div class="stat-card">
              <div class="stat-icon"><i class="fas fa-star"></i></div>
              <div class="stat-info">
                <h3>Avaliações</h3>
                <div class="stat-value">{{ painelData.numero_avalicao }}</div>
                <a href="avaliacao/listar" class="stat-link">Ver todos <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>

          </div>

          <!--
        Atividades Recentes - Seção de Monitoramento

        Esta seção exibe uma lista das atividades recentes realizadas no sistema administrativo.
        Estrutura:
          - activities-container: Container principal da seção de atividades.
          - activities-header: Cabeçalho com título e subtítulo explicativo.
          - activity-list: Lista das atividades recentes.
            - activity-item: Cada item representa uma atividade específica, contendo:
              - activity-icon: Ícone visual que indica o tipo de atividade (success, warning, danger, info).
              - activity-content: Detalhes da atividade, incluindo título e informações sobre quem realizou e quando.

        Observações:
          - Os ícones utilizam classes do Font Awesome para melhor identificação visual.
          - As classes de status (success, warning, danger, info) ajudam a diferenciar rapidamente o tipo de ação realizada.
          - Os textos estão em português, adequados ao contexto do sistema.
   
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
        </div> -->
        </div>
      </div>
    </div>
  </main>

  <div v-else class="mensagem_acesso">
    Seu nível de acesso não é compatível com essa funcionalidade...
  </div>
</template>

<style scoped>
@import url("~/assets/css/acesso_role.css");
@import url("~/assets/css/admin.css");
</style>

<script>

import { getPainelNumeros } from '~/assets/js/request_api_adm.js';
import Cookies from 'js-cookie';

export default {
  name: 'AdminPanel',
  data() {
    return {
      // Inicializa com valores padrão para evitar erros de renderização antes dos dados serem carregados
      painelData: {
        numero_receita: 0,
        numero_restaurante: 0,
        numero_funcionario: 0,
        numero_cargo: 0,
        numero_ingrediente: 0,
        numero_categoria: 0,
        numero_livro: 0,
        numero_avalicao: 0,
        numero_medida: 0
      },
      role_usuario: Cookies.get("cargo_user")
    };
  },
  async mounted() {
    try {
      // Chama a função importada e aguarda a resposta
      const data = await getPainelNumeros();
      // Atribui os dados diretamente ao painelData
      this.painelData = data;
    } catch (error) {
      console.error('Erro ao carregar dados do painel:', error);
      // Você pode definir valores padrão ou mostrar uma mensagem de erro na UI
      // this.painelData = { ...this.painelData, error: true }; 
    }

  },
  
}
</script>

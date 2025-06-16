<template>
  <main>
    <Menu />
    <section class="container_exibir_livro">

      <div class="page_livro" v-for="pagina in livroEncontrado.data.receitas_livro">

        <h1 class="titulo_livro" v-if="livroEncontrado.data">{{ livroEncontrado.data.titulo_livro }}</h1>

        <h2 class="subttitulo_receita">{{pagina.nome_receita }}</h2>
        <div class="container_detalhes">
          <p class="subtitulo_detalhes">Categoria: {{ pagina.categoria_id }}</p>
          <p class="subtitulo_detalhes">Prepara por: {{ pagina.cozinheiro_id }}</p>
          <p class="subtitulo_detalhes">Data de Criação: {{ pagina.data_criacao }}</p>
          <p class="subtitulo_detalhes">Nota Avaliação: 9.3</p>
        </div>

        <img src="../../assets/image/banner_login.jpg" class="img_receita">

        <div class="container_agregados_receita">
          <h3 class="subtitulo_topicos">Ingredientes:</h3>
          <ul class="lista_ingredientes" v-for="ingrediente in pagina.composicao">
            <li>{{ ingrediente.nome_ingred }} {{ ingrediente.nome_med }}</li>
          </ul>
          <h3 class="subtitulo_topicos">Modo de preparo</h3>

          <p class="descricao_modo_preparo">
          {{ pagina.modo_preparo }}
          </p>
        </div>


      </div>
    </section>

  </main>
</template>


//Estilização, sendo importada da pasta assets, css
<style scoped>
@import url("~/assets/css/livros/descricaoLivro.css");
</style>


//Funcionalidades e chamadas das rotas da APIs
<script lang="ts" setup>
import { byIdLivros } from '~/common/api/livros_request';

//Pegando query string (id_livro) da URL
const route = useRoute();


const livroEncontrado = await byIdLivros(route.query.id_livro);

console.log(JSON.stringify(livroEncontrado.value.data));

</script>

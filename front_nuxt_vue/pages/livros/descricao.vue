<template>
  <main v-if="role_usuario == 'editor'">
    <Menu />
    <section class="container_exibir_livro">

      <div class="page_livro" v-for="pagina in livroEncontrado.data.publicacao_receitas_livro">

        <h1 class="titulo_livro" v-if="livroEncontrado.data">{{ livroEncontrado.data.titulo_livro }}</h1>

        <h2 class="subttitulo_receita">{{ pagina.nome_receita }}</h2>
        <div class="container_detalhes">
          <p class="subtitulo_detalhes">Categoria: {{ pagina.categoria_id }}</p>
          <p class="subtitulo_detalhes">Prepara por: {{ pagina.cozinheiro_id }}</p>
          <p class="subtitulo_detalhes">Data de Criação: {{ pagina.data_criacao }}</p>
          <p class="subtitulo_detalhes">Nota Avaliação: 9.3</p>
        </div>

        <img src="../../assets/image/banner_login.jpg" class="img_receita">

        <div class="container_agregados_receita">
          <h3 class="subtitulo_topicos">Ingredientes:</h3>
          <ul class="lista_ingredientes">
            <li v-for="ingrediente in pagina.composicao">{{ ingrediente.nome_ingred }} {{ ingrediente.nome_med }}</li>
          </ul>
          <h3 class="subtitulo_topicos">Modo de preparo</h3>

          <p class="descricao_modo_preparo">
            {{ pagina.modo_preparo }}
          </p>
        </div>


      </div>
    </section>

  </main>

  <div v-else class="mensagem_acesso">
    Seu nível de acesso não é compatível com essa funcionalidade...
  </div>
</template>


//Estilização, sendo importada da pasta assets, css
<style scoped>
@import url("~/assets/css/livros/descricaoLivro.css");
@import url("~/assets/css/acesso_role.css");
</style>


//Funcionalidades e chamadas das rotas da APIs
<script lang="js" setup>
import { byIdLivros } from '~/common/api/livros_request';
import Cookies from 'js-cookie';


const role_usuario = Cookies.get("cargo_user");


//Pegando query string (id_livro) da URL
const route = useRoute();


const livroEncontrado = await byIdLivros(route.query.id_livro);


</script>

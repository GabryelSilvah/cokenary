<template>
  <main>
    <Menu />

    <div class="container_btn_opcoes">
      <button id="btn_add_food" @click="abrirForm">
        <img src="../../assets/icones/plus.png" alt="">
        Novo Livro
      </button>
    </div>

    <FormLivro id="form" :lista-receitas="listaReceitas.data" :lista-funcionarios="listaFuncionarios.data" />
    <Form_livro_edit id="form_edit" :lista-receitas="listaReceitas.data" :lista-funcionarios="listaFuncionarios.data"
      v-model:livroModel="livroModel" />

    <section class="container_livros">

      <div class="livro" v-for="livro in listaLivros.data">

        <div class="container_img_livro">

          <div class="container_black">
            <NuxtLink :to="{ path: `./descricao`, query: { id_livro: livro.id_livro } }">
              <img src="../../assets/icones/ver.png" class="btn_livros">
            </NuxtLink>
            <img src="../../assets/icones/editar.png" class="btn_livros" @click="abrirFormEdit(livro.id_livro)">
            <img src="../../assets/icones/delete.png" class="btn_livros" id="btn_excluir"
              @click="excluirLivro(livro.id_livro)">
          </div>
          <img src="../../assets/image/banner_livro.png" class="img_livro">
        </div>

        <h2 class="titulo_livro">{{ livro.titulo_livro }}</h2>
        <h3 class="nome_editor">Por: {{ livro.editor }}</h3>
      </div>


    </section>

  </main>
</template>


//Estilização, sendo importada da pasta assets, css
<style scoped>
@import url("~/assets/css/livros/listarLivros.css");
</style>


//Funcionalidades e consumo de rotas da APIs
<script setup lang="js">
import { listarFuncionarios } from '~/common/api/funcionarios_request';
import { byIdLivros, deletarLivros, listarLivros } from '~/common/api/livros_request';
import { listarReceitas } from '~/common/api/receitas_request';
import Form_livro_edit from '~/components/Form_livro _edit.vue';



const listaLivros = await listarLivros();

const listaReceitas = await listarReceitas();

const listaFuncionarios = await listarFuncionarios();

const livroModel = ref({
  id_livro: 0,
  titulo_livro: "",
  isbn: 27494,
  editor: { id_func: 1 },
  composicao_receitas: []
});


//Abrir formulário de cadastrar livro
function abrirForm() {
  //Exibindo formulário
  let form = document.querySelector("#form");
  form.setAttribute("style", "display:flex");
}

//Abrir formulário de editar livro
async function abrirFormEdit(id_livro) {

  const livroEncontrado = await byIdLivros(id_livro);
  livroModel.value.id_livro = livroEncontrado.value.data.id_livro;
  livroModel.value.titulo_livro = livroEncontrado.value.data.titulo_livro;
  livroModel.value.editor.id_func = livroEncontrado.value.data.editor;
  livroModel.value.composicao_receitas = livroEncontrado.value.data.receitas_livro;


  //Exibindo formulário
  let form = document.querySelector("#form_edit");
  form.setAttribute("style", "display:flex");
}

async function excluirLivro(id_livro) {

  const responseAPI = await deletarLivros(id_livro);

}

</script>

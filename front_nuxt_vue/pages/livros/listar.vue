<template>
  <Menu />
  <main v-if="role_usuario == 'editor'">

    <div class="container_btn_opcoes">
      <button id="btn_add_food" @click="abrirForm">
        <img src="../../assets/icones/plus.png" alt="">
        Novo Livro
      </button>
    </div>

    <FormLivro id="form" v-if="listaFuncionarios && listaReceitas" :lista-receitas="listaReceitas.data"
      :lista-funcionarios="listaFuncionarios.data" v-model:livroModel="livroModel" />

    <Form_livro_edit id="form_edit" :lista-receitas="listaReceitas.data" :lista-funcionarios="listaFuncionarios.data"
      v-model:livroModel="livroModel" />

    <section class="container_livros" v-if="listaLivros">

      <div class="livro" v-if="listaLivros" v-for="livro in listaLivros.data">

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
        <h3 class="nome_editor">Por: {{ livro.editor.nome }}</h3>
      </div>


    </section>

  </main>

  <div v-else class="mensagem_acesso">
    Seu nível de acesso não é compatível com essa funcionalidade...
  </div>
</template>


//Estilização, sendo importada da pasta assets, css
<style scoped>
@import url("~/assets/css/livros/listarLivros.css");
@import url("~/assets/css/acesso_role.css");
</style>


//Funcionalidades e consumo de rotas da APIs
<script setup lang="js">
import { listarFuncionarios } from '~/common/api/funcionarios_request';
import { byIdLivros, deletarLivros, listarLivros } from '~/common/api/livros_request';
import { listarReceitas } from '~/common/api/receitas_request';
import Form_livro_edit from '~/components/Form_livro _edit.vue';
import Cookies from 'js-cookie';

const role_usuario = Cookies.get("cargo_user");

let listaLivros = ref(await listarLivros());

const listaReceitas = await listarReceitas();

const listaFuncionarios = await listarFuncionarios();


const livroModel = ref({
  titulo_livro: "",
  isbn: 344343,
  editor: { id_func: 0 },
  receitas_remover: [],
  publicacao_receitas_livro: []
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
  livroModel.value.editor.id_func = livroEncontrado.value.data.editor.id_func;
  livroModel.value.publicacao_receitas_livro = livroEncontrado.value.data.publicacao_receitas_livro;


  //Exibindo formulário
  let form = document.querySelector("#form_edit");
  form.setAttribute("style", "display:flex");
}

async function excluirLivro(id_livro) {

  const responseAPI = await deletarLivros(id_livro);
  listaLivros = await listarLivros();


}


</script>

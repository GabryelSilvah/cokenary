<template>


  <section class="container_form container_form_edit">

    <form action="POST" @submit.prevent="alterarLivro(livroModel.id_livro)" class="form">
      <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
      <div class="sections">

        <label for="">Titulo do livro</label>
        <input v-model="livroModel.titulo_livro" type="text" placeholder="Ex: Receitas Premium">

        <label for="">Criado por</label>
        <select name="" id="" v-model="receita_ref">
          <option value="0" selected>Selecione</option>
          <option :value="editor.id_func" v-for="editor in listaFuncionarios" :key="editor.id_func">
            {{ editor.nome }}
          </option>
        </select>


        <label for="">Adicione as receitas</label>
        <div class="container_itens_add" id="caixa_de_itens_salvas">
          <h2>Coleção de receitas do livro</h2>
          <div class="container_composicao" v-for="composicao_livro in livroModel.composicao_receitas">
            <p>{{ composicao_livro.nome_receita }}</p>
            <p>por: Gabriel </p>
          </div>
        </div>


        <select name="" id="" v-model="receita_ref">
          <option value="0" selected>Selecione</option>
          <option :value="receita.id_receita" v-for="receita in listaReceitas" :key="receita.id_receita">
            {{ receita.nome_receita }}
          </option>
        </select>


        <button type="button" @click="addReceitasNaLista" class="btn_adicionar">
          Adicionar
        </button>

        <button type="submit" class="btn_submit">
          Atualizar Livro
        </button>

      </div>
    </form>

  </section>


</template>
<style scoped>
@import url("~/assets/css_components/form.css");
</style>

<script lang="js" setup>
import { alterarLivros } from '~/common/api/livros_request';
import { byIdAllInfor } from '~/common/api/receitas_request';

//Definindo dados que devem ser pré-carregados
defineProps(
  {
    listaReceitas: Object,
    listaFuncionarios: Object
  }
);


//Definindo ligação bilateral com inputs
const receita_ref = defineModel("receita_ref");
const livroModel = defineModel("livroModel", {
  default: {
    id_livro: 0,
    titulo_livro: "",
    isbn: 27494,
    editor: { id_func: 1 },
    composicao_receitas: []
  }
});




async function alterarLivro(id_livro) {
  console.log("Forma " + id_livro);
  const livroAlterado = await alterarLivros(id_livro, livroModel.value);
  fecharForm();

}




//Função para pegar receitas selecionadas e exibir no campo de formulário
async function addReceitasNaLista() {

  //Buscando receita escolhida
  const receitaEncontrada = await byIdAllInfor(receita_ref.value);


  let composicao_receitas =
  {
    fk_receita:
    {
      id_receita: receitaEncontrada.value.data.id_receita,
      nome_receita: receitaEncontrada.value.data.nome_receita
    }
  };

  livroModel.value.composicao_receitas.push(composicao_receitas);

  console.log(JSON.stringify(livroModel.value.composicao_receitas))

}


//Fechar formulário
function fecharForm() {
  let container_form_cadastro = document.querySelector(".container_form_edit");
  container_form_cadastro.setAttribute("style", "display:none");
}
</script>

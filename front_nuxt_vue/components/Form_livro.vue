<template>


  <section class="container_form container_form_cadastro">

    <form action="POST" @submit.prevent="cadastrarLivro" class="form">
      <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
      <div class="sections">

        <label for="">Titulo do livro</label>
        <input v-model="livroModel.titulo_livro" type="text" placeholder="Ex: Receitas Premium" required>

        <label for="">Criado por</label>
        <select name="criador_receita" id="" v-model="livroModel.editor.id_func">
          <option value="0" selected>Selecione</option>

          <option :value="editor.id" v-for="editor in listaFuncionarios" :key="editor.id_func">
            {{ editor.nome }}
          </option>

        </select>

        <label for="">Adicione as receitas</label>
        <div class="container_itens_add" id="caixa_de_itens_salvas">
          <h2>Coleção de receitas do livro</h2>
          <div class="container_composicao" v-for="composicao_livro in livroModel.publicacao_receitas_livro">
            <p class="item_lista">{{ composicao_livro.nome_receita }} </p>
            <p class="item_lista">Chef: {{ composicao_livro.cozinheiro_id }} </p>
            <img src="../assets/icones/delete.png" class="img_delete_item"
              @click="excluir_receita_livro(composicao_livro.id_receita)">
          </div>
        </div>


        <select name="receita_livro" id="" v-model="receita_ref" :required="true">
          <option value="0">Selecione</option>
          <option :value="receita.id_receita" v-for="receita in listaReceitas" :key="receita.id_receita">
            {{ receita.nome_receita }}
          </option>
        </select>


        <button type="button" @click="addReceitasNaLista" class="btn_adicionar">
          Adicionar
        </button>

        <button type="submit" class="btn_submit">
          Criar Livro
        </button>

      </div>
    </form>

  </section>


</template>
<style scoped>
@import url("~/assets/css_components/form.css");
</style>

<script lang="js" setup>
import { cadastrarLivros, listarLivros } from '~/common/api/livros_request';
import { byIdAllInfor } from '~/common/api/receitas_request';

//Definindo dados que devem ser pré-carregados
defineProps(
  {
    listaReceitas: Object,
    listaFuncionarios: Object
  }
);

let listaLivros = ref();

//Definindo ligação bilateral com inputs
const receita_ref = defineModel("receita_ref", { default: 0 });
const livroModel = defineModel("livroModel", {
  default:
  {
    titulo_livro: "",
    isbn: 344343,
    editor: { id_func: 0 },
    receitas_remover: [],
    publicacao_receitas_livro: []
  }
});


//Receber e enviar dados inseridos para a API (POST)
async function cadastrarLivro() {
  const livroCadastrado = await cadastrarLivros(livroModel.value);
  fecharForm();
  listaLivros.value = await listarLivros();
}


//Função para pegar receitas selecionadas e exibir no campo de formulário
async function addReceitasNaLista() {

  //Buscando receita escolhida
  const receitaEncontrada = await byIdAllInfor(receita_ref.value);
  console.log("Teste livro: " + JSON.stringify(receitaEncontrada));

  let composicao_receitas =
  {
    id_receita: receitaEncontrada.id_receita,
    nome_receita: receitaEncontrada.nome_receita
  };

  livroModel.value.publicacao_receitas_livro.push(composicao_receitas);

}

//Excluir receita do livro
function excluir_receita_livro(id_receita) {

  //Procurando index onde id_receita é igual o id_receita passado para exclusão
  //Se o valor for encontrado, deverá ser removida livroModel
  let index = livroModel.value.publicacao_receitas_livro.findIndex(receita => receita.id_receita == id_receita)

  //Valor for menor que 0 é porque não foi encontrado
  if (index > -1) {
    livroModel.value.publicacao_receitas_livro.splice(index, 1);
  }

}

//Fechar formulário
function fecharForm() {
  let container_form_cadastro = document.querySelector(".container_form_cadastro");
  container_form_cadastro.setAttribute("style", "display:none");
}
</script>

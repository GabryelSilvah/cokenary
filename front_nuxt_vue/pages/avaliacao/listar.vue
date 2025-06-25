<template>

  <main>

    <Menu />
    <section v-if="role_usuario == 'degustador'">
      <div>

        <FormAvaliacao id="formCadastro" :listaReceitas="listaReceitas.data" />
        <FormAvaliacaoEdit id="formEdit" :listaReceitas="listaReceitas.data" v-model:avaliacaoModel="avaliacaoModel" />

        <section class="container_opcoes">
          <button type="button" class="btn_nova_avaliacao" @click="abrirForm">Nova Avaliação</button>
        </section>

        <section class="container_avaliacao">

          <div class="avaliacao" v-for="avaliacao in listarAvaliacoes.data">
            <h2 class="nome_receita">{{ avaliacao.receita.nomeReceita }}</h2>

            <div class="container_detalhes">
              <p><span class="titulo_detalhe">Degustador:</span> {{ avaliacao.degustador.nome }}</p>
              <p><span class="titulo_detalhe">Cozinheiro:</span> {{ avaliacao.cozinheiro.nome }}</p>
              <p><span class="titulo_detalhe">Data:</span> 19/06/2025</p>
            </div>

            <div class="nota_avalicao">
              <p><span class="span_nota">Nota:</span>{{ avaliacao.nota_avaliacao }}/10</p>
            </div>


            <div class="container_btn">
              <button type="button" class="btn" id="editar"
                @click="abrirFormEdit(avaliacao.id_avaliacao)">Reavaliar</button>
              <button type="button" class="btn" id="excluir"
                @click="excluirAvaliacao(avaliacao.id_avaliacao)">Excluir</button>
            </div>
          </div>
        </section>


      </div>

    </section>

    <div v-else class="mensagem_acesso">
      Seu nível de acesso não é compatível com essa funcionalidade...
    </div>
  </main>
</template>

//
<style scoped>
@import url("~/assets/css/avaliacao/listar.css");
@import url("~/assets/css/acesso_role.css");
</style>

//
<script lang="ts" setup>
import { byIdAvaliacao, byIdDegustador, deletarAvaliacao } from '~/common/api/avaliacao_request';
import { listarReceitas } from '~/common/api/receitas_request';
import Cookies from 'js-cookie';

const role_usuario = Cookies.get("cargo_user");


const id_degustador = ref(Cookies.get("id_user"));



let listarAvaliacoes = ref(await byIdDegustador(id_degustador.value));



const listaReceitas = await listarReceitas();



//Modelo avaliaçoes
const avaliacaoModel = ref({
  id_avaliacao: 0,
  degustador: { id_func: 4 },
  receita: { id_receita: 0, nomeReceita: "" },
  data_avaliada: "2025-05-31",
  nota_avaliacao: 0
});



//
async function abrirFormEdit(id_avaliacao) {
  avaliacaoModel.value.receita.id_receita = 0;

  const avaliacaoEncontrada = await byIdAvaliacao(id_avaliacao);


  avaliacaoModel.value.id_avaliacao = avaliacaoEncontrada.value.data.id_avaliacao;
  avaliacaoModel.value.degustador.id_func = avaliacaoEncontrada.value.data.degustador.id_func;
  avaliacaoModel.value.receita.id_receita = avaliacaoEncontrada.value.data.receita.id_receita;
  avaliacaoModel.value.receita.nomeReceita = avaliacaoEncontrada.value.data.receita.nomeReceita;
  avaliacaoModel.value.data_avaliada = avaliacaoEncontrada.value.data.data_avaliada;
  avaliacaoModel.value.nota_avaliacao = avaliacaoEncontrada.value.data.nota_avaliacao;

  //Exibindo formulário
  let form = document.querySelector("#formEdit");
  form.setAttribute("style", "display:flex");
}


async function excluirAvaliacao(id_avaliacao) {
  const responseAPI = await deletarAvaliacao(id_avaliacao);
  listarAvaliacoes = await byIdDegustador(id_degustador.value);
}


//Abrir formulário de cadastrar avaliação
async function abrirForm() {
  avaliacaoModel.value.receita.id_receita = 0;
  //Exibindo formulário
  let form = document.querySelector("#formCadastro");
  form.setAttribute("style", "display:flex");
}

</script>

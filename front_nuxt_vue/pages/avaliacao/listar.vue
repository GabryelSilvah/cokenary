<template>

  <Menu />
  <div>

    <section class="container_opcoes">
      <button type="button" class="btn_nova_avaliacao">Nova Avaliação</button>
    </section>

    <section class="container_avaliacao">

      <div class="avaliacao" v-for="avaliacao in listaDegustadores.data">
        <h2 class="nome_receita">{{ avaliacao.receita.nomeReceita }}</h2>

        <div class="container_detalhes">
          <p><span class="titulo_detalhe">Degustador:</span> {{ avaliacao.degustador.nome }}</p>
          <p><span class="titulo_detalhe">Cozinheiro:</span> {{ avaliacao.cozinheiro.nome }}</p>
          <p><span class="titulo_detalhe">Data:</span> 19/06/2025</p>
        </div>

        <div class="nota_avalicao">
          <p><span class="span_nota">Nota:</span>9/10</p>
        </div>


        <div class="container_btn">
          <button type="button" class="btn" id="editar">Reavaliar</button>
          <button type="button" class="btn" id="excluir"
            @click="excluirAvaliacao(avaliacao.id_avaliacao)">Excluir</button>
        </div>
      </div>
    </section>


  </div>
</template>

//
<style scoped>
@import url("~/assets/css/avaliacao/listar.css");
</style>

//
<script lang="ts" setup>
import { byIdDegustador, deletarAvaliacao } from '~/common/api/avaliacao_request';


const id_degustador = ref(4);

let listaDegustadores = await byIdDegustador(id_degustador.value);

console.log(listaDegustadores.value);


async function excluirAvaliacao(id_avalicao) {
  const responseAPI = await deletarAvaliacao(id_avalicao);
  listaDegustadores.value = await byIdDegustador(3);
}

</script>

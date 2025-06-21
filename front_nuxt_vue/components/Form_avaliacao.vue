<template>

    <section class="container_form_cadastro container_form">


        <form action="" method="post" class="form" @submit.prevent="salvar">

            <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
            <div class="sections">
                <h2 class="topico">Avaliar Receita</h2>

                <label for="">Escolha a receita:</label>
                <select required name="categoria" id="" v-model="avaliacaoModel.receita.id_receita">
                    <option value="0">Selecione</option>
                    <option v-if="listaReceitas" v-for="receita in listaReceitas" :key="receita.id_receita"
                        :value="receita.id_receita">
                        {{ receita.nome_receita }}
                    </option>
                </select>


                <!-- Quantidade de porções -->
                <input type="number" min="0" v-model="avaliacaoModel.nota_avaliacao" class="input_quantidade">

                <button type="submit">Registrar avaliação</button>

            </div>

        </form>

    </section>

</template>


//
<style scoped>
@import url("~/assets/css_components/form.css");
</style>

//
<script setup scoped lang="js">
import { byIdDegustador, cadastrarAvaliacao } from '~/common/api/avaliacao_request';



//Campos (select) que devem ser passado por quem usar o componente Form_food
defineProps({
    listaReceitas: Object
});


let listarAvaliacoes = ref();

const avaliacaoModel = defineModel("receitaModel", {
    default: {
        degustador: { id_func: 4 },
        receita: { id_receita: 0, nomeReceita:"" },
        data_avaliada: "2025-05-31",
        nota_avaliacao: 0
    }
});



async function salvar() {
  const avaliacaoCadastrada = await cadastrarAvaliacao(avaliacaoModel.value);
  fecharForm();

    listarAvaliacoes = await byIdDegustador(avaliacaoModel.value.degustador.id_func);
}


//Fechar formulário
function fecharForm() {
    let container_form_cadastro = document.querySelector(".container_form_cadastro");
    container_form_cadastro.setAttribute("style", "display:none");
}



</script>

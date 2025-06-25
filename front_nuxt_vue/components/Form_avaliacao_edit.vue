<template>

    <section class="container_form_edit container_form">
        <form action="" method="post" class="form" @submit.prevent="salvar">
            <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
            <div class="sections">
                <h2 class="topico">Reavalição Receita</h2>


                <label for="">Escolha a receita:</label>
                <select required name="categoria" id="" v-model="avaliacaoModel.receita.id_receita">
                    <option value="0">Selecione</option>
                    <option v-if="listaReceitas" :key="avaliacaoModel.receita.id_receita"
                        :value="avaliacaoModel.receita.id_receita">
                        {{ avaliacaoModel.receita.nomeReceita }}
                    </option>
                </select>


                <!-- Quantidade de porções -->
                <input type="number" min="0" v-model="avaliacaoModel.nota_avaliacao" class="input_quantidade">
                <button type="submit">Registrar reavaliação</button>
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
import { alterarAvaliacao, byIdDegustador, cadastrarAvaliacao } from '~/common/api/avaliacao_request';
import Cookies from 'js-cookie';


//Campos (select) que devem ser passado por quem usar o componente Form_food
defineProps({
    listaReceitas: Object
});


let listarAvaliacoes = ref();

const avaliacaoModel = defineModel("avaliacaoModel", {
    default: {
        id_avaliacao: 0,
        degustador: { id_func: 4 },
        receita: { id_receita: 0, nome_receita: "" },
        data_avaliada: "2025-05-31",
        nota_avaliacao: 0
    }
});




async function salvar() {
    avaliacaoModel.value.degustador.id_func = Cookies.get("id_user");
    const responseAPI = await alterarAvaliacao(avaliacaoModel.value.id_avaliacao, avaliacaoModel.value);


    if (responseAPI.value.status == "CREATED") {
        fecharForm();
        alert("Avaliação alterada com sucesso!");
        listarAvaliacoes = await byIdDegustador(avaliacaoModel.value.degustador.id_func);
    } else {
        alert(responseAPI.value.data.message);
    }
}


//Fechar formulário
function fecharForm() {
    avaliacaoModel.value.receita.id_receita = 0;
    let container_form_cadastro = document.querySelector(".container_form_edit");
    container_form_cadastro.setAttribute("style", "display:none");
}



</script>

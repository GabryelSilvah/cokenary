<template>

    <section class="container_form container_form_edit">


        <form action="" method="post" class="form" @submit.prevent="pegarDadosForm(receitaModel.id_receita)">

            <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
            <div class="sections">
                <h2 class="topico">Editar Nova Receita</h2>


                <label for="">Nome da Receita:</label>
                <input type="text" v-model="receitaModel.nomeReceita" name="nome_ref"
                    placeholder="Ex: Risoto de camarão" required>


                <label for="">Categoria:</label>
                <select required name="categoria" id="" v-model="receitaModel.categoria_id.id_cat">
                    <option value="0">Selecione</option>
                    <option v-if="categorias" v-for="categoria in categorias.data" :key="categoria.id_cat"
                        :value="categoria.id_cat">
                        {{ categoria.nome_categoria }}
                    </option>
                </select>


                <label for="">Cozinheiro:</label>
                <input type="text" :value="receitaModel.cozinheiro_id.nome">



                <label for="">Ingredientes:</label>
                <div class="container_itens_add" id="caixa_de_itens_salvas">
                    <h2>Adicione ingredientes e suas medidas</h2>
                    <div class="container_composicao" v-for="ingr in receitaModel.ingredientes_id">
                        <p>{{ ingr.ingrediente_id.nome_ingred }} </p>
                        <p>{{ ingr.porcoes }}x</p>
                        <p>{{ ingr.medida_id.nome_med }}</p>
                        <img src="../assets/icones/delete.png" class="img_delete_item"
                            @click="excluir_composicao_ingred(ingr.ingrediente_id.id_ingred)">
                    </div>
                </div>

                <!-- Selecionar composições e ingredientes -->
                <div class="container_checkbox">
                    <div class="checkbox">

                        <!-- Selecionar ingrediente -->
                        <select name="ingrediente" v-model="ingredientes_ref" required class="select_ingred" id="">
                            <option value="0">Selecione</option>
                            <option v-if="ingredientes" v-for="ingrediente in ingredientes.data"
                                :key="ingrediente.id_ingred" :value="ingrediente.id_ingred">
                                {{ ingrediente.nome }}
                            </option>
                        </select>

                        <!-- Quantidade de porções -->
                        <input type="number" min="1" v-model="porcao_ref" class="input_quantidade">


                        <!-- Selecionar medida -->
                        <select name="medida" id="" v-model="medida_ref" required class="select_ingred">
                            <option value="0">Selecione</option>
                            <option v-if="medidas" v-for="medida in medidas.data" :key="medida.id_med"
                                :value="medida.id_med">
                                {{ medida.nome_med }}
                            </option>
                        </select>
                    </div>

                    <button type="button" @click="addIngredienteNaLista" class="btn_adicionar">
                        Adicionar
                    </button>
                </div>


                <label for="">Modo de Preparo:</label>
                <textarea name="" id="" v-model="receitaModel.modo_preparo" placeholder="Descreva o modo de preparo">
                </textarea>


                <button type="submit">Salvar alterações</button>

            </div>
        </form>

    </section>

</template>

<script setup lang="js">
import { byIdIngredientes } from '~/common/api/ingredientes_request';
import { byIdMedidas } from '~/common/api/medida_request';
import { alterarReceitas, cadastrarReceitas } from '~/common/api/receitas_request';
import Cookies from 'js-cookie';

const URL_BASE_API = "http://localhost:8081";



//Campos (select) que devem ser passado por quem usar o componente Form_food
defineProps({
    funcionarios: Object,
    categorias: Object,
    ingredientes: Object,
    medidas: Object
});



const receitaModel = defineModel("receitaModel", {
    default: {
        id_receita: 0,
        nomeReceita: "",
        data_criacao: "",
        categoria_id: { id_cat: 0 },
        cozinheiro_id: { id_func: 0 },
        modo_preparo: "",
        ingredientes_id: [],
        ingredientes_removidos: []
    }
});

//Inicializando variáveis que vão receber dados do formulário
const ingredientes_ref = defineModel("ingredientes_ref");
const medida_ref = defineModel("medida_ref", { default: 0 });
const porcao_ref = defineModel("porcao_ref", { default: 1 });
//const composicao_ref = defineModel("composicao_ref", { default: {} });


//Lista e ingredientes/medidas a serem excluidos da receita
let listaComposicaoIngredExcluir = [];

//Excluir composição de ingrediente/medidas da receita
function excluir_composicao_ingred(id_ingrediente) {

    //Procurando index onde id_receita é igual o id_receita passado para exclusão
    //Se o valor for encontrado, deverá ser removida livroModel
    let index = receitaModel.value.ingredientes_id.findIndex(composicao => composicao.ingrediente_id.id_ingred == id_ingrediente)

    if (receitaModel.value.ingredientes_id.length == 1) {
        alert("Você não pode excluir todos os ingredientes")
    } else {
        //Valor for menor que 0 é porque não foi encontrado
        if (index > -1) {
            receitaModel.value.ingredientes_id.splice(index, 1);
        }
    }

    //Adicionando id_receita na lista de receitas a serem deletadas do vinculo com o livro
    listaComposicaoIngredExcluir.push(id_ingrediente);


}



//Função que é chamda toda vez que um novo ingrediente é adicionado no formulário
//Ela pega o ingrediente e medida e adiciona no obejeto ingredientesModel
//Posteriomente, pegar esse objeto (ingredientesModel) e adiciona no objeto receitaModel, dentro do array de ingredientes_id
async function addIngredienteNaLista() {

    let erro = 0;

    if (ingredientes_ref.value == 0) {
        alert("Informe o ingrediente antes");
        erro++;
    }


    if (medida_ref.value == 0) {
        alert("Informe a medida antes");
        erro++;
    }

    const lista = receitaModel.value.ingredientes_id;
    let ingredExistente = lista.find(ingrediente => ingrediente.ingrediente_id.id_ingred == ingredientes_ref.value);

    if (ingredExistente) {
        alert("Esse ingrediente já foi adicionado");
        erro++;
    }

    if (erro == 0) {


        //Buscando medida pelo ID
        const medidaEncontrada = await byIdMedidas(medida_ref.value);

        //Buscando ingrediente pelo ID
        const ingredienteEncontrado = await byIdIngredientes(ingredientes_ref.value);


        let composicao_ref = {
            ingrediente_id: { id_ingred: 0, nome_ingred: "" },
            porcoes: 1,
            medida_id: { id_med: 0, nome_med: "" }
        };

        //Encontrar ID na lista de receitas a serem excluidas
        //Se o ID for encontrado na lista, deverá ser removido
        //Após removido, a receita selecionada será adicionada na lista de cadastro do livro
        let index = listaComposicaoIngredExcluir.indexOf(ingredienteEncontrado.value.data.id_ingred);


        //Valor for menor que 0 é porque não foi encontrado na (listaReceitasExcluir)
        if (index > -1) {
            listaComposicaoIngredExcluir.splice(index, 1);
        }


        //Pegar ingrediente e medida selecionados e adicionar no objeto (composicao_ref)
        composicao_ref.ingrediente_id.id_ingred = ingredientes_ref.value;
        composicao_ref.ingrediente_id.nome_ingred = ingredienteEncontrado.value.data.nome;
        composicao_ref.medida_id.id_med = medida_ref.value;
        composicao_ref.medida_id.nome_med = medidaEncontrada.value.data.nome_med;
        composicao_ref.porcoes = porcao_ref;


        //Adicionando ingredientes em (receitaModel)
        receitaModel.value.ingredientes_id.push(composicao_ref);
    }
    erro = 0;
}

//Função que recebe os dados após o envio dos dados do formulario e adiciona no objeto receitaModel
//com exerção do do campo ingrediente porque já foi pego pela função addIngredienteNaLista()
async function pegarDadosForm(id_receita) {
    receitaModel.value.ingredientes_removidos = listaComposicaoIngredExcluir;
    receitaModel.value.data_criacao = "2025-05-03";

    receitaModel.value.cozinheiro_id.id_func = Cookies.get("id_user");
    //Enviando dados para API
    let responseAPI = await alterarReceitas(id_receita, receitaModel.value);

    fecharForm();
}


//Fechar formulário
function fecharForm() {

    let container_form_edit = document.querySelector(".container_form_edit");
    container_form_edit.setAttribute("style", "display:none");

}


</script>

<style scoped>
@import url("~/assets/css_components/form.css");
</style>
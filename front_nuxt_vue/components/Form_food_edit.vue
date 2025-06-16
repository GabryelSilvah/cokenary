<template>

    <section class="container_form container_form_edit">


        <form action="" method="post" class="form" @submit.prevent="pegarDadosForm">

            <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
            <div class="sections">
                <h2 class="topico">Editar Nova Receita</h2>


                <label for="">Nome da Receita:</label>
                <input type="text" v-model="nome_ref" name="nome_ref" placeholder="Ex: Risoto de camarão" required>


                <label for="">Categoria:</label>
                <select required name="categoria" id="" v-model="categoria_ref">
                    <option value="0">Selecione</option>
                    <option v-if="categorias" v-for="categoria in categorias.data" :key="categoria.id_cat"
                        :value="categoria.id_cat">
                        {{ categoria.nome_categoria }}
                    </option>
                </select>


                <label for="">Cozinheiro:</label>
                <select name="cozinheiro" id="" v-model="cozinheiro_ref" required>
                    <option value="0">Selecione</option>
                    <option v-if="funcionarios" v-for="cozinheiro in funcionarios.data" :key="cozinheiro.id_func"
                        :value="cozinheiro.id">
                        {{ cozinheiro.nome }}
                    </option>
                </select>


                <label for="">Ingredientes:</label>
                <div class="container_itens_add" id="caixa_de_itens_salvas">
                    <h2>Adicione ingredientes e suas medidas</h2>
                    <div class="container_composicao" v-for="ingr in receitaModel.ingredientes_id">
                        <p>{{ ingr.ingrediente_id.nome_ingred }}</p>
                        <p>{{ ingr.medida_id.nome_med }}</p>
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
                        <input type="number" min="1" value="1" class="input_quantidade">


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
                <textarea name="" id="" v-model="modo_preparo_ref" placeholder="Descreva o modo de preparo">
                </textarea>


                <button type="submit">Salvar alterações</button>

            </div>


            <!--
                Funcionalidade para adicionar se ainda houver prazo

                <div class="sections">
                <h2 class="topico">Detalhes e valores nutricionais</h2>
                <label for="">Tempo de preparo:</label>
                <input type="text">

                <label for="">Tempo de cozimento:</label>
                <input type="text">

                <label for="">Calorias:</label>
                <input type="text">

                <label for="">Carboidratos:</label>
                <input type="text">


                <label for="">Proteínas:</label>
                <input type="text">

                <label for="">Gorduras:</label>
                <input type="text">


            </div>-->
        </form>

    </section>

</template>

<script setup scoped lang="js">
import { alterarReceitas, cadastrarReceitas } from '~/common/api/receitas_request';


const URL_BASE_API = "http://localhost:8081";



//Campos (select) que devem ser passado por quem usar o componente Form_food
defineProps({
    funcionarios: Object,
    categorias: Object,
    ingredientes: Object,
    medidas: Object
});


//Inicializando variáveis que vão receber dados do formulário
const nome_ref = defineModel('nome_ref');
const categoria_ref = defineModel('categoria_ref');
const cozinheiro_ref = defineModel('cozinheiro_ref');
const modo_preparo_ref = defineModel('modo_preparo_ref');
const ingredientes_ref = defineModel("ingredientes_ref");
const medida_ref = defineModel("medida_ref");

const receitaModel = defineModel("receitaModel", {
    default: {
        nomeReceita: "",
        data_criacao: "",
        categoria_id: { id_cat: 0 },
        cozinheiro_id: { id_func: 0 },
        modo_preparo: "",
        ingredientes_id: []
    }
});

const composicao_ref = defineModel("composicao_ref");



//Função que é chamda toda vez que um novo ingrediente é adicionado no formulário
//Ela pega o ingrediente e medida e adiciona no obejeto ingredientesModel
//Posteriomente, pegar esse objeto (ingredientesModel) e adiciona no objeto receitaModel, dentro do array de ingredientes_id
async function addIngredienteNaLista() {

    //Request de ingredientes (recebendo ingrediente procurado pelo ID)
    let {
        data: medidaEncontrada, //armazenando lista de medida vindo da API (back-end)
        error: errosMedida //Capturando erros da requisição
    } = await useFetch(URL_BASE_API + "/receitas/medida/byId/" + medida_ref.value);


    //Request de ingredientes (recebendo ingrediente procurado pelo ID)
    let {
        data: ingredienteEncontrado, //armazenando lista de ingredientes vindo da API (back-end)
        error: errosIngredientes //Capturando erros da requisição
    } = await useFetch(URL_BASE_API + "/ingredientes/byId/" + ingredientes_ref.value);


    composicao_ref.value = {
        ingrediente_id: { id_ingred: 0, nome_ingred: "" },
        medida_id: { id_med: 0, nome_med: "" }
    };


    //Pegar ingrediente e medida selecionados e adicionar no objeto (composicao_ref)
    composicao_ref.value.ingrediente_id.id_ingred = ingredientes_ref.value;
    composicao_ref.value.ingrediente_id.nome_ingred = ingredienteEncontrado.value.data.nome;
    composicao_ref.value.medida_id.id_med = medida_ref.value;
    composicao_ref.value.medida_id.nome_med = medidaEncontrada.value.data.nome_med;



    //Adicionando ingredientes em (receitaModel)
    receitaModel.value.ingredientes_id.push(composicao_ref.value);



}


//Função que recebe os dados após o envio dos dados do formulario e adiciona no objeto receitaModel
//com exerção do do campo ingrediente porque já foi pego pela função addIngredienteNaLista()
async function pegarDadosForm() {


    receitaModel.value.nomeReceita = nome_ref.value;
    receitaModel.value.data_criacao = "2025-05-03";
    receitaModel.value.categoria_id.id_cat = categoria_ref.value;
    receitaModel.value.cozinheiro_id.id_func = cozinheiro_ref.value;
    receitaModel.value.modo_preparo = modo_preparo_ref.value;



    //Enviando dados para API
    let responseAPI = await alterarReceitas(receitaModel.value);


    console.log(JSON.stringify(receitaModel.value));
    console.log(responseAPI.value);

    fecharForm();
}


//Fechar formulário
function fecharForm() {
    let container_form_edit = document.querySelector(".container_form_edit");
    container_form_edit.setAttribute("style", "display:none");
}


//Função para exibir uma lista de cada ingrediente que está sendo adicionado 
// async function exibir_ingrediente_add() {

//     //Request de ingredientes (recebendo ingrediente procurado pelo ID)
//     let {
//         data: medidaEncontrada, //armazenando lista de medida vindo da API (back-end)
//         error: errosMedida //Capturando erros da requisição
//     } = await useFetch(URL_BASE_API + "/receitas/medida/byId/" + medida_ref.value);


//     //Request de ingredientes (recebendo ingrediente procurado pelo ID)
//     let {
//         data: ingredienteEncontrado, //armazenando lista de ingredientes vindo da API (back-end)
//         error: errosIngredientes //Capturando erros da requisição
//     } = await useFetch(URL_BASE_API + "/ingredientes/byId/" + ingredientes_ref.value);


//     //Exibir no formulário caixa com lista de ingredientes adicionados para cadastro
//     let caixa_de_itens_salvas = document.getElementById("caixa_de_itens_salvas");
//     let ingredAdd = document.createElement("p");

//     if (ingredienteEncontrado.value) {
//         ingredAdd.textContent = ingredienteEncontrado.value.data.nome;
//     }

//     let medidaAdd = document.createElement("p");
//     if (medidaEncontrada.value) {
//         medidaAdd.textContent = medidaEncontrada.value.data.nome_med;
//     }


//     let div = document.createElement("div");
//     div.classList.add("container_composicao");

//     div.appendChild(ingredAdd);
//     div.appendChild(medidaAdd);

//     caixa_de_itens_salvas.insertAdjacentElement("beforeend", div);
// }

</script>

<style scoped>
@import url("~/assets/css_components/form.css");
</style>
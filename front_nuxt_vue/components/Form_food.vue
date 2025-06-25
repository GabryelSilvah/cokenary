<template>

    <section class="container_form_cadastro container_form">


        <form action="" method="post" class="form" @submit.prevent="pegarDadosForm">

            <img src="public/icones/close.png" id="btn_close" @click="fecharForm">
            <div class="sections">
                <h2 class="topico">Cadastrar Nova Receita</h2>


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



                <label for="">Ingredientes:</label>
                <div class="container_itens_add" id="caixa_de_itens_salvas">
                    <h2>Adicione ingredientes e suas medidas</h2>
                    <div class="container_composicao" v-for="ingr in receitaModel.ingredientes_id">
                        <p>Ingred: {{ ingr.ingrediente_id.nome_ingred }}</p>
                        <p>Porções: {{ ingr.porcoes }}</p>
                        <p>Medida: {{ ingr.medida_id.nome_med }}</p>
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
                <textarea required v-model="receitaModel.modo_preparo" placeholder="Descreva o modo de preparo">
                </textarea>


                <button type="submit">Salvar</button>

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

<style scoped>
@import url("~/assets/css_components/form.css");
</style>


<script setup scoped lang="js">
import { cadastrarReceitas, listarReceitas } from '~/common/api/receitas_request';
import Cookies from 'js-cookie';
import { byIdMedidas } from '~/common/api/medida_request';
import { byIdIngredientes } from '~/common/api/ingredientes_request';

const URL_BASE_API = "http://localhost:8081";



//Campos (select) que devem ser passado por quem usar o componente Form_food
defineProps({
    funcionarios: Object,
    categorias: Object,
    ingredientes: Object,
    medidas: Object
});


let listasReceitas = ref();



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


//Inicializando variáveis que vão receber dados do formulário
const ingredientes_ref = defineModel("ingredientes_ref", { default: 0 });
const medida_ref = defineModel("medida_ref", { default: 0 });
const porcao_ref = defineModel("porcao_ref", { default: 1 });
const composicao_ref = defineModel("composicao_ref", { default: {} });



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

    if (erro == 0) {


        //Request de ingredientes (recebendo ingrediente procurado pelo ID)
        let ingredienteEncontrado = await byIdIngredientes(ingredientes_ref.value);


        //Request de ingredientes (recebendo ingrediente procurado pelo ID)
        let medidaEncontrada = await byIdMedidas(medida_ref.value);


        let compor = {
            ingrediente_id: { id_ingred: 0, nome_ingred: "" },
            porcoes: 1,
            medida_id: { id_med: 0, nome_med: "" }
        };


        //Pegar ingrediente e medida selecionados e adicionar no objeto (composicao_ref)
        compor.ingrediente_id.id_ingred = ingredienteEncontrado.value.data.id_ingred;
        compor.ingrediente_id.nome_ingred = ingredienteEncontrado.value.data.nome;

        compor.medida_id.id_med = medidaEncontrada.value.data.id_med;
        compor.medida_id.nome_med = medidaEncontrada.value.data.nome_med;
        compor.porcoes = porcao_ref;


        //Adicionando ingredientes em (receitaModel)
        receitaModel.value.ingredientes_id.push(compor);
    }

    erro = 0;
}


//Função que recebe os dados após o envio dos dados do formulario e adiciona no objeto receitaModel
//com exerção do do campo ingrediente porque já foi pego pela função addIngredienteNaLista()
async function pegarDadosForm() {
    let erros = 0;

    if (receitaModel.value.categoria_id.id_cat == 0) {
        alert("Adicione uma categoria");
        erros++;
    }


    if (receitaModel.value.ingredientes_id.length == 0) {
        alert("Adicione ao menos um ingrediente");
        erros++;
    }


    if (erros == 0) {
        receitaModel.value.cozinheiro_id.id_func = Cookies.get("id_user");
        console.log("Model: " + JSON.stringify(receitaModel.value));

        let responseAPI = await cadastrarReceitas(receitaModel.value);


        if (responseAPI.value.status == "CREATED") {
            fecharForm();
            alert("Receita cadastrada com sucesso!");
            listasReceitas.value = await listarReceitas();
        } else {
            alert(responseAPI.value.data.message);
        }
    }

    erros = 0;
}


//Fechar formulário
function fecharForm() {
    let container_form_cadastro = document.querySelector(".container_form_cadastro");
    container_form_cadastro.setAttribute("style", "display:none");
}

</script>

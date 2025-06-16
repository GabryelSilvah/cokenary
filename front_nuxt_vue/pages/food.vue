<template>

    <Menu />

    <main>
        <section class="container_topico">
            <h2 class="titulo_topico">Receitas</h2>

            <div class="container_btn_opcoes">
                <button id="btn_add_food" @click="abrirForm">
                    <img src="public/icones/plus.png" alt="">
                    Adicionar Receita
                </button>
            </div>
        </section>

        <form class="search" method="post">
            <input type="text" name="" id="" placeholder="Pesquisar foods">
            <button type="submit">Pesquisar</button>
        </form>

        <section class="container_food">
            <div class="foods" v-if="listasReceitas" v-for="receita in listasReceitas.data" :key="receita.id_receita"
                @remove="removerCardReita(receita.id_receita)">
                <img src="public/image/lamen.jpg">


                <h2 class="titulo_food">{{ receita.nome_receita }}</h2>
                <div class="itens_food">
                    <p>Data Publicação: </p>
                    <p>{{ receita.data_criacao }}</p>
                </div>

                <div class="itens_food">
                    <p>Categoria: </p>
                    <p>{{ receita.categoria }}</p>
                </div>


                <div class="container_btn">
                    <NuxtLink :to="{ path: `/descricao_food`, query: { id_receita: receita.id_receita } }"
                        class="btn_acoes_food">
                        <img src="public/icones/ver.png">
                        Ver
                    </NuxtLink>


                    <button class="btn_acoes_food" @click="abrirFormEdit(receita)">
                        <img src="public/icones/editar.png">
                        Editar
                    </button>


                    <button id="btn_excluir" class="btn_acoes_food" @click="excluir_receita(receita.id_receita)">
                        <img src="public/icones/delete.png">
                        Excluir
                    </button>
                </div>
            </div>
        </section>


        <!-- Chamando componente de formulário e passando dados vindo da API para os campos de select no formulario -->
        <FormFood id="form" :categorias="listasCategorias" :ingredientes="listasIngredientes" :medidas="listasMedidas"
            :funcionarios="listasFuncionarios" v-model:nome_ref="nome_ref" v-model:categoria_ref="categoria_ref"
            v-model:cozinheiro_ref="cozinheiro_ref" v-model:modo_preparo_ref="modo_preparo_ref"
            v-model:ingredientes_ref="ingredientes_ref" v-model:composicao_ref="composicao_ref"
            v-model:receitaModel="receitaModel" />

        <!-- Chamando componente de formulário e passando dados vindo da API para os campos de select no formulario -->
        <Form_food_edit id="formEdit" :categorias="listasCategorias" :ingredientes="listasIngredientes"
            :medidas="listasMedidas" :funcionarios="listasFuncionarios" v-model:nome_ref="nome_ref"
            v-model:categoria_ref="categoria_ref" v-model:cozinheiro_ref="cozinheiro_ref"
            v-model:modo_preparo_ref="modo_preparo_ref" v-model:ingredientes_ref="ingredientes_ref"
            v-model:composicao_ref="composicao_ref" v-model:receitaModel="receitaModel" />

    </main>
</template>


<style>
@import url("~/assets/css/food.css");
</style>


<script setup scoped lang="js">
import { listarCategorias } from '~/common/api/categorias_request';
import { listarFuncionarios } from '~/common/api/funcionarios_request';
import { listarIngredientes } from '~/common/api/ingredientes_request';
import { listarMedidas } from '~/common/api/medida_request';
import { deletarReceitas, listarReceitas, byIdAllInfor } from '~/common/api/receitas_request';
import Form_food_edit from '~/components/Form_food_edit.vue';



//Request de receitas (recebendo lista de receitas)
const listasReceitas = await listarReceitas();


//Request de categorias (recebendo lista de categorias de receitas)
const listasCategorias = await listarCategorias();


const listasIngredientes = await listarIngredientes();


//Request de medidas (recebendo lista de categorias de receitas)
const listasMedidas = await listarMedidas();


//Request de funcionários (recebendo lista de categorias de receitas)
const listasFuncionarios = await listarFuncionarios();


//Inicializando variáveis que vão receber dados do formulário
const nome_ref = ref("");
const categoria_ref = ref(0);
const cozinheiro_ref = ref(0);
const modo_preparo_ref = ref("");
const ingredientes_ref = ref(0);
const medida_ref = ref(0);

const receitaModel = ref("receitaModel");

const composicao_ref = ref({
    medida_id: { id_med: 0 },
    ingrediente_id: { id_ingred: 0 }

});


//Função para exibir formulário
function abrirForm() {

    receitaModel.value = {
        nomeReceita: "",
        data_criacao: "",
        categoria_id: { id_cat: 0 },
        cozinheiro_id: { id_func: 0 },
        modo_preparo: "",
        ingredientes_id: []
    };

    //Exibindo formulário
    let form = document.querySelector("#form");
    form.setAttribute("style", "display:flex");
}


//Apresentar/exibir formulário de cadastro de receita
async function abrirFormEdit(dados_receita) {

    receitaModel.value = {
        nomeReceita: "",
        data_criacao: "",
        categoria_id: { id_cat: 0 },
        cozinheiro_id: { id_func: 0 },
        modo_preparo: "",
        ingredientes_id: []
    };

    //Se houverem dados é porque o envento de click foi acionado pelo button de editar
    if (dados_receita.id_receita != null) {
        const receitaDetalahada = await byIdAllInfor(dados_receita.id_receita);

        console.log(JSON.stringify(receitaDetalahada.value.data.id_cat))
        nome_ref.value = receitaDetalahada.value.data.nome_receita;
        modo_preparo_ref.value = dados_receita.modo_preparo;
        categoria_ref.value = receitaDetalahada.value.data.id_cat;
        cozinheiro_ref.value = receitaDetalahada.value.data.id_func;



        for (let i = 0; i < receitaDetalahada.value.data.composicao.length; i++) {

            composicao_ref.value = {
                ingrediente_id: { id_ingred: 0, nome_ingred: "" },
                medida_id: { id_med: 0, nome_med: "" }
            };

            //Pegar ingrediente e medida selecionados e adicionar no objeto (composicao_ref)
            composicao_ref.value.ingrediente_id.id_ingred = receitaDetalahada.value.data.composicao[i].id_ingred;
            composicao_ref.value.ingrediente_id.nome_ingred = receitaDetalahada.value.data.composicao[i].nome_ingred;
            composicao_ref.value.medida_id.id_med = receitaDetalahada.value.data.composicao[i].id_med;
            composicao_ref.value.medida_id.nome_med = receitaDetalahada.value.data.composicao[i].nome_med;

            //Adicionando ingredientes em (receitaModel)
            receitaModel.value.ingredientes_id.push(composicao_ref.value);

        }



        dados_receita = null;
    }

    //Exibindo formulário
    let form = document.querySelector("#formEdit");
    form.setAttribute("style", "display:flex");
}



//Função usada para excluir receita atravé do evento de click no button
async function excluir_receita(id_receita) {
    //Request de receitas (recebendo lista de receitas)
    const receitaExcluida = await deletarReceitas(id_receita);
}

</script>
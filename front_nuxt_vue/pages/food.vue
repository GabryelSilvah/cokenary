<template>

    <Menu />

    <main v-if="role_usuario == 'cozinheiro'">
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

            <div>


            </div>

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
            v-model:ingredientes_ref="ingredientes_ref" v-model:composicao_ref="composicao_ref"
            v-model:receitaModel="receitaModel" />

        <!-- Chamando componente de formulário e passando dados vindo da API para os campos de select no formulario -->
        <Form_food_edit id="formEdit" :categorias="listasCategorias" :ingredientes="listasIngredientes"
            :medidas="listasMedidas" v-model:ingredientes_ref="ingredientes_ref" v-model:composicao_ref="composicao_ref"
            v-model:receitaModel="receitaModel" />

    </main>

    <div v-else class="mensagem_acesso">
        Seu nível de acesso não é compatível com essa funcionalidade...
    </div>
</template>


<style scoped>
@import url("~/assets/css/food.css");
@import url("~/assets/css/acesso_role.css");
</style>


<script setup lang="js">
import { listarCategorias } from '~/common/api/categorias_request';
import { byNomeCargoFuncionarios } from '~/common/api/funcionarios_request';
import { listarIngredientes } from '~/common/api/ingredientes_request';
import { listarMedidas } from '~/common/api/medida_request';
import { deletarReceitas, byIdAllInfor, listarReceitas } from '~/common/api/receitas_request';
import Form_food_edit from '~/components/Form_food_edit.vue';
import Cookies from 'js-cookie';
import { useCookie } from '#app'


const role_usuario = Cookies.get("cargo_user");



//Request de receitas (recebendo lista de receitas)
let listasReceitas = ref(await listarReceitas());


//Request de categorias (recebendo lista de categorias de receitas)
const listasCategorias = await listarCategorias();


const listasIngredientes = await listarIngredientes();


//Request de medidas (recebendo lista de categorias de receitas)
const listasMedidas = await listarMedidas();




//Inicializando variáveis que vão receber dados do formulário
const ingredientes_ref = ref(0);
const medida_ref = ref(0);
const receitaModel = ref({
    nomeReceita: "",
    data_criacao: "",
    categoria_id: { id_cat: 0 },
    cozinheiro_id: { id_func: 0 },
    modo_preparo: "",
    ingredientes_id: []
});


const composicao_ref = ref({});


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
        id_receita: 0,
        nomeReceita: "",
        data_criacao: "",
        categoria_id: { id_cat: 0 },
        cozinheiro_id: { id_func: 0, nome: "" },
        modo_preparo: "",
        ingredientes_id: []
    };

    //Se houverem dados é porque o envento de click foi acionado pelo button de editar
    if (dados_receita.id_receita != null) {
        const receitaDetalahada = await byIdAllInfor(dados_receita.id_receita);
     
        if (receitaDetalahada) {

            receitaModel.value.id_receita = receitaDetalahada.id_receita;
            receitaModel.value.nomeReceita = receitaDetalahada.nome_receita;
            receitaModel.value.categoria_id.id_cat = receitaDetalahada.id_cat;
            receitaModel.value.cozinheiro_id.id_func = Cookies.get("id_user");
            receitaModel.value.cozinheiro_id.nome = receitaDetalahada.cozinheiro_id;
            receitaModel.value.modo_preparo = dados_receita.modo_preparo;



            for (let i = 0; i < receitaDetalahada.composicao.length; i++) {

                composicao_ref.value = {
                    id_composicao: 0,
                    ingrediente_id: { id_ingred: 0, nome_ingred: "" },
                    porcoes: 1,
                    medida_id: { id_med: 0, nome_med: "" }
                };

                //Pegar ingrediente e medida selecionados e adicionar no objeto (composicao_ref)
                composicao_ref.value.id_composicao = receitaDetalahada.composicao[i].id_composicao;
                composicao_ref.value.ingrediente_id.id_ingred = receitaDetalahada.composicao[i].id_ingred;
                composicao_ref.value.ingrediente_id.nome_ingred = receitaDetalahada.composicao[i].nome_ingred;
                composicao_ref.value.medida_id.id_med = receitaDetalahada.composicao[i].id_med;
                composicao_ref.value.medida_id.nome_med = receitaDetalahada.composicao[i].nome_med;
                composicao_ref.value.porcoes = receitaDetalahada.composicao[i].porcoes;

                //Adicionando ingredientes em (receitaModel)
                receitaModel.value.ingredientes_id.push(composicao_ref.value);

            }

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
    listasReceitas = await listarReceitas();
}




</script>

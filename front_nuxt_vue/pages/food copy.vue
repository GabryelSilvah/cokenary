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


                    <button class="btn_acoes_food" @click="abrirForm(receita)">
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
            :funcionarios="listasFuncionarios"/>

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
import { deletarReceitas, listarReceitas } from '~/common/api/receitas_request';



//Request de receitas (recebendo lista de receitas)
const listasReceitas = await listarReceitas();


//Request de categorias (recebendo lista de categorias de receitas)
const listasCategorias = await listarCategorias();


const listasIngredientes = await listarIngredientes();


//Request de medidas (recebendo lista de categorias de receitas)
const listasMedidas = await listarMedidas();


//Request de funcionários (recebendo lista de categorias de receitas)
const listasFuncionarios = await listarFuncionarios();


//Apresentar/exibir formulário de cadastro de receita
function abrirForm(dados_receita = null) {
    let form = document.querySelector("#form");
    form.setAttribute("style", "display:flex");
}

async function alterando_receita(id_receita) {

    //Request de receitas (alterando receitas)
    const receitaAlterada = await alterando_receita(id_receita);

}


//Função usada para excluir receita atravé do evento de click no button
async function excluir_receita(id_receita) {
    //Request de receitas (recebendo lista de receitas)
    const receitaExcluida = await deletarReceitas(id_receita);
}

//Refresh na página após excluir receita
function removerCardReita(index) {
    listasReceitas.value.data.slice(index, 1);
}

</script>
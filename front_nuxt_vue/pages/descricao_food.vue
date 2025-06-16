<template>

    <Menu />

    <main>

        <section class="container_desc_food">
            <div class="detalhes" v-if="receitaPorID">
                <h2 class="titulo_food">{{ receitaPorID.data.nome_receita }}</h2>
                <p id="modo_preparo">
                    {{ receitaPorID.data.modo_preparo }}
                </p>
                <div class="itens_food">
                    <p>Categoria: </p>
                    <p>{{ receitaPorID.data.categoria }}</p>
                </div>
            </div>
            <img src="public/image/lamen2.jpg" class="img_food" alt="">
        </section>

        <!--
    Funcionalidade futura, dependendo do prazo, implementar
    <section class="container_desc_food">
        <div class="detalhes">
            <p>Tempo de preparo: </p>
            <p>Tempo de cozimento: </p>
            <p>Tempo Total: </p>
            <p>Poções: </p>
        </div>

        <div class="detalhes">
            <p>Calorias: </p>
            <p>Carboidratos: </p>
            <p>Proteínas: </p>
            <p>Gorduras: </p>
        </div>
    </section>
-->
        <section class="container_desc_food">
            <div class="container_width" v-if="receitaPorID">
                <h2 class="subtitulo">Ingredientes</h2>

                <ul class="lista_ingredientes" v-for="ingrediente in receitaPorID.data.ingredientes_id"
                    :key="ingrediente.id_ingred">
                    <li>{{ ingrediente.nome }} {{ ingrediente.nome_med }}</li>
                </ul>
            </div>
        </section>

    </main>

</template>


//Estilização, sendo importada da pasta assets, css
<style>
@import url("~/assets/css/descricao_food.css");
</style>


//Funcionalidades e chamadas das rotas da APIs
<script setup scoped lang="js">

const route = useRoute();


//Recebendo dados, lista de receitas salvas
const {
    data: receitaPorID, //armazenando lista de receitas vindo da API (back-end)
    error: errosRequestReceitas //Capturando erros da requisição
} = await useFetch("http://localhost:8081/receitas/byId/" + route.query.id_receita);


</script>
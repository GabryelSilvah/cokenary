<template>

    <Menu />

    <main v-if="role_usuario == 'cozinheiro'">

        <section class="container_desc_food">
            <div class="detalhes" v-if="receitaPorID">
                <h2 class="titulo_food">{{ receitaPorID.nome_receita }}</h2>

                <div class="itens_food">
                    <p>Categoria: </p>
                    <p>{{ receitaPorID.categoria }}</p>
                </div>

                <p id="modo_preparo">
                    {{ receitaPorID.modo_preparo }}
                </p>
            </div>
            <img src="public/image/lamen2.jpg" class="img_food" alt="">
        </section>

        <section class="container_desc_food">
            <div class="container_width" v-if="receitaPorID">
                <h2 class="subtitulo">Ingredientes</h2>

                <ul class="lista_ingredientes" v-for="ingrediente in receitaPorID.ingredientes_id"
                    :key="ingrediente.id_ingred">
                    <li>{{ ingrediente.nome }} - {{ ingrediente.porcoes }} {{ ingrediente.nome_med }}</li>
                </ul>
            </div>
        </section>

    </main>

    <div v-else class="mensagem_acesso">
        Seu nível de acesso não é compatível com essa funcionalidade...
    </div>

</template>


//Estilização, sendo importada da pasta assets, css
<style scoped>
@import url("~/assets/css/descricao_food.css");
@import url("~/assets/css/acesso_role.css");
</style>


//Funcionalidades e chamadas das rotas da APIs
<script setup scoped lang="js">
import { byIdReceitas } from '~/common/api/receitas_request';
import Cookies from 'js-cookie';

const role_usuario = Cookies.get("cargo_user");

const route = useRoute();


//Recebendo dados, lista de receitas salvas
const receitaPorID = await byIdReceitas(route.query.id_receita);
console.log(receitaPorID);

</script>
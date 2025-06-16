<template>

    <Menu />

    <main>


        <section class="banner_page">
            <img src="public/image/banner_page.png" alt="">
            <h1 class="name_page">Best Food</h1>
        </section>

        <h2 class="topico_section">Foods Recentes</h2>
        <section class="foods_recentes">

            <div class="foods">
                <img src="public/image/lamen.jpg">
                <h2 class="titulo_food" th:text="${titulo_food}">Nome da comida</h2>
                <div class="itens_food">
                    <p>Descrição: </p>
                    <p>Macarrão, ovo, carne...</p>
                </div>

                <div class="itens_food">
                    <p>Categoria: </p>
                    <p>Típicas</p>
                </div>

                <div class="container_btn">
                    <a href="descricao_food" class="btn_acoes_food">
                        <img src="public/icones/ver.png">
                        Ver
                    </a>
                </div>
            </div>
        </section>
    </main>

</template>

<style>
@import url("~/assets/css/home.css");
</style>
package com.receitas.dto;

public record ReceitaDTO(
        Long id_receita,
        String nome_receita,
        String categoria,
        String cozinheiro,
        String modo_preparo
) {
}

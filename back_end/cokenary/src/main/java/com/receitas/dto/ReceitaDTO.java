package com.receitas.dto;

import com.receitas.model.Ingrediente;

import java.util.List;

public record ReceitaDTO(
        Long id_receita,
        String nome_receita,
        String categoria,
        String cozinheiro,
        String modo_preparo,
        String data_criacao,
        List<Ingrediente> ingredientes_id
) {
}

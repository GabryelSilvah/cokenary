package com.receitas.dto;

import com.receitas.model.Ingrediente;
import com.receitas.model.Ingredientes_receita;
import com.receitas.model.Receitas_and_ingredientes;

import java.util.Date;
import java.util.List;

public record ReceitaDTO(
        Long id_receita,
        String nome_receita,
        String categoria,
        String cozinheiro,
        String modo_preparo,
        Date data_criacao,
        List<Ingredientes_receita> ingredientes_id
) {
}

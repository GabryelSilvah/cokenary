package com.receitas.dto;

import java.util.Date;

public record AvaliacaoDTO(
        Long id,
        String degustador_id,
        String cozinheiro_id,
        String nome_receita_id,
        Date data_avaliada,
        int nota_avalicao
) {
}

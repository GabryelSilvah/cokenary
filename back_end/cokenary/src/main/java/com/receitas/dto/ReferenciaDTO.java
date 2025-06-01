package com.receitas.dto;

import java.util.Date;

public record ReferenciaDTO(
        Long id,
        String funcionario,
        String restaurante,
        Date data_inicio,
        Date data_fim
) {
}
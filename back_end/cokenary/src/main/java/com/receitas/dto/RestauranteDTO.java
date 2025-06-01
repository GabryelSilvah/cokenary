package com.receitas.dto;

public record RestauranteDTO(
        Long idRestaurante,
        String nome,
        String contato,
        String telefone
) {
}
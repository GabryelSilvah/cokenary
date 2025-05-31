package com.receitas.dto;

import java.util.Date;

public record FuncionarioDTO(Long id, String nome, int rg, Date dt_adm, float salario, String cargo, String imagem_perfil) {
}

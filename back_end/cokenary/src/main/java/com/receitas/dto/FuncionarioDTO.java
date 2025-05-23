package com.receitas.dto;

import java.util.Date;

public record FuncionarioDTO(String nome, int rg, Date dt_adm, float salario, String cargo) {
}

package com.receitas.dto;

import java.util.Date;

public record CargoDTO(Long id , String nome, String descricao, Date data_inicio, Date data_fim, boolean indAtivo) {


}

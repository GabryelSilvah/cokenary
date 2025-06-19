package com.receitas.dto;

import com.receitas.model.Cargo;

public record AuthDTO(String email, String senha, Cargo role) {

}


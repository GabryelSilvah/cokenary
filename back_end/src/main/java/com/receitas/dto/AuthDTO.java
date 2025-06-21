package com.receitas.dto;

import com.receitas.model.Cargo;

public class AuthDTO {
    private Long id_user;
    private String email;
    private String senha;
    private Cargo role;


    //Construtores
    public AuthDTO() {
    }

    public AuthDTO(Long id_user) {
        this.id_user = id_user;
    }

    public AuthDTO(Long id_user, String email, String senha, Cargo role) {
        this.id_user = id_user;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }


    //Gets e sets

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Cargo getRole() {
        return role;
    }

    public void setRole(Cargo role) {
        this.role = role;
    }
}


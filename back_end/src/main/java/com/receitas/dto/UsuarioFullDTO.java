package com.receitas.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;

import java.util.List;


public class UsuarioFullDTO {

    private Long id_usuario;

    private String nome_usuario;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String senha;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Cargo> role;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Funcionario fk_funcionario;

    //Construtores

    public UsuarioFullDTO() {
    }

    public UsuarioFullDTO(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public UsuarioFullDTO(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }



    public UsuarioFullDTO(Long id_usuario, String nome_usuario) {
        this.id_usuario = id_usuario;
        this.nome_usuario = nome_usuario;
    }

    public UsuarioFullDTO(Long id_usuario, String nome_usuario, String senha, List<Cargo> role, Funcionario fk_funcionario) {
        this.id_usuario = id_usuario;
        this.nome_usuario = nome_usuario;
        this.senha = senha;
        this.role = role;
        this.fk_funcionario = fk_funcionario;
    }

    //Gets e sets


    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNome_usuario() {
        return nome_usuario;
    }

    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<Cargo> getRole() {
        return role;
    }

    public void setRole(List<Cargo> role) {
        this.role = role;
    }

    public Funcionario getFk_funcionario() {
        return fk_funcionario;
    }

    public void setFk_funcionario(Funcionario fk_funcionario) {
        this.fk_funcionario = fk_funcionario;
    }
}

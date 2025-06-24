package com.receitas.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.receitas.model.Cargo;
import com.receitas.model.Restaurante;

import java.util.Date;
import java.util.List;

public class Funcionario_usuarioDTO {
    private Long id;
    private String nome;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long rg;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date dt_adm;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private float salario;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Cargo cargo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nome_cargo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String imagem_perfil;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Restaurante> listaRestaurante;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nome_usuario;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String senha_usuarios;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String senha_confir;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private boolean status;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date data_update;


    //Construtor
    public Funcionario_usuarioDTO(){

    }

    public Funcionario_usuarioDTO(String nome, Long rg, float salario, Cargo cargo, String imagem_perfil, List<Restaurante> listaRestaurante, String nome_usuario, String senha_usuarios, boolean status) {
        this.nome = nome;
        this.rg = rg;
        this.salario = salario;
        this.cargo = cargo;
        this.imagem_perfil = imagem_perfil;
        this.listaRestaurante = listaRestaurante;
        this.nome_usuario = nome_usuario;
        this.senha_usuarios = senha_usuarios;
        this.status = status;
    }

    public Funcionario_usuarioDTO(Long id, String nome, Long rg, Date dt_adm, float salario, Cargo cargo, String imagem_perfil, List<Restaurante> listaRestaurante, String nome_usuario, boolean status, Date data_update) {
        this.id = id;
        this.nome = nome;
        this.rg = rg;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.cargo = cargo;
        this.imagem_perfil = imagem_perfil;
        this.listaRestaurante = listaRestaurante;
        this.nome_usuario = nome_usuario;
        this.status = status;
        this.data_update = data_update;
    }


    //Gets e sets


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getRg() {
        return rg;
    }

    public void setRg(Long rg) {
        this.rg = rg;
    }

    public Date getDt_adm() {
        return dt_adm;
    }

    public void setDt_adm(Date dt_adm) {
        this.dt_adm = dt_adm;
    }

    public float getSalario() {
        return salario;
    }

    public void setSalario(float salario) {
        this.salario = salario;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public String getNome_cargo() {
        return nome_cargo;
    }

    public void setNome_cargo(String nome_cargo) {
        this.nome_cargo = nome_cargo;
    }

    public String getImagem_perfil() {
        return imagem_perfil;
    }

    public void setImagem_perfil(String imagem_perfil) {
        this.imagem_perfil = imagem_perfil;
    }

    public List<Restaurante> getListaRestaurante() {
        return listaRestaurante;
    }

    public void setListaRestaurante(List<Restaurante> listaRestaurante) {
        this.listaRestaurante = listaRestaurante;
    }

    public String getNome_usuario() {
        return nome_usuario;
    }

    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }

    public String getSenha_usuarios() {
        return senha_usuarios;
    }

    public void setSenha_usuarios(String senha_usuarios) {
        this.senha_usuarios = senha_usuarios;
    }

    public String getSenha_confir() {
        return senha_confir;
    }

    public void setSenha_confir(String senha_confir) {
        this.senha_confir = senha_confir;
    }

    public boolean getStatusFunc() {
        return status;
    }

    public void setStatusFunc(boolean status) {
        this.status = status;
    }

    public Date getData_update() {
        return data_update;
    }

    public void setData_update(Date data_update) {
        this.data_update = data_update;
    }
}

package com.receitas.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.receitas.model.Cargo;
import com.receitas.model.Restaurante;

import java.util.Date;
import java.util.List;

public class FuncionarioSaidaDTO {

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


    //Construtores
    public FuncionarioSaidaDTO() {
    }

    public FuncionarioSaidaDTO(Long id) {
        this.id = id;
    }

    public FuncionarioSaidaDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public FuncionarioSaidaDTO(Long id, String nome, Long rg, Date dt_adm, float salario, String nome_cargo, String imagem_perfil, List<Restaurante> listaRestaurante) {
        this.id = id;
        this.nome = nome;
        this.rg = rg;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.nome_cargo = nome_cargo;
        this.imagem_perfil = imagem_perfil;
        this.listaRestaurante = listaRestaurante;
    }

    public FuncionarioSaidaDTO(Long id, String nome, Long rg, Date dt_adm, float salario, String nome_cargo, String imagem_perfil) {
        this.id = id;
        this.nome = nome;
        this.rg = rg;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.nome_cargo = nome_cargo;
        this.imagem_perfil = imagem_perfil;
    }

    //Gets e sets
    public Long getId_func() {
        return id;
    }

    public void setId_func(Long id) {
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
}

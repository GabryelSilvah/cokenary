package com.receitas.dto;

import com.receitas.model.Cargo;
import com.receitas.model.Restaurante;

import java.util.Date;
import java.util.List;

public class FuncionarioChegadaDTO {

    private Long id;
    private String nome;
    private Long rg;
    private Date dt_adm;
    private float salario;
    private Cargo cargo;
    private String nome_cargo;
    private String imagem_perfil;
    private List<Restaurante> listaRestaurante;


    //Construtores
    public FuncionarioChegadaDTO(Long id, String nome, Long rg, Date dt_adm, float salario, Cargo cargo, String imagem_perfil, List<Restaurante> listaRestaurante) {
        this.id = id;
        this.nome = nome;
        this.rg = rg;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.cargo = cargo;
        this.imagem_perfil = imagem_perfil;
        this.listaRestaurante = listaRestaurante;
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
}

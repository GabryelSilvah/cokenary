package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "funcionarios")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_func;
    @NotNull(message = "RG do funcionário não foi informado")
    @Column(name = "rg")
    private int rg;

    @NotNull(message = "Nome do funcionário não foi informado")
    @Column(name = "nome")
    private String nome;
    @NotNull(message = "Data de admissão do funcionário não foi informado")
    @Column(name = "dt_adm")
    private Date dt_adm;
    @NotNull(message = "Salário do funcionário não foi informado")
    @Column(name = "salario")
    private float salario;

    @Column(name = "imagem_perfil")
    private String imagem_perfil;

    @ManyToOne
    @JoinColumn(name = "cargo_id")
    private Cargo cargo_id;

    @OneToMany(mappedBy = "cozinheiro_id", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Receita> receitas;

    public Funcionario() {
    }


    public Funcionario(int rg, String nome, Date dt_adm, float salario, Cargo cargo_id) {
        this.rg = rg;
        this.nome = nome;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.cargo_id = cargo_id;
    }

    public Funcionario(int rg, String nome, Date dt_adm, float salario) {
        this.rg = rg;
        this.nome = nome;
        this.dt_adm = dt_adm;
        this.salario = salario;
    }

    // Getters e setters
    public Long getId_func() {
        return id_func;
    }

    public int getRg() {
        return rg;
    }

    public String getNome() {
        return nome;
    }

    public Date getDt_adm() {
        return dt_adm;
    }

    public float getSalario() {
        return salario;
    }

    public Cargo getCargo() {
        return cargo_id;
    }

    public void setId_func(Long id_func) {
        this.id_func = id_func;
    }

    public void setRg(int rg) {
        this.rg = rg;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDt_adm(Date dt_adm) {
        this.dt_adm = dt_adm;
    }

    public void setSalario(float salario) {
        this.salario = salario;
    }

    public String getImagem_perfil() {
        return imagem_perfil;
    }

    public void setImagem_perfil(String imagem_perfil) {
        this.imagem_perfil = imagem_perfil;
    }

    public void setCargo(Cargo cargo) {
        this.cargo_id = cargo;
    }

    public List<Receita> getReceitas() {
        return receitas;
    }

    public void setReceitas(List<Receita> receitas) {
        this.receitas = receitas;
    }
}

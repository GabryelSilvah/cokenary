package com.receitas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.receitas.dto.FuncionarioChegadaDTO;
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
    private Long rg;


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
    @JsonIgnore
    private List<Receita> receitas;


    @OneToMany(mappedBy = "fk_editor", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Livro> listaLivros;


    @OneToMany(mappedBy = "fk_degustador", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Avaliacao> listaDegustadores;

    @OneToOne(mappedBy = "fk_funcionario", fetch = FetchType.LAZY)
    private Usuario fk_usuario_forte;

    @OneToOne(mappedBy = "fk_funcionario", fetch = FetchType.LAZY)
    private Metricas fk_metricas_forte;


    public Funcionario() {
    }

    public Funcionario(Long id_func) {
        this.id_func = id_func;
    }

    public Funcionario(Long id_func, String nome) {
        this.id_func = id_func;
        this.nome = nome;
    }

    public Funcionario(Long rg, String nome, Date dt_adm, float salario, Cargo cargo_id) {
        this.rg = rg;
        this.nome = nome;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.cargo_id = cargo_id;
    }

    public Funcionario(Long rg, String nome, Date dt_adm, float salario) {
        this.rg = rg;
        this.nome = nome;
        this.dt_adm = dt_adm;
        this.salario = salario;
    }

    public Funcionario(Long id_func, Long rg, String nome, Date dt_adm, float salario, String imagem_perfil, Cargo cargo_id) {
        this.id_func = id_func;
        this.rg = rg;
        this.nome = nome;
        this.dt_adm = dt_adm;
        this.salario = salario;
        this.imagem_perfil = imagem_perfil;
        this.cargo_id = cargo_id;
    }

    public Funcionario(FuncionarioChegadaDTO funcionarioFullDTO) {
        this.rg = funcionarioFullDTO.getRg();
        this.nome = funcionarioFullDTO.getNome();
        this.dt_adm = funcionarioFullDTO.getDt_adm();
        this.cargo_id = funcionarioFullDTO.getCargo();
        this.salario = funcionarioFullDTO.getSalario();
    }




    // Getters e setters
    public Long getId_func() {
        return id_func;
    }

    public Long getRg() {
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

    public void setRg(Long rg) {
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

    public List<Livro> getListaLivros() {
        return listaLivros;
    }

    public void setListaLivros(List<Livro> listaLivros) {
        this.listaLivros = listaLivros;
    }


}

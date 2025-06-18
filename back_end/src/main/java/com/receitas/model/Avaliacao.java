package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "avaliacoes")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fk_degustador")
    @NotNull(message = "Informe o ID do avaliador/degustador")
    private Funcionario fk_degustador;

    @ManyToOne
    @JoinColumn(name = "fk_receita")
    @NotNull(message = "Informe o ID da receita avaliada")
    private Receita fk_receita;

    @Column(name = "data_avaliada")
    @NotNull(message = "Data de criação não foi definida")
    private Date data_avaliada;

    @Column(name = "nota_avaliacao", length = 1)
    @NotNull(message = "Informe uma nota para a receita")
    private int nota_avaliacao;

    //Construtores


    public Avaliacao() {
    }

    public Avaliacao(Long id) {
        this.id = id;
    }

    public Avaliacao(Long id, Funcionario fk_desgustador, Receita fk_nome_receita, Date data_avaliada, int nota_avaliacao) {
        this.id = id;
        this.fk_degustador = fk_desgustador;
        this.fk_receita = fk_nome_receita;
        this.data_avaliada = data_avaliada;
        this.nota_avaliacao = nota_avaliacao;
    }

    //Gets e Sets
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Funcionario getFk_degustador() {
        return fk_degustador;
    }

    public void setFk_degustador(Funcionario fk_degustador) {
        this.fk_degustador = fk_degustador;
    }

    public Receita getFk_receita() {
        return fk_receita;
    }

    public void setFk_receita(Receita fk_receita) {
        this.fk_receita = fk_receita;
    }

    public Date getData_avaliada() {
        return data_avaliada;
    }

    public void setData_avaliada(Date data_avaliada) {
        this.data_avaliada = data_avaliada;
    }

    public int getNota_avaliacao() {
        return nota_avaliacao;
    }

    public void setNota_avaliacao(int nota_avaliacao) {
        this.nota_avaliacao = nota_avaliacao;
    }






}

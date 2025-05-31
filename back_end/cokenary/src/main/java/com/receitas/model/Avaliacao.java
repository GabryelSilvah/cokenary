package com.receitas.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "avaliacoes")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "degustador_id")
    private Funcionario degustador_id;
    @ManyToOne
    @JoinColumn(name = "cozinheiro_id")
    private Funcionario cozinheiro_id;

    @ManyToOne
    @JoinColumn(name = "nome_receita_id")
    private Receita nome_receita_id;

    @Column(name = "data_avaliada")
    private Date data_avaliada;

    @Column(name = "nota_avalicao")
    private int nota_avalicao;

    //Construtores

    public Avaliacao() {

    }

    public Avaliacao(Long id, Funcionario degustador_id, Funcionario cozinheiro_id, Receita nome_receita_id, Date data_avaliada, int nota_avalicao) {
        this.id = id;
        this.degustador_id = degustador_id;
        this.cozinheiro_id = cozinheiro_id;
        this.nome_receita_id = nome_receita_id;
        this.data_avaliada = data_avaliada;
        this.nota_avalicao = nota_avalicao;
    }


    //Gets e Sets


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Funcionario getDegustador_id() {
        return degustador_id;
    }

    public void setDegustador_id(Funcionario degustador_id) {
        this.degustador_id = degustador_id;
    }

    public Funcionario getCozinheiro_id() {
        return cozinheiro_id;
    }

    public void setCozinheiro_id(Funcionario cozinheiro_id) {
        this.cozinheiro_id = cozinheiro_id;
    }

    public Receita getNome_receita_id() {
        return nome_receita_id;
    }

    public void setNome_receita_id(Receita nome_receita_id) {
        this.nome_receita_id = nome_receita_id;
    }

    public Date getData_avaliada() {
        return data_avaliada;
    }

    public void setData_avaliada(Date data_avaliada) {
        this.data_avaliada = data_avaliada;
    }

    public int getNota_avalicao() {
        return nota_avalicao;
    }

    public void setNota_avalicao(int nota_avalicao) {
        this.nota_avalicao = nota_avalicao;
    }
}

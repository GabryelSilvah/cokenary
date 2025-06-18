package com.receitas.dto;


import java.util.Date;

public class AvaliacaoDTO {

    private Long id;

    private String degustador;

    private String cozinheiro;

    private String nome_receita;

    private Date data_avaliada;

    private int nota_avaliacao;

    //Construtores

    public AvaliacaoDTO(Long id, String desgustador, String cozinherio, String nome_receita, Date data_avaliada, int nota_avaliacao) {
        this.id = id;
        this.degustador = desgustador;
        this.cozinheiro = cozinherio;
        this.nome_receita = nome_receita;
        this.data_avaliada = data_avaliada;
        this.nota_avaliacao = nota_avaliacao;
    }


    //Gets e sets


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDegustador() {
        return degustador;
    }

    public void setDegustador(String degustador) {
        this.degustador = degustador;
    }

    public String getCozinheiro() {
        return cozinheiro;
    }

    public void setCozinheiro(String cozinheiro) {
        this.cozinheiro = cozinheiro;
    }

    public String getNome_receita() {
        return nome_receita;
    }

    public void setNome_receita(String nome_receita) {
        this.nome_receita = nome_receita;
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

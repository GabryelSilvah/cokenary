package com.receitas.dto;


import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;

public class AvaliacaoDTO {

    private Long id_avaliacao;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private FuncionarioSaidaDTO degustador;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private FuncionarioSaidaDTO cozinheiro;

    private ReceitaFullDTO receita;

    private Date data_avaliada;

    private int nota_avaliacao;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date data_alteracao;

    //Construtores


    public AvaliacaoDTO() {
    }

    public AvaliacaoDTO(Long id) {
        this.id_avaliacao = id;
    }

    //Construtor
    public AvaliacaoDTO(int nota_avaliacao) {
        this.nota_avaliacao = nota_avaliacao;
    }

    public AvaliacaoDTO(Long id, FuncionarioSaidaDTO degustador, ReceitaFullDTO nome_receita, int nota_avaliacao) {
        this.id_avaliacao = id;
        this.degustador = degustador;
        this.receita = nome_receita;
        this.nota_avaliacao = nota_avaliacao;
    }

    public AvaliacaoDTO(Long id, FuncionarioSaidaDTO degustador, FuncionarioSaidaDTO cozinheiro, ReceitaFullDTO nome_receita, Date data_avaliada, int nota_avaliacao) {
        this.id_avaliacao = id;
        this.degustador = degustador;
        this.cozinheiro = cozinheiro;
        this.receita = nome_receita;
        this.data_avaliada = data_avaliada;
        this.nota_avaliacao = nota_avaliacao;
    }

    public AvaliacaoDTO(Long id_avaliacao, FuncionarioSaidaDTO degustador, FuncionarioSaidaDTO cozinheiro, ReceitaFullDTO receita, Date data_avaliada, int nota_avaliacao, Date data_alteracao) {
        this.id_avaliacao = id_avaliacao;
        this.degustador = degustador;
        this.cozinheiro = cozinheiro;
        this.receita = receita;
        this.data_avaliada = data_avaliada;
        this.nota_avaliacao = nota_avaliacao;
        this.data_alteracao = data_alteracao;
    }

    //Gets e sets


    public Long getId_avaliacao() {
        return id_avaliacao;
    }

    public void setId_avaliacao(Long id_avaliacao) {
        this.id_avaliacao = id_avaliacao;
    }

    public FuncionarioSaidaDTO getDegustador() {
        return degustador;
    }

    public void setDegustador(FuncionarioSaidaDTO degustador) {
        this.degustador = degustador;
    }

    public FuncionarioSaidaDTO getCozinheiro() {
        return cozinheiro;
    }

    public void setCozinheiro(FuncionarioSaidaDTO cozinheiro) {
        this.cozinheiro = cozinheiro;
    }

    public ReceitaFullDTO getReceita() {
        return receita;
    }

    public void setReceita(ReceitaFullDTO receita) {
        this.receita = receita;
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

    public Date getData_alteracao() {
        return data_alteracao;
    }

    public void setData_alteracao(Date data_alteracao) {
        this.data_alteracao = data_alteracao;
    }
}

package com.receitas.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.receitas.model.Funcionario;
import com.receitas.model.Receita;

import java.util.Date;

public class AvaliacaoDTO {

    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private FuncionarioSaidaDTO degustador;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private FuncionarioSaidaDTO cozinheiro;

    private ReceitaFullDTO receita;

    private Date data_avaliada;

    private int nota_avaliacao;

    //Construtores


    public AvaliacaoDTO() {
    }

    public AvaliacaoDTO(Long id) {
        this.id = id;
    }

    //Construtor
    public AvaliacaoDTO(int nota_avaliacao) {
        this.nota_avaliacao = nota_avaliacao;
    }

    public AvaliacaoDTO(FuncionarioSaidaDTO degustador, ReceitaFullDTO receita, Date data_avaliada, int nota_avaliacao) {
        this.degustador = degustador;
        this.receita = receita;
        this.data_avaliada = data_avaliada;
        this.nota_avaliacao = nota_avaliacao;
    }

    public AvaliacaoDTO(Long id, FuncionarioSaidaDTO degustador, ReceitaFullDTO nome_receita, int nota_avaliacao) {
        this.id = id;
        this.degustador = degustador;
        this.receita = nome_receita;
        this.nota_avaliacao = nota_avaliacao;
    }

    public AvaliacaoDTO(Long id, FuncionarioSaidaDTO degustador, FuncionarioSaidaDTO cozinheiro, ReceitaFullDTO nome_receita, Date data_avaliada, int nota_avaliacao) {
        this.id = id;
        this.degustador = degustador;
        this.cozinheiro = cozinheiro;
        this.receita = nome_receita;
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
}

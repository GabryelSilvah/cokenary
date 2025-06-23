package com.receitas.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.receitas.model.Funcionario;
import jakarta.persistence.*;

public class MetricasDTO {

    private Long id_metrica;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int quantidade_receitas;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int quantidade_livros;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private double media_avaliacoes;

    private FuncionarioSaidaDTO fk_funcionario;


    //Construtores
    public MetricasDTO() {
    }

    public MetricasDTO(Long id_metrica) {
        this.id_metrica = id_metrica;
    }

    public MetricasDTO(Long id_metrica, FuncionarioSaidaDTO fk_funcionario) {
        this.id_metrica = id_metrica;
        this.fk_funcionario = fk_funcionario;
    }

    public MetricasDTO(int quantidade_receitas, int quantidade_livros, double media_avaliacoes, FuncionarioSaidaDTO fk_funcionario) {
        this.quantidade_receitas = quantidade_receitas;
        this.quantidade_livros = quantidade_livros;
        this.media_avaliacoes = media_avaliacoes;
        this.fk_funcionario = fk_funcionario;
    }

    public MetricasDTO(Long id_metrica, int quantidade_receitas, int quantidade_livros, double media_avaliacoes, FuncionarioSaidaDTO fk_funcionario) {
        this.id_metrica = id_metrica;
        this.quantidade_receitas = quantidade_receitas;
        this.quantidade_livros = quantidade_livros;
        this.media_avaliacoes = media_avaliacoes;
        this.fk_funcionario = fk_funcionario;
    }


    //Gets e sets

    public Long getId_metrica() {
        return id_metrica;
    }

    public void setId_metrica(Long id_metrica) {
        this.id_metrica = id_metrica;
    }

    public int getQuantidade_receitas() {
        return quantidade_receitas;
    }

    public void setQuantidade_receitas(int quantidade_receitas) {
        this.quantidade_receitas = quantidade_receitas;
    }

    public int getQuantidade_livros() {
        return quantidade_livros;
    }

    public void setQuantidade_livros(int quantidade_livros) {
        this.quantidade_livros = quantidade_livros;
    }

    public double getMedia_avaliacoes() {
        return media_avaliacoes;
    }

    public void setMedia_avaliacoes(double media_avaliacoes) {
        this.media_avaliacoes = media_avaliacoes;
    }

    public FuncionarioSaidaDTO getFk_funcionario() {
        return fk_funcionario;
    }

    public void setFk_funcionario(FuncionarioSaidaDTO fk_funcionario) {
        this.fk_funcionario = fk_funcionario;
    }
}

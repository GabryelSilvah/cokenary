package com.receitas.model;

public class Ingredientes_receita {
    private Long id_composicao;
    private String nome_med;
    private String nome;
    private int porcoes;


    public Ingredientes_receita(Long id_composicao, String nome_med, String nome, int porcoes) {
        this.id_composicao = id_composicao;
        this.nome_med = nome_med;
        this.nome = nome;
        this.porcoes = porcoes;
    }

    public String getNome_med() {
        return nome_med;
    }

    public void setNome_med(String nome_med) {
        this.nome_med = nome_med;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId_composicao() {
        return id_composicao;
    }

    public void setId_composicao(Long id_composicao) {
        this.id_composicao = id_composicao;
    }

    public int getPorcoes() {
        return porcoes;
    }

    public void setPorcoes(int porcoes) {
        this.porcoes = porcoes;
    }
}

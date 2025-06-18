package com.receitas.model;

public class Composicao {
    private Long id_composicao;
    private Long id_ingred;
    private Long id_med;
    private Long id_receita;
    private String nome_med;
    private String nome_ingred;



    //Construtores

    public Composicao(){}

    public Composicao(Long id_composicao, Long id_ingred, Long id_med, Long id_receita, String nome_med, String nome_ingred) {
        this.id_composicao = id_composicao;
        this.id_ingred = id_ingred;
        this.id_med = id_med;
        this.id_receita = id_receita;
        this.nome_med = nome_med;
        this.nome_ingred = nome_ingred;
    }


    //Gets e Sets


    public Long getId_composicao() {
        return id_composicao;
    }

    public void setId_composicao(Long id_composicao) {
        this.id_composicao = id_composicao;
    }

    public Long getId_ingred() {
        return id_ingred;
    }

    public void setId_ingred(Long id_ingred) {
        this.id_ingred = id_ingred;
    }

    public Long getId_med() {
        return id_med;
    }

    public void setId_med(Long id_med) {
        this.id_med = id_med;
    }

    public String getNome_med() {
        return nome_med;
    }

    public Long getId_receita() {
        return id_receita;
    }

    public void setId_receita(Long id_receita) {
        this.id_receita = id_receita;
    }

    public void setNome_med(String nome_med) {
        this.nome_med = nome_med;
    }

    public String getNome_ingred() {
        return nome_ingred;
    }

    public void setNome_ingred(String nome_ingred) {
        this.nome_ingred = nome_ingred;
    }
}

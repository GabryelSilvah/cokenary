package com.receitas.dto;

public class Composicao_ReceitaDTO {
    private Long id_composicao;
    private Long id_ingred;
    private Long id_med;
    private String nome_ingred;
    private String nome_med;

    private int porcoes;


    public Composicao_ReceitaDTO(Long id_composicao, Long id_ingred, Long id_med, String nome_ingred, String nome_med,int porcoes) {
        this.id_composicao = id_composicao;
        this.id_ingred = id_ingred;
        this.id_med = id_med;
        this.porcoes = porcoes;
        this.nome_ingred = nome_ingred;
        this.nome_med = nome_med;
    }

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

    public String getNome_ingred() {
        return nome_ingred;
    }

    public void setNome_ingred(String nome_ingred) {
        this.nome_ingred = nome_ingred;
    }

    public String getNome_med() {
        return nome_med;
    }

    public void setNome_med(String nome_med) {
        this.nome_med = nome_med;
    }

    public int getPorcoes() {
        return porcoes;
    }

    public void setPorcoes(int porcoes) {
        this.porcoes = porcoes;
    }
}

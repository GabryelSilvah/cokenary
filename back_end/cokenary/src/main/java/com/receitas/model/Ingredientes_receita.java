package com.receitas.model;

public class Ingredientes_receita {
    private String nome_med;
    private String nome;
    private Long receita_id;




    public Ingredientes_receita(String nome_med, String nome, Long receita_id) {
        this.nome_med = nome_med;
        this.nome = nome;
        this.receita_id = receita_id;
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

    public Long getReceita_id() {
        return receita_id;
    }

    public void setReceita_id(Long receita_id) {
        this.receita_id = receita_id;
    }
}

package com.receitas.dto;


import java.util.List;

public class Receita_all_infor {

    private Long id_receita;
    private Long id_func;
    private Long id_cat;
    private String nome_receita;
    private String data_criacao;
    private String cozinheiro_id;
    private String categoria_id;
    private String modo_preparo;

    private List<Composicao_ReceitaDTO> composicao;


    public Receita_all_infor() {
    }

    public Receita_all_infor(Long id_receita) {
        this.id_receita = id_receita;
    }


    public Receita_all_infor(Long id_receita, Long id_func, Long id_cat, String nome_receita, String data_criacao, String cozinheiro_id, String categoria_id, String modo_preparo) {
        this.id_receita = id_receita;
        this.id_func = id_func;
        this.id_cat = id_cat;
        this.nome_receita = nome_receita;
        this.data_criacao = data_criacao;
        this.cozinheiro_id = cozinheiro_id;
        this.categoria_id = categoria_id;
        this.modo_preparo = modo_preparo;
    }

    public Receita_all_infor(Long id_receita, Long id_func, Long id_cat, String nome_receita, String data_criacao, String cozinheiro_id, String categoria_id, String modo_preparo, List<Composicao_ReceitaDTO> composicao) {
        this.id_receita = id_receita;
        this.id_func = id_func;
        this.id_cat = id_cat;
        this.nome_receita = nome_receita;
        this.data_criacao = data_criacao;
        this.cozinheiro_id = cozinheiro_id;
        this.categoria_id = categoria_id;
        this.modo_preparo = modo_preparo;
        this.composicao = composicao;
    }

    public Long getId_receita() {
        return id_receita;
    }

    public void setId_receita(Long id_receita) {
        this.id_receita = id_receita;
    }

    public Long getId_func() {
        return id_func;
    }

    public void setId_func(Long id_func) {
        this.id_func = id_func;
    }

    public Long getId_cat() {
        return id_cat;
    }

    public void setId_cat(Long id_cat) {
        this.id_cat = id_cat;
    }

    public String getNome_receita() {
        return nome_receita;
    }

    public void setNome_receita(String nome_receita) {
        this.nome_receita = nome_receita;
    }

    public String getData_criacao() {
        return data_criacao;
    }

    public void setData_criacao(String data_criacao) {
        this.data_criacao = data_criacao;
    }

    public String getCozinheiro_id() {
        return cozinheiro_id;
    }

    public void setCozinheiro_id(String cozinheiro_id) {
        this.cozinheiro_id = cozinheiro_id;
    }

    public String getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(String categoria_id) {
        this.categoria_id = categoria_id;
    }

    public String getModo_preparo() {
        return modo_preparo;
    }

    public void setModo_preparo(String modo_preparo) {
        this.modo_preparo = modo_preparo;
    }

    public List<Composicao_ReceitaDTO> getComposicao() {
        return composicao;
    }

    public void setComposicao(List<Composicao_ReceitaDTO> composicao) {
        this.composicao = composicao;
    }
}

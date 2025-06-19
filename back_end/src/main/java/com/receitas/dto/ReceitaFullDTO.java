package com.receitas.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.receitas.model.Categoria;
import com.receitas.model.Funcionario;
import com.receitas.model.Receitas_and_ingredientes;

import java.util.List;

public class ReceitaFullDTO {

    private Long id_receita;

    private String nomeReceita;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String data_criacao;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Funcionario cozinheiro_id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Categoria categoria_id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String modo_preparo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Receitas_and_ingredientes> ingredientes_id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Long> ingredientes_removidos;

    //Construtores


    public ReceitaFullDTO() {
    }

    public ReceitaFullDTO(Long id_receita) {
        this.id_receita = id_receita;
    }

    public ReceitaFullDTO(Long id_receita, String nomeReceita) {
        this.id_receita = id_receita;
        this.nomeReceita = nomeReceita;
    }

    public ReceitaFullDTO(Long id_receita, String nomeReceita, String data_criacao, Funcionario cozinheiro_id, Categoria categoria_id, String modo_preparo, List<Receitas_and_ingredientes> ingredientes_id) {
        this.id_receita = id_receita;
        this.nomeReceita = nomeReceita;
        this.data_criacao = data_criacao;
        this.cozinheiro_id = cozinheiro_id;
        this.categoria_id = categoria_id;
        this.modo_preparo = modo_preparo;
        this.ingredientes_id = ingredientes_id;
    }

    public ReceitaFullDTO(Long id_receita, String nomeReceita, String data_criacao, Funcionario cozinheiro_id, Categoria categoria_id, String modo_preparo, List<Receitas_and_ingredientes> ingredientes_id, List<Long> ingredientes_removidos) {
        this.id_receita = id_receita;
        this.nomeReceita = nomeReceita;
        this.data_criacao = data_criacao;
        this.cozinheiro_id = cozinheiro_id;
        this.categoria_id = categoria_id;
        this.modo_preparo = modo_preparo;
        this.ingredientes_id = ingredientes_id;
        this.ingredientes_removidos = ingredientes_removidos;
    }

    public ReceitaFullDTO(String nomeReceita, String data_criacao, Funcionario cozinheiro_id, Categoria categoria_id, String modo_preparo, List<Receitas_and_ingredientes> ingredientes_id, List<Long> ingredientes_removidos) {
        this.nomeReceita = nomeReceita;
        this.data_criacao = data_criacao;
        this.cozinheiro_id = cozinheiro_id;
        this.categoria_id = categoria_id;
        this.modo_preparo = modo_preparo;
        this.ingredientes_id = ingredientes_id;
    }


    //Gets e sets


    public Long getId_receita() {
        return id_receita;
    }

    public void setId_receita(Long id_receita) {
        this.id_receita = id_receita;
    }

    public String getNomeReceita() {
        return nomeReceita;
    }

    public void setNomeReceita(String nomeReceita) {
        this.nomeReceita = nomeReceita;
    }

    public String getData_criacao() {
        return data_criacao;
    }

    public void setData_criacao(String data_criacao) {
        this.data_criacao = data_criacao;
    }

    public Funcionario getCozinheiro_id() {
        return cozinheiro_id;
    }

    public void setCozinheiro_id(Funcionario cozinheiro_id) {
        this.cozinheiro_id = cozinheiro_id;
    }

    public Categoria getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Categoria categoria_id) {
        this.categoria_id = categoria_id;
    }

    public String getModo_preparo() {
        return modo_preparo;
    }

    public void setModo_preparo(String modo_preparo) {
        this.modo_preparo = modo_preparo;
    }

    public List<Receitas_and_ingredientes> getIngredientes_id() {
        return ingredientes_id;
    }

    public void setIngredientes_id(List<Receitas_and_ingredientes> ingredientes_id) {
        this.ingredientes_id = ingredientes_id;
    }

    public List<Long> getIngredientes_removidos() {
        return ingredientes_removidos;
    }

    public void setIngredientes_removidos(List<Long> ingredientes_removidos) {
        this.ingredientes_removidos = ingredientes_removidos;
    }
}

package com.receitas.dto;

public class PainelDTO {

    private int numero_receita;
    private int numero_restaurante;
    private int numero_funcionario;
    private int numero_cargo;
    private int numero_ingrediente;
    private int numero_categoria;
    private int numero_livro;
    private int numero_avalicao;

    //Construtor


    public PainelDTO() {
    }

    public PainelDTO(int numero_receita, int numero_restaurante, int numero_funcionario, int numero_cargo, int numero_ingrediente, int numero_categoria, int numero_livro, int numero_avalicao) {
        this.numero_receita = numero_receita;
        this.numero_restaurante = numero_restaurante;
        this.numero_funcionario = numero_funcionario;
        this.numero_cargo = numero_cargo;
        this.numero_ingrediente = numero_ingrediente;
        this.numero_categoria = numero_categoria;
        this.numero_livro = numero_livro;
        this.numero_avalicao = numero_avalicao;
    }


//Gets e sets


    public int getNumero_receita() {
        return numero_receita;
    }

    public void setNumero_receita(int numero_receita) {
        this.numero_receita = numero_receita;
    }

    public int getNumero_restaurante() {
        return numero_restaurante;
    }

    public void setNumero_restaurante(int numero_restaurante) {
        this.numero_restaurante = numero_restaurante;
    }

    public int getNumero_funcionario() {
        return numero_funcionario;
    }

    public void setNumero_funcionario(int numero_funcionario) {
        this.numero_funcionario = numero_funcionario;
    }

    public int getNumero_cargo() {
        return numero_cargo;
    }

    public void setNumero_cargo(int numero_cargo) {
        this.numero_cargo = numero_cargo;
    }

    public int getNumero_ingrediente() {
        return numero_ingrediente;
    }

    public void setNumero_ingrediente(int numero_ingrediente) {
        this.numero_ingrediente = numero_ingrediente;
    }

    public int getNumero_categoria() {
        return numero_categoria;
    }

    public void setNumero_categoria(int numero_categoria) {
        this.numero_categoria = numero_categoria;
    }

    public int getNumero_livro() {
        return numero_livro;
    }

    public void setNumero_livro(int numero_livro) {
        this.numero_livro = numero_livro;
    }

    public int getNumero_avalicao() {
        return numero_avalicao;
    }

    public void setNumero_avalicao(int numero_avalicao) {
        this.numero_avalicao = numero_avalicao;
    }
}

package com.receitas.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

public class LivroDTO {

    private Long id_livro;

    private String titulo_livro;

    private int isbn;

    private FuncionarioSaidaDTO editor;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Receita_all_infor> publicacao_receitas_livro;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Long> receitas_remover;


    //Construtor

    public LivroDTO() {
    }

    public LivroDTO(Long id_livro) {
        this.id_livro = id_livro;
    }
    public LivroDTO(Long id_livro, String titulo_livro, int isbn, FuncionarioSaidaDTO editor) {
        this.id_livro = id_livro;
        this.titulo_livro = titulo_livro;
        this.isbn = isbn;
        this.editor = editor;
    }

    public LivroDTO(Long id_livro, String titulo_livro, int isbn, FuncionarioSaidaDTO editor, List<Receita_all_infor> receitas_livro) {
        this.id_livro = id_livro;
        this.titulo_livro = titulo_livro;
        this.isbn = isbn;
        this.editor = editor;
        this.publicacao_receitas_livro = receitas_livro;
    }

    public LivroDTO(Long id_livro, String titulo_livro, int isbn, FuncionarioSaidaDTO editor, List<Receita_all_infor> composicao_receitas, List<Long> receitas_remover) {
        this.id_livro = id_livro;
        this.titulo_livro = titulo_livro;
        this.isbn = isbn;
        this.editor = editor;
        this.publicacao_receitas_livro = composicao_receitas;
        this.receitas_remover = receitas_remover;
    }

    //Sets e gets
    public Long getId_livro() {
        return id_livro;
    }

    public void setId_livro(Long id_livro) {
        this.id_livro = id_livro;
    }

    public String getTitulo_livro() {
        return titulo_livro;
    }

    public void setTitulo_livro(String titulo_livro) {
        this.titulo_livro = titulo_livro;
    }

    public int getIsbn() {
        return isbn;
    }

    public void setIsbn(int isbn) {
        this.isbn = isbn;
    }

    public FuncionarioSaidaDTO getEditor() {
        return editor;
    }

    public void setEditor(FuncionarioSaidaDTO editor) {
        this.editor = editor;
    }

    public List<Receita_all_infor> getPublicacao_receitas_livro() {
        return publicacao_receitas_livro;
    }

    public void setPublicacao_receitas_livro(List<Receita_all_infor> publicacao_receitas_livro) {
        this.publicacao_receitas_livro = publicacao_receitas_livro;
    }

    public List<Long> getReceitas_remover() {
        return receitas_remover;
    }

    public void setReceitas_remover(List<Long> receitas_remover) {
        this.receitas_remover = receitas_remover;
    }
}

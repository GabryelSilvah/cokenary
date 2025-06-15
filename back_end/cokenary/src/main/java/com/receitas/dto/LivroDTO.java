package com.receitas.dto;

import java.util.List;

public class LivroDTO {

    private Long id_livro;

    private String titulo_livro;

    private int isbn;

    private String editor;

    private List<Receita_all_infor> receitas_livro;


    //Construtor
    public LivroDTO(Long id_livro, String titulo_livro, int isbn, String editor) {
        this.id_livro = id_livro;
        this.titulo_livro = titulo_livro;
        this.isbn = isbn;
        this.editor = editor;
    }

    public LivroDTO(Long id_livro, String titulo_livro, int isbn, String editor, List<Receita_all_infor> receitas_livro) {
        this.id_livro = id_livro;
        this.titulo_livro = titulo_livro;
        this.isbn = isbn;
        this.editor = editor;
        this.receitas_livro = receitas_livro;
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

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public List<Receita_all_infor> getReceitas_livro() {
        return receitas_livro;
    }

    public void setReceitas_livro(List<Receita_all_infor> receitas_livro) {
        this.receitas_livro = receitas_livro;
    }
}

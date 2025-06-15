package com.receitas.dto;

import com.receitas.model.Composicao;
import com.receitas.model.Funcionario;
import com.receitas.model.Publicacao_livro;
import com.receitas.model.Receita;

import java.util.List;

public class LivroCompletoDTO {

    private Long id_livro;

    private String titulo_livro;

    private int isbn;

    private Funcionario editor;

    private List<Publicacao_livro> composicao_receitas;

    public LivroCompletoDTO(Long id_livro, String titulo_livro, int isbn, Funcionario editor, List<Publicacao_livro> composicao_receitas) {
        this.id_livro = id_livro;
        this.titulo_livro = titulo_livro;
        this.isbn = isbn;
        this.editor = editor;
        this.composicao_receitas = composicao_receitas;
    }

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

    public Funcionario getEditor() {
        return editor;
    }

    public void setEditor(Funcionario editor) {
        this.editor = editor;
    }

    public List<Publicacao_livro> getComposicao_receitas() {
        return composicao_receitas;
    }

    public void setComposicao_receitas(List<Publicacao_livro> composicao_receitas) {
        this.composicao_receitas = composicao_receitas;
    }
}

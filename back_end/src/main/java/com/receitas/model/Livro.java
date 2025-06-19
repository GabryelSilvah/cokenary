package com.receitas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.receitas.dto.LivroCompletoDTO;
import com.receitas.dto.LivroDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "livros")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_livro;

    @Column(name = "titulo_livro")
    @NotNull(message = "Informe o título do livro")
    private String tituloLivro;

    @Column(name = "isbn", length = 13)
    @NotNull(message = "Informe o ISBN do livro")
    private int isbn;

    @ManyToOne
    @JoinColumn(name = "fk_editor")
    @NotNull(message = "Informe o nome do editor")
    private Funcionario fk_editor;

    @OneToMany(mappedBy = "fk_livro", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Publicacao_livro> listaPublicacoes;

    //Construtor
    public Livro() {
    }


    public Livro(Long id_livro) {
        this.id_livro = id_livro;
    }

    public Livro(Long id_livro, String titulo_livro, int isbn, Funcionario editor_id) {
        this.id_livro = id_livro;
        this.tituloLivro = titulo_livro;
        this.isbn = isbn;
        this.fk_editor = editor_id;
    }

    public Livro(String titulo_livro, int isbn, Funcionario editor_id) {
        this.tituloLivro = titulo_livro;
        this.isbn = isbn;
        this.fk_editor = editor_id;
    }

    public Livro(LivroDTO livroDTO) {
        this.id_livro = livroDTO.getId_livro();
        this.tituloLivro = livroDTO.getTitulo_livro();
        this.isbn = livroDTO.getIsbn();
        this.fk_editor = new Funcionario(livroDTO.getEditor().getId_func());
    }

    //Sets e gets


    public Long getId_livro() {
        return id_livro;
    }

    public void setId_livro(Long id_livro) {
        this.id_livro = id_livro;
    }

    public String getTituloLivro() {
        return tituloLivro;
    }

    public void setTituloLivro(String tituloLivro) {
        this.tituloLivro = tituloLivro;
    }

    public int getIsbn() {
        return isbn;
    }

    public void setIsbn(int isbn) {
        this.isbn = isbn;
    }

    public Funcionario getFk_editor() {
        return fk_editor;
    }

    public void setFk_editor(Funcionario fk_editor) {
        this.fk_editor = fk_editor;
    }
}

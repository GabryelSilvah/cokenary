package com.receitas.model;

import com.receitas.dto.Receita_all_infor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "publicacoes_livros")
public class Publicacao_livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_publicacao;

    @ManyToOne
    @NotNull(message = "Informe o ID do livro")
    @JoinColumn(name = "fk_livro")
    private Livro fk_livro;

    @ManyToOne
    @NotNull(message = "Informe a receita associada ao livro")
    @JoinColumn(name = "fk_receita")
    private Receita fk_receita;


    //Construtores
    public Publicacao_livro(){

    }



    public Publicacao_livro(Livro fk_livro, Receita fk_receita) {
        this.fk_livro = fk_livro;
        this.fk_receita = fk_receita;
    }


    public Publicacao_livro(Long id_publicacao, Livro fk_livro, Receita fk_receita) {
        this.id_publicacao = id_publicacao;
        this.fk_livro = fk_livro;
        this.fk_receita = fk_receita;
    }


    //Sets e gets
    public Long getId_publicacao() {
        return id_publicacao;
    }

    public void setId_publicacao(Long id_publicacao) {
        this.id_publicacao = id_publicacao;
    }

    public Livro getFk_livro() {
        return fk_livro;
    }

    public void setFk_livro(Livro fk_livro) {
        this.fk_livro = fk_livro;
    }

    public Receita getFk_receita() {
        return fk_receita;
    }

    public void setFk_receita(Receita fk_receita) {
        this.fk_receita = fk_receita;
    }

}

package com.receitas.dto;

import com.receitas.model.Livro;
import com.receitas.model.Receita;


public class Publicacao_livroDTO {

    private Long id_publicacao;

    private Long fk_livro;

    private Long fk_receita;

    //Construtor

    public Publicacao_livroDTO(Long id_publicacao, Long fk_livro, Long fk_receita) {
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

    public Long getFk_livro() {
        return fk_livro;
    }

    public void setFk_livro(Long fk_livro) {
        this.fk_livro = fk_livro;
    }

    public Long getFk_receita() {
        return fk_receita;
    }

    public void setFk_receita(Long fk_receita) {
        this.fk_receita = fk_receita;
    }
}

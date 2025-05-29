package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_cat;

    @NotNull(message = "Informe o nome da categoria")
    @Column(name = "nome_categoria", nullable = false)
    private String nome_categoria;

    @OneToMany(mappedBy = "categoria_id", fetch = FetchType.LAZY)
    private List<Receita> receitas;

    //Construtores
    public Categoria() {
    }

    public Categoria(String nome_categoria, List<Receita> receitas) {
        this.nome_categoria = nome_categoria;
        this.receitas = receitas;
    }

    //Gets e sets
    public Categoria(String nome_categoria) {
        this.nome_categoria = nome_categoria;
    }

    public Long getId_cat() {
        return id_cat;
    }

    public void setId_cat(Long id_cat) {
        this.id_cat = id_cat;
    }

    public String getNome_categoria() {
        return nome_categoria;
    }

    public void setNome_categoria(String nome_categoria) {
        this.nome_categoria = nome_categoria;
    }

    public List<Receita> getReceitas() {
        return receitas;
    }

    public void setReceitas(List<Receita> receitas) {
        this.receitas = receitas;
    }
}

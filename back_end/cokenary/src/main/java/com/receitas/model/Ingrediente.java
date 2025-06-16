package com.receitas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "ingredientes")
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingred")
    private Long id_ingred;

    @Column(name = "nome", nullable = false, length = 45)
    @NotNull(message = "Informe o nome do ingrediente")
    private String nome;

    @OneToMany(mappedBy = "ingrediente_id", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Receitas_and_ingredientes> receitas_and_medidas;



    //@ManyToMany(mappedBy = "ingredientes_id", fetch = FetchType.EAGER)
    //@JsonIgnore
    //private List<Receita> receitas_id;




    //Construtores
    public Ingrediente() {
    }

    public Ingrediente(Long id_ingred, String nome, List<Receitas_and_ingredientes> receitas_and_medidas) {
        this.id_ingred = id_ingred;
        this.nome = nome;
        this.receitas_and_medidas = receitas_and_medidas;
    }

    //Gets e Sets
    public Long getId_ingred() {
        return id_ingred;
    }

    public void setId_ingred(Long id_ingred) {
        this.id_ingred = id_ingred;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Receitas_and_ingredientes> getReceitas_and_medidas() {
        return receitas_and_medidas;
    }

    public void setReceitas_and_medidas(List<Receitas_and_ingredientes> receitas_and_medidas) {
        this.receitas_and_medidas = receitas_and_medidas;
    }
}


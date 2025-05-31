package com.receitas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "ingredientes")
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", nullable = false, length = 45)
    private String nome;

    @OneToMany(mappedBy = "ingrediente_id", fetch = FetchType.LAZY)
    private List<Receitas_and_ingredientes> receitas_and_ingredientes;


    //Construtores

    public Ingrediente() {
    }

    public Ingrediente(Long id, String nome, List<Receitas_and_ingredientes> receitas_and_ingredientes) {
        this.id = id;
        this.nome = nome;
        this.receitas_and_ingredientes = receitas_and_ingredientes;
    }

    //Gets e Sets
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Receitas_and_ingredientes> getReceitas_and_ingredientes() {
        return receitas_and_ingredientes;
    }

    public void setReceitas_and_ingredientes(List<Receitas_and_ingredientes> receitas_and_ingredientes) {
        this.receitas_and_ingredientes = receitas_and_ingredientes;
    }
}


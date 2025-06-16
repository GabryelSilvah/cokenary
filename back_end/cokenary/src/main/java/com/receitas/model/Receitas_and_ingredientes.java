package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "receitas_and_ingredientes")
public class Receitas_and_ingredientes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_composicao;


    @ManyToOne
    @JoinColumn(name = "medida_id")
    @NotNull(message = "Informe o ID na medida usada")
    private Medida medida_id;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id")
    @NotNull(message = "Informe o ID do ingrediente usado")
    private Ingrediente ingrediente_id;

    @ManyToOne
    @JoinColumn(name = "receita_id")
    @NotNull(message = "Informe o ID da receita associada aos ingredientes e medidas")
    private Receita receita_id;

    //@Column(name = "porcoes")
    //@NotNull(message = "Informe a quantidade de porções do ingrediente")
    //private int porcoes;

    public Receitas_and_ingredientes(){}

    public Receitas_and_ingredientes(Long id_composicao, Medida medida_id, Ingrediente ingrediente_id, Receita receita_id) {
        this.id_composicao = id_composicao;
        this.medida_id = medida_id;
        this.ingrediente_id = ingrediente_id;
        this.receita_id = receita_id;
    }

    //Gets e Sets
    public Long getId_composicao() {
        return id_composicao;
    }

    public void setId_composicao(Long id_composicao) {
        this.id_composicao = id_composicao;
    }

    public Medida getMedida_id() {
        return medida_id;
    }

    public void setMedida_id(Medida medida_id) {
        this.medida_id = medida_id;
    }

    public Ingrediente getIngrediente_id() {
        return ingrediente_id;
    }

    public void setIngrediente_id(Ingrediente ingrediente_id) {
        this.ingrediente_id = ingrediente_id;
    }

    public Receita getReceita_id() {
        return receita_id;
    }

    public void setReceita_id(Receita receita_id) {
        this.receita_id = receita_id;
    }
}

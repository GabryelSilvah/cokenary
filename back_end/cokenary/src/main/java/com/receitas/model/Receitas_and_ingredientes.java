package com.receitas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "receitas_and_ingredientes")
public class Receitas_and_ingredientes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "medida_id")
    private Medida medida_id;
    @ManyToOne
    @JoinColumn(name = "ingrediente_id")
    private Ingrediente ingrediente_id;
    @ManyToOne
    @JoinColumn(name = "receita_id")
    private Receita receita_id;


    //Gets e Sets

}

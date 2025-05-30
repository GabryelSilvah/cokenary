package com.receitas.model;

import jakarta.persistence.*;

@Entity
@Table(name = "degustacoes")
public class Degustacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}

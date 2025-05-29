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
    @Column(name = "id") // Corrigido para o nome da coluna no banco
    private Long id;

    @Column(name = "nome", nullable = false, length = 45)
    private String nome;

    @OneToMany(mappedBy = "ingrediente_id", fetch = FetchType.LAZY)
    private List<Receitas_and_ingredientes> receitas_and_ingredientes;
}

package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "medidas")
public class Medida {

    //ID
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;


    //Nome da medida
    @NotNull(message = "Informe o nome da medida")
    @Column(name = "nome", nullable = false, length = 45)
    private String nome;

    @OneToMany(mappedBy = "medida_id", fetch = FetchType.LAZY)
    private List<Receitas_and_ingredientes> receitas_and_ingredientes;



}

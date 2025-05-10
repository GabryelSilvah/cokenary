package com.receitas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ingrediente", schema = "AcervoRct") // Nome da tabela deve estar igual ao do banco
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Corrigido para o nome da coluna no banco
    private Integer id;

    @Column(name = "nome", nullable = false, length = 45)
    private String nome;

    @Column(name = "descricao", length = 1000)
    private String descricao;

    @Column(name = "quantidade")
    private Double quantidade; // Tipo Double para permitir valores com casas decimais
}

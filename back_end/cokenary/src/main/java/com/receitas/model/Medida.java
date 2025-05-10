package com.receitas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "medida", schema = "AcervoRct") // nome da tabela em minúsculo como no banco
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // corresponde à coluna "id"
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "descricao", length = 1000)
    private String descricao;

    @Column(name = "abreviacao", length = 10)
    private String abreviacao;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;
}

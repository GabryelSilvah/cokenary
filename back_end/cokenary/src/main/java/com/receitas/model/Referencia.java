package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "referencias")
public class Referencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    @NotNull(message = "Informe o funcionário")
    private Funcionario funcionarioId;

    @ManyToOne
    @JoinColumn(name = "restaurante_id")
    @NotNull(message = "Informe o restaurante")
    private Restaurante restauranteId;

    @Column(name = "data_inicio")
    @Temporal(TemporalType.DATE)
    private Date data_inicio;

    @Column(name = "data_fim")
    @Temporal(TemporalType.DATE)
    private Date data_fim;

    // Construtores
    public Referencia() {
    }

    public Referencia(Funcionario funcionarioId, Restaurante restauranteId, Date data_inicio, Date data_fim) {
        this.funcionarioId = funcionarioId;
        this.restauranteId = restauranteId;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
    }

    // Gets e Sets
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Funcionario getFuncionarioId() {
        return funcionarioId;
    }

    public void setFuncionarioId(Funcionario funcionarioId) {
        this.funcionarioId = funcionarioId;
    }

    public Restaurante getRestauranteId() {
        return restauranteId;
    }

    public void setRestauranteId(Restaurante restauranteId) {
        this.restauranteId = restauranteId;
    }

    public Date getData_inicio() {
        return data_inicio;
    }

    public void setData_inicio(Date data_inicio) {
        this.data_inicio = data_inicio;
    }

    public Date getData_fim() {
        return data_fim;
    }

    public void setData_fim(Date data_fim) {
        this.data_fim = data_fim;
    }
}
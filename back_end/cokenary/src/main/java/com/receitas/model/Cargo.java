package com.receitas.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "cargos")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "ind_ativo")
    private Boolean indAtivo = true;

    @OneToMany(mappedBy = "cargo_id", fetch = FetchType.LAZY)
    private List<Funcionario> funcionarios;

    public Cargo() {
    }

    // Getters e Setters
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Boolean getIndAtivo() {
        return indAtivo;
    }

    public void setIndAtivo(Boolean indAtivo) {
        this.indAtivo = indAtivo;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }

    // Método auxiliar para contar funcionários
    public int getFuncionariosCount() {
        return funcionarios != null ? funcionarios.size() : 0;
    }

    /**
     * Atualiza os dados do cargo mantendo os valores existentes quando os novos são nulos
     */
    public void atualizarDados(String nome, String descricao,
                               LocalDate dataInicio, LocalDate dataFim, Boolean indAtivo) {
        if (nome != null && !nome.isBlank()) {
            this.nome = nome;
        }

        if (descricao != null) {
            this.descricao = descricao.isBlank() ? null : descricao;
        }

        if (dataInicio != null) {
            this.dataInicio = dataInicio;
        }

        if (dataFim != null) {
            this.dataFim = dataFim;
        }

        if (indAtivo != null) {
            this.indAtivo = indAtivo;
        }
    }
}

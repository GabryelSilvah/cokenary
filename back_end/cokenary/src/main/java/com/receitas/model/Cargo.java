package com.receitas.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    private String descricao;

    private String departamento;

    @Column(length = 20)
    private String nivel;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "ind_ativo")
    private Boolean indAtivo = true; // Changed to Boolean wrapper class

    @OneToMany(mappedBy = "cargo")
    private List<Funcionario> funcionarios;

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

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
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

    public Boolean getIndAtivo() {  // Changed from isIndAtivo() to getIndAtivo()
        return indAtivo;
    }

    public void setIndAtivo(Boolean indAtivo) {  // Parameter type changed to Boolean
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
     * @param nome Novo nome (opcional)
     * @param descricao Nova descrição (opcional)
     * @param departamento Novo departamento (opcional)
     * @param nivel Novo nível (opcional)
     * @param dataInicio Nova data de início (opcional)
     * @param dataFim Nova data de fim (opcional)
     * @param indAtivo Novo indicador de status (opcional)
     */
    public void atualizarDados(String nome, String descricao, String departamento, String nivel,
                               LocalDate dataInicio, LocalDate dataFim, Boolean indAtivo) {
        if (nome != null && !nome.isBlank()) {
            this.nome = nome;
        }

        if (descricao != null) {
            this.descricao = descricao.isBlank() ? null : descricao;
        }

        if (departamento != null) {
            this.departamento = departamento.isBlank() ? null : departamento;
        }

        if (nivel != null) {
            this.nivel = nivel.isBlank() ? null : nivel;
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
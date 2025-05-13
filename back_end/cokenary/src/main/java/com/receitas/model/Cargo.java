package com.receitas.model;

import jakarta.persistence.*;
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
     */
    public void atualizarDados(String nome, String descricao, String departamento, String nivel) {
        if (nome != null && !nome.isBlank()) {
            this.nome = nome;
        }

        // Atualiza descrição mesmo se for string vazia (permite limpar o campo)
        if (descricao != null) {
            this.descricao = descricao.isBlank() ? null : descricao;
        }

        // Atualiza departamento mesmo se for string vazia (permite limpar o campo)
        if (departamento != null) {
            this.departamento = departamento.isBlank() ? null : departamento;
        }

        // Atualiza nível mesmo se for string vazia (permite limpar o campo)
        if (nivel != null) {
            this.nivel = nivel.isBlank() ? null : nivel;
        }
    }
}
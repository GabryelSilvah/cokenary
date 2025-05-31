package com.receitas.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "cargos")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_inicio")
    //@Temporal(TemporalType.DATE)
    private Date data_inicio;

    @Column(name = "data_fim")
    private Date data_fim;

    @Column(name = "ind_ativo")
    private Boolean indAtivo = true;

    @OneToMany(mappedBy = "cargo_id", fetch = FetchType.LAZY)
    private List<Funcionario> funcionarios;

    public Cargo() {
    }

    public Cargo(Long id, String nome, String descricao, Date data_inicio, Date data_fim, Boolean indAtivo, List<Funcionario> funcionarios) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.indAtivo = indAtivo;
        this.funcionarios = funcionarios;
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
                               Date dataInicio, Date dataFim, Boolean indAtivo) {
        if (nome != null && !nome.isBlank()) {
            this.nome = nome;
        }

        if (descricao != null) {
            this.descricao = descricao.isBlank() ? null : descricao;
        }

        if (dataInicio != null) {
            this.data_inicio = dataInicio;
        }

        if (dataFim != null) {
            this.data_fim = dataFim;
        }

        if (indAtivo != null) {
            this.indAtivo = indAtivo;
        }
    }
}

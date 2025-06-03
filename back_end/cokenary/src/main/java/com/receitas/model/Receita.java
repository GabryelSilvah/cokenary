
package com.receitas.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "receitas")
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_receita;

    //Nome

    @Column(name = "nome_receita", nullable = false, unique = true)
    @NotNull(message = "Informe o nome da receita")
    private String nomeReceita;

    //Data de criação
    @Column(name = "data_criacao", nullable = false)
    @Temporal(TemporalType.DATE)
    private String data_criacao;

    //Nome do cozinheiro
    @ManyToOne
    @JoinColumn(name = "cozinheiro_id")
    @NotNull(message = "Informe o nome do cozinheiro")
    private Funcionario cozinheiro_id;

    //Categoria da receita
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    @NotNull(message = "Informe o nome da categoria")
    private Categoria categoria_id;

    //Passo a passo de preparação da receita
    @NotNull(message = "Informe o modo de preparo")
    @Column(name = "modo_preparo", nullable = false)
    private String modo_preparo;

    @OneToMany(mappedBy = "receita_id", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Receitas_and_ingredientes> ingredientes_id;



    //Contrutores
    public Receita() {
    }

    public Receita(Long id_receita) {
        this.id_receita = id_receita;
    }

    public Receita(
            Long id_receita,
            String nomeReceita,
            String data_criacao,
            Funcionario cozinheiro_id,
            Categoria categoria_id,
            String modo_preparo,
            List<Receitas_and_ingredientes> ingredientes_id
    ) {
        this.id_receita = id_receita;
        this.nomeReceita = nomeReceita;
        this.data_criacao = data_criacao;
        this.cozinheiro_id = cozinheiro_id;
        this.categoria_id = categoria_id;
        this.modo_preparo = modo_preparo;
        this.ingredientes_id = ingredientes_id;
    }

    //Gets e Sets
    public Long getId_receita() {
        return id_receita;
    }

    public void setId_receita(Long id_receita) {
        this.id_receita = id_receita;
    }

    public String getNomeReceita() {
        return nomeReceita;
    }

    public void setNomeReceita(String nomeReceita) {
        this.nomeReceita = nomeReceita;
    }

    public String getData_criacao() {
        return data_criacao;
    }

    public void setData_criacao(String data_criacao) {
        this.data_criacao = data_criacao;
    }

    public Funcionario getCozinheiro_id() {
        return cozinheiro_id;
    }

    public void setCozinheiro_id(Funcionario cozinheiro_id) {
        this.cozinheiro_id = cozinheiro_id;
    }

    public Categoria getCategoria_id() {
        return categoria_id;
    }

    public void setCategoria_id(Categoria categoria_id) {
        this.categoria_id = categoria_id;
    }

    public String getModo_preparo() {
        return modo_preparo;
    }

    public void setModo_preparo(String modo_preparo) {
        this.modo_preparo = modo_preparo;
    }


    public List<Receitas_and_ingredientes> getIngredientes_id() {
        return ingredientes_id;
    }

    public void setIngredientes_id(List<Receitas_and_ingredientes> ingredientes_id) {
        this.ingredientes_id = ingredientes_id;
    }
}

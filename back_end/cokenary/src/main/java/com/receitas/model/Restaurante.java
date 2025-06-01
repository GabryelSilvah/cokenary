package com.receitas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "restaurantes")
public class Restaurante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_restaurante")
    private Long idRestaurante;

    @NotNull(message = "Informe o nome do restaurante")
    @Column(name = "nome", nullable = false, length = 45)
    private String nome;

    @Column(name = "contato", length = 45)
    private String contato;

    @Column(name = "telefone", length = 15)
    private String telefone;

    @OneToMany(mappedBy = "restauranteId", fetch = FetchType.LAZY)
    private List<Referencia> referencias;

    // Construtores
    public Restaurante() {
    }

    public Restaurante(String nome, String contato, String telefone) {
        this.nome = nome;
        this.contato = contato;
        this.telefone = telefone;
    }

    // Gets e Sets
    public Long getIdRestaurante() {
        return idRestaurante;
    }

    public void setIdRestaurante(Long idRestaurante) {
        this.idRestaurante = idRestaurante;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public List<Referencia> getReferencias() {
        return referencias;
    }

    public void setReferencias(List<Referencia> referencias) {
        this.referencias = referencias;
    }
}
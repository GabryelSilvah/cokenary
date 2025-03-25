package com.receitas.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.Date;

@Entity
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Título é obrigatório
    private String title;

    @Column(nullable = false) // Descrição é obrigatória
    private String description;

    @ElementCollection // Mapeia uma lista de strings
    private List<String> ingredients;

    @Column(nullable = false) // Instruções são obrigatórias
    private String instructions;

    @Column(nullable = false) // Categoria é obrigatória
    private String category;

    @Column(nullable = false) // Chef é obrigatório
    private String chef;

    @Column(nullable = false) // Dificuldade é obrigatória
    private String difficulty;

    @Column(nullable = false) // Tempo é obrigatório
    private String time;

    @Column(nullable = false) // Rating é obrigatório
    private Double rating; // Alterado para Double para permitir valores decimais e null

    @Column(nullable = true) // Imagem é opcional
    private String image;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP) // Armazena data e hora
    private Date createdAt; // Data de criação

    @Column(name = "updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP) // Armazena data e hora
    private Date updatedAt; // Data de atualização

    // Construtor padrão (obrigatório para JPA)
    public Receita() {
    }

    // Método pré-persist: Define a data de criação e atualização antes de salvar no banco
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // Método pré-update: Atualiza a data de atualização antes de atualizar no banco
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getChef() {
        return chef;
    }

    public void setChef(String chef) {
        this.chef = chef;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
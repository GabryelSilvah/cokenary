package com.receitas.repository;

import com.receitas.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Integer> {
    // Métodos adicionais podem ser declarados aqui
    List<Ingrediente> findByNomeContainingIgnoreCase(String nome);
}
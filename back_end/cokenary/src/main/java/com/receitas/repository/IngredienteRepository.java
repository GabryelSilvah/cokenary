package com.receitas.repository;

import com.receitas.model.Categoria;
import com.receitas.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.Optional;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {

    @NativeQuery("SELECT * FROM ingredientes WHERE nome = :name")
    Optional<Ingrediente> findByName(String name);
}

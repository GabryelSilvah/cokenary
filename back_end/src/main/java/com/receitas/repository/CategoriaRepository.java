package com.receitas.repository;

import com.receitas.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @NativeQuery("SELECT * FROM categorias WHERE nome_categoria = :name")
    Optional<Categoria> findByName(String name);
}

package com.receitas.repository;

import com.receitas.model.Categoria;
import com.receitas.model.Medida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;

public interface MedidaRepository extends JpaRepository<Medida, Long> {


    @NativeQuery("SELECT * FROM medidas WHERE nome_med = :name")
    Optional<Medida> findByName(String name);
}
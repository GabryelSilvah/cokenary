package com.receitas.repository;

import com.receitas.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {

    @NativeQuery("SELECT * FROM restaurantes WHERE nome = :nome")
    Optional<Restaurante> findByNome(String nome);

    boolean existsByNome(String nome);
}
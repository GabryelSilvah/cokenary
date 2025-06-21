package com.receitas.repository;

import com.receitas.model.Cargo;
import com.receitas.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {
    Optional<Cargo> findByNome(String nome);

    @NativeQuery("SELECT count(id) FROM cargos;")
    int countRegistro();
}
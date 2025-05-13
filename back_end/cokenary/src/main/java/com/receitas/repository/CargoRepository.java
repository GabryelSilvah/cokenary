package com.receitas.repository;

import com.receitas.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {
    boolean existsByNome(String nome);

    List<Cargo> findByIndAtivoTrue();

    List<Cargo> findByIndAtivoFalse();

    // Optional: If you need to find by specific status (including null)
    List<Cargo> findByIndAtivo(Boolean indAtivo);
}
package com.receitas.repository;

import com.receitas.model.Metricas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.Optional;

public interface MetricasRepository extends JpaRepository<Metricas, Long> {


    @NativeQuery("SELECT * FROM metricas WHERE fk_funcionario = :fk_funcionario LIMIT 1")
    Optional<Metricas> findByFk_funcionario(Long fk_funcionario);
}

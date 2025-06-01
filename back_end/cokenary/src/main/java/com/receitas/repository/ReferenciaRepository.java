package com.receitas.repository;

import com.receitas.model.Referencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferenciaRepository extends JpaRepository<Referencia, Long> {

    @Query("SELECT r FROM Referencia r JOIN FETCH r.funcionarioId f JOIN FETCH r.restauranteId res")
    List<Referencia> findAllJoin();

    @Query("SELECT r FROM Referencia r WHERE r.funcionarioId.id_func = :funcionarioId")
    List<Referencia> findByFuncionarioId(@Param("funcionarioId") Long funcionarioId);

    @Query("SELECT r FROM Referencia r WHERE r.restauranteId.idRestaurante = :restauranteId")
    List<Referencia> findByRestauranteId(@Param("restauranteId") Long restauranteId);
}
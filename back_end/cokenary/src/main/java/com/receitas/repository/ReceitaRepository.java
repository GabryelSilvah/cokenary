package com.receitas.repository;

import com.receitas.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    Receita findByNomeReceita(String nome);

    @NativeQuery("SELECT * FROM receitas INNER JOIN categorias ON receitas.categoria_id = categorias.id_cat INNER JOIN funcionarios ON funcionarios.id_func = receitas.cozinheiro_id;")
    List<Receita> findAllJoin();
    @NativeQuery("SELECT * FROM receitas INNER JOIN categorias ON receitas.categoria_id = categorias.id_cat INNER JOIN funcionarios ON funcionarios.id_func = receitas.cozinheiro_id WHERE receitas.id_receita = :id;")
    Optional<Receita> findByIdJoin(Long id);
}
package com.receitas.repository;

import com.receitas.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    @NativeQuery("SELECT * FROM avaliacoes WHERE fk_receita = :name")
    Optional<Avaliacao> findByName(String name);

    @NativeQuery("SELECT * FROM avaliacoes WHERE fk_degustador = :id_degustador and fk_receita = :id_receita")
    Optional<Avaliacao> findByDegustador(Long id_degustador, Long id_receita);
}

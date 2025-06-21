package com.receitas.repository;

import com.receitas.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    @NativeQuery("SELECT * FROM avaliacoes WHERE fk_receita = :name")
    Optional<Avaliacao> findByName(String name);

    @NativeQuery("SELECT * FROM avaliacoes WHERE fk_degustador = :id_degustador and fk_receita = :id_receita")
    Optional<Avaliacao> findByDegustadorAndReceita(Long id_degustador, Long id_receita);

    @NativeQuery("SELECT * FROM avaliacoes WHERE fk_degustador = :fk_degustador;")
    List<Avaliacao> findByDegustador(Long fk_degustador);


    @NativeQuery("SELECT count(id) FROM avaliacoes;")
    int countRegistro();
}

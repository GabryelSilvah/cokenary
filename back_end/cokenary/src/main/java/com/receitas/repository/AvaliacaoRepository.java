package com.receitas.repository;

import com.receitas.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    @NativeQuery("SELECT * FROM avaliacoes WHERE nome_receita_id = :name")
    Optional<Avaliacao> findByName(String name);
}

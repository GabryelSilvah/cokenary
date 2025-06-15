package com.receitas.repository;

import com.receitas.dto.Publicacao_livroDTO;
import com.receitas.model.Publicacao_livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;

public interface Publicacao_livroRepository extends JpaRepository<Publicacao_livro, Long> {

    @NativeQuery(
            "SELECT id_publicacao, fk_livro, fk_receita from publicacoes_livros\n" +
                    "INNER JOIN livros\n" +
                    "ON publicacoes_livros.fk_livro = livros.id_livro\n" +
                    "INNER JOIN receitas\n" +
                    "ON publicacoes_livros.fk_receita = receitas.id_receita\n" +
                    "WHERE fk_livro = :id;"
    )
    List<Publicacao_livroDTO> findJoinAllDetails(Long id);

}

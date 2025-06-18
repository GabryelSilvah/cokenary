package com.receitas.repository;

import com.receitas.dto.Publicacao_livroDTO;
import com.receitas.model.Publicacao_livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;

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


    @NativeQuery("SELECT * FROM publicacoes_livros WHERE fk_livro = :id_livro")
    List<Publicacao_livro> findByFkLivro(Long id_livro);

    @NativeQuery("SELECT * FROM publicacoes_livros WHERE fk_receita = :id_receita and fk_livro = :id_livro")
    Optional<Publicacao_livro> findByFkReceitaAndLivro(Long id_receita, Long id_livro);

    @Modifying
    @NativeQuery("DELETE FROM publicacoes_livros WHERE fk_receita = :id_receita and fk_livro = :id_livro LIMIT 1")
    void deleteByReceita(Long id_receita, Long id_livro);

}

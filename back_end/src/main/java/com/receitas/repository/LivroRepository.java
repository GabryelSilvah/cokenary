package com.receitas.repository;

import com.receitas.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {

    Optional<Livro> findByTituloLivro(String tituloLivro);

    @NativeQuery("SELECT count(id_cat) FROM categorias;")
    int countRegistro();
}

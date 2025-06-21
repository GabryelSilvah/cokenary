package com.receitas.repository;

import com.receitas.dto.ReceitaFullDTO;
import com.receitas.dto.Receita_all_infor;
import com.receitas.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    Optional<Receita> findByNomeReceita(String nome);

    @NativeQuery("SELECT id_receita, nome_receita FROM receitas WHERE id_receita = :id_receita")
    ReceitaFullDTO findByIdReceita(Long id_receita);


    @NativeQuery("SELECT * " +
            "FROM receitas INNER " +
            "JOIN categorias " +
            "ON receitas.categoria_id = categorias.id_cat " +
            "INNER JOIN funcionarios " +
            "ON funcionarios.id_func = receitas.cozinheiro_id " +
            "WHERE receitas.id_receita = :id;")
    Optional<Receita> findByIdJoin(Long id);


    @NativeQuery("SELECT id_receita, id_func, id_cat, nome_receita, data_criacao, funcionarios.nome, categorias.nome_categoria, modo_preparo  \n" +
            "FROM receitas\n" +
            "INNER JOIN funcionarios \n" +
            "ON receitas.cozinheiro_id = funcionarios.id_func\n" +
            "INNER JOIN categorias\n" +
            "ON receitas.categoria_id = categorias.id_cat\n"
    )
    List<Receita_all_infor> findAlldJoinDetails();

    @NativeQuery("SELECT id_receita, id_func, id_cat, nome_receita, data_criacao, funcionarios.nome, categorias.nome_categoria, modo_preparo  \n" +
            "FROM receitas\n" +
            "INNER JOIN funcionarios \n" +
            "ON receitas.cozinheiro_id = funcionarios.id_func\n" +
            "INNER JOIN categorias\n" +
            "ON receitas.categoria_id = categorias.id_cat\n" +
            "WHERE id_receita = :id")
    Optional<Receita_all_infor> findByIdJoinDetails(Long id);

    @NativeQuery("SELECT count(id_receita) FROM receitas;")
    int countRegistro();
}
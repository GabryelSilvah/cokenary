package com.receitas.repository;


import com.receitas.model.Composicao;
import com.receitas.model.Ingredientes_receita;
import com.receitas.model.Receitas_and_ingredientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;
import java.util.Optional;


public interface Receitas_and_ingredintesRepository extends JpaRepository<Receitas_and_ingredientes, Long> {

    @NativeQuery(
            "SELECT medidas.nome_med, ingredientes.nome, receitas_and_ingredientes.receita_id " +
                    "FROM receitas_and_ingredientes " +
                    "INNER JOIN ingredientes " +
                    "ON ingredientes.id_ingred = receitas_and_ingredientes.ingrediente_id " +
                    "INNER JOIN medidas " +
                    "ON medidas.id_med = receitas_and_ingredientes.medida_id " +
                    "INNER JOIN receitas " +
                    "ON receitas.id_receita = receitas_and_ingredientes.receita_id;"
    )
    List<Receitas_and_ingredientes> findAllJoin();


    @NativeQuery(
            "SELECT  receitas_and_ingredientes.id_composicao, medidas.nome_med, ingredientes.nome, porcoes " +
                    "FROM receitas_and_ingredientes " +
                    "INNER JOIN ingredientes " +
                    "ON ingredientes.id_ingred = receitas_and_ingredientes.ingrediente_id " +
                    "INNER JOIN medidas " +
                    "ON medidas.id_med = receitas_and_ingredientes.medida_id " +
                    "INNER JOIN receitas " +
                    "ON receitas.id_receita = receitas_and_ingredientes.receita_id " +
                    "WHERE receita_id = :id_receita;"

    )
    List<Ingredientes_receita> findByIdJoin(Long id_receita);


    @NativeQuery(
            "SELECT id_receita, id_composicao, id_ingred, id_med, nome_med,\n" +
                    "ingredientes.nome as nome_ingred\n" +
                    "FROM receitas_and_ingredientes\n" +
                    "INNER JOIN receitas\n" +
                    "ON receitas_and_ingredientes.receita_id = receitas.id_receita\n" +
                    "INNER JOIN medidas\n" +
                    "ON medidas.id_med = receitas_and_ingredientes.medida_id\n" +
                    "INNER JOIN ingredientes\n" +
                    "ON ingredientes.id_ingred = receitas_and_ingredientes.ingrediente_id\n" +
                    "WHERE receita_id = :id_receita")
    List<Composicao> findByIdJoinAllInfor(Long id_receita);

    @NativeQuery("SELECT * FROM receitas_and_ingredientes WHERE receita_id = :fk_receita")
    List<Receitas_and_ingredientes> findByReita(Long fk_receita);


    @NativeQuery("SELECT * FROM receitas_and_ingredientes WHERE receita_id = :fk_receita AND ingrediente_id = :fk_ingrediente;")
    Optional<Receitas_and_ingredientes> findByReceitaAndIngrediente(Long fk_receita, Long fk_ingrediente);

    @Modifying
    @NativeQuery("DELETE FROM receitas_and_ingredientes WHERE receita_id = :fk_receita AND ingrediente_id = :fk_ingrediente;")
    void deleteByReceita(Long fk_receita, Long fk_ingrediente);

}

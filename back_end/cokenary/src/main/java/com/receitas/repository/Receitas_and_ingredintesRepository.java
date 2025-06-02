package com.receitas.repository;

import com.receitas.model.Ingredientes_receita;
import com.receitas.model.Receitas_and_ingredientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;

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
            "SELECT  medidas.nome_med, ingredientes.nome, receitas_and_ingredientes.receita_id " +
                    "FROM receitas_and_ingredientes " +
                    "INNER JOIN ingredientes " +
                    "ON ingredientes.id_ingred = receitas_and_ingredientes.ingrediente_id " +
                    "INNER JOIN medidas " +
                    "ON medidas.id_med = receitas_and_ingredientes.medida_id " +
                    "INNER JOIN receitas " +
                    "ON receitas.id_receita = receitas_and_ingredientes.receita_id " +
                    "WHERE receita_id = :id_receita;"

    )
    List<Receitas_and_ingredientes> findByIdJoin(Long id_receita);
}

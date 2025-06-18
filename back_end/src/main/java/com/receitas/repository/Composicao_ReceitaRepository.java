package com.receitas.repository;

import com.receitas.dto.Composicao_ReceitaDTO;
import com.receitas.model.Receitas_and_ingredientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.List;

public interface Composicao_ReceitaRepository extends JpaRepository<Receitas_and_ingredientes, Long> {

    @NativeQuery(
            "SELECT  id_composicao, id_ingred, id_med, ingredientes.nome, nome_med, porcoes\n" +
                    "FROM receitas_and_ingredientes\n" +
                    "INNER JOIN ingredientes\n" +
                    "ON ingredientes.id_ingred = receitas_and_ingredientes.ingrediente_id\n" +
                    "INNER JOIN medidas\n" +
                    "ON medidas.id_med = receitas_and_ingredientes.medida_id\n" +
                    "WHERE receita_id = :id;"
    )
    List<Composicao_ReceitaDTO> findJoinAllDetails(Long id);
}

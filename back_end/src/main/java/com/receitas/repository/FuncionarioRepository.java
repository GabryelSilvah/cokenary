package com.receitas.repository;

import com.receitas.model.Funcionario;
import com.receitas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Funcionario findByNome(String nome);

    @NativeQuery(value = "SELECT " +
            "funcionarios.id_func, " +
            "funcionarios.nome, " +
            "funcionarios.rg, " +
            "funcionarios.dt_adm, " +
            "funcionarios.salario, " +
            "funcionarios.imagem_perfil, " +
            "funcionarios.cargo_id, " +
            "cargos.nome as nomeCargo  " +
            "FROM funcionarios " +
            "LEFT JOIN cargos " +
            "ON cargos.id = funcionarios.cargo_id"
    )
    List<Funcionario> findAllJoin();

    @Query("SELECT f.nome FROM Funcionario f INNER JOIN f.cargo_id WHERE f.id_func = :id")
    Funcionario findByIdJoin(int id);

    @NativeQuery(
            "SELECT  id_func, dt_adm, imagem_perfil, funcionarios.nome, rg, salario, cargo_id, id, cargos.nome as nome_cargo\n" +
                    "FROM funcionarios\n" +
                    "INNER JOIN cargos\n" +
                    "ON funcionarios.cargo_id = cargos.id\n" +
                    "WHERE cargos.nome = :nome_cargo;"
    )
    List<Funcionario> findByNomeCargo(String nome_cargo);

    @NativeQuery("SELECT count(id_func) FROM funcionarios;")
    int countRegistro();

    @Modifying
    @NativeQuery("DELETE FROM funcionarios WHERE id_func = :id")
    void deleteByIdOn(Long id);
}

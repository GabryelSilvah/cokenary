package com.receitas.repository;

import com.receitas.model.Funcionario;
import com.receitas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Funcionario findByNome(String nome);

    @NativeQuery(value = "SELECT funcionarios.id_func, funcionarios.nome, funcionarios.rg, funcionarios.dt_adm, funcionarios.salario, funcionarios.imagem_perfil, funcionarios.cargo_id, cargos.nome as nomeCargo  " +
            "FROM funcionarios " +
            "LEFT JOIN cargos " +
            "ON cargos.id = funcionarios.cargo_id"
    )
    List<Funcionario> findAllJoin();

    @Query("SELECT f.nome FROM Funcionario f INNER JOIN f.cargo_id WHERE f.id_func = :id")
    Funcionario findByIdJoin(int id);
}

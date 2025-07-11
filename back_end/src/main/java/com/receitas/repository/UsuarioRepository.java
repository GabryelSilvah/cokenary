package com.receitas.repository;

import com.receitas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.NativeQuery;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    @Modifying
    @NativeQuery("DELETE FROM usuarios WHERE fk_funcionario = :fk_funcionario;")
    void deleteByFk_funcionario(Long fk_funcionario);

    @NativeQuery("SELECT * FROM usuarios WHERE fk_funcionario = :fk_funcionario")
    Optional<Usuario> findByFuncionario(Long fk_funcionario);

    @NativeQuery("SELECT fk_funcionario FROM usuarios WHERE email = :nome_usuario;")
    Long findByFkFuncionario(String nome_usuario);

    @NativeQuery("" +
            "SELECT cargos.nome FROM usuarios\n" +
            "INNER JOIN funcionarios\n" +
            "ON usuarios.fk_funcionario = funcionarios.id_func\n" +
            "INNER JOIN cargos\n" +
            "ON funcionarios.cargo_id = cargos.id\n" +
            "WHERE usuarios.email = :nome_usuarios"
    )
    Optional<String> findByCargo(String nome_usuarios);
}




package com.receitas.repository;

import com.receitas.model.Usuario_Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface In_UsuarioRepository extends JpaRepository<Usuario_Model,Long> {

      Usuario_Model findByEmail(String email);
}

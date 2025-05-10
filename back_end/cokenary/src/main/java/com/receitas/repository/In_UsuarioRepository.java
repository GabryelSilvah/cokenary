package com.receitas.repository;

import com.receitas.model.Usuario_Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface In_UsuarioRepository extends JpaRepository<Usuario_Model,Long> {

<<<<<<< HEAD
    Usuario_Model findByEmail(String email);
    @Query(value = "SELECT U FROM Usuario_Model as U WHERE U.id = ?1")
    Usuario_Model myFindById(Long id);
}
=======
      Usuario_Model findByEmail(String email);
      @Query(value = "SELECT U FROM Usuario_Model as U WHERE U.id = ?1")
      Usuario_Model myFindById(Long id);
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

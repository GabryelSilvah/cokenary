package com.receitas.repository;

import com.receitas.model.Medida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedidaRepository extends JpaRepository<Medida, Integer> {

}
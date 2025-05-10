package com.receitas.service;

import com.receitas.exception.ResourceNotFoundException;
import com.receitas.model.Ingrediente;
import com.receitas.repository.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class IngredienteService {

    private final IngredienteRepository ingredienteRepository;

    @Autowired
    public IngredienteService(IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
    }

    @Transactional(readOnly = true)
    public List<Ingrediente> listarTodos() {
        return ingredienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Ingrediente buscarPorId(Integer id) {
        return ingredienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingrediente não encontrado com o ID: " + id));
    }

    @Transactional
    public Ingrediente salvar(Ingrediente ingrediente) {
        validarIngrediente(ingrediente);
        return ingredienteRepository.save(ingrediente);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!ingredienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ingrediente não encontrado com o ID: " + id);
        }
        ingredienteRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Ingrediente> buscarPorNome(String nome) {
        return ingredienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    private void validarIngrediente(Ingrediente ingrediente) {
        if (ingrediente.getNome() == null || ingrediente.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Nome do ingrediente é obrigatório");
        }
        if (ingrediente.getNome().length() > 45) {
            throw new IllegalArgumentException("Nome do ingrediente não pode exceder 45 caracteres");
        }
        if (ingrediente.getDescricao() != null && ingrediente.getDescricao().length() > 1000) {
            throw new IllegalArgumentException("Descrição não pode exceder 1000 caracteres");
        }
    }
}
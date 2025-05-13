package com.receitas.service;

import com.receitas.exception.ResourceNotFoundException;
import com.receitas.model.Receita;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public List<Receita> listarTodas() {
        return receitaRepository.findAll();
    }

    public Receita buscarPorId(Long id) {
        return receitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receita não encontrada com o ID: " + id));
    }

    public Receita salvar(Receita receita) {
        return receitaRepository.save(receita);
    }

    public Receita atualizar(Long id, Receita receita) {
        Receita receitaExistente = buscarPorId(id);

        // Atualiza apenas os campos não nulos
        if (receita.getTitle() != null) receitaExistente.setTitle(receita.getTitle());
        if (receita.getDescription() != null) receitaExistente.setDescription(receita.getDescription());
        if (receita.getIngredients() != null) receitaExistente.setIngredients(receita.getIngredients());
        if (receita.getInstructions() != null) receitaExistente.setInstructions(receita.getInstructions());
        if (receita.getCategory() != null) receitaExistente.setCategory(receita.getCategory());
        if (receita.getChef() != null) receitaExistente.setChef(receita.getChef());
        if (receita.getDifficulty() != null) receitaExistente.setDifficulty(receita.getDifficulty());
        if (receita.getTime() != null) receitaExistente.setTime(receita.getTime());
        if (receita.getRating() != null) receitaExistente.setRating(receita.getRating());
        if (receita.getImage() != null) receitaExistente.setImage(receita.getImage());

        return receitaRepository.save(receitaExistente);
    }

    public boolean existePorId(Long id) {
        return receitaRepository.existsById(id);
    }

    public void deletar(Long id) {
        Receita receita = buscarPorId(id);
        receitaRepository.delete(receita);
    }
}

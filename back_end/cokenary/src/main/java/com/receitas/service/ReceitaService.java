package com.receitas.service;

import com.receitas.exception.GlobalExceptionHandler;
import com.receitas.exception.ResourceNotFoundException;
import com.receitas.model.Receita;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@CrossOrigin
<<<<<<< HEAD
public abstract class ReceitaService {
=======
public class ReceitaService {
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

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
        // Busca a receita existente no banco de dados
        Receita receitaExistente = buscarPorId(id);

        // Verifica se a receita existe
        if (receitaExistente == null) {
            throw new RuntimeException("Receita não encontrada com o ID: " + id);
        }

        // Atualiza apenas os campos não nulos
        if (receita.getTitle() != null) {
            receitaExistente.setTitle(receita.getTitle());
        }
        if (receita.getDescription() != null) {
            receitaExistente.setDescription(receita.getDescription());
        }
        if (receita.getIngredients() != null) {
            receitaExistente.setIngredients(receita.getIngredients());
        }
        if (receita.getInstructions() != null) {
            receitaExistente.setInstructions(receita.getInstructions());
        }
        if (receita.getCategory() != null) {
            receitaExistente.setCategory(receita.getCategory());
        }
        if (receita.getChef() != null) {
            receitaExistente.setChef(receita.getChef());
        }
        if (receita.getDifficulty() != null) {
            receitaExistente.setDifficulty(receita.getDifficulty());
        }
        if (receita.getTime() != null) {
            receitaExistente.setTime(receita.getTime());
        }
        if (receita.getRating() != null) {
            receitaExistente.setRating(receita.getRating());
        }
        if (receita.getImage() != null) {
            receitaExistente.setImage(receita.getImage());
        }

        // Salva a receita atualizada no banco de dados
        return receitaRepository.save(receitaExistente);
    }

    public abstract boolean existePorId(Long id);

    public void deletar(Long id) {
        Receita receita = buscarPorId(id);
        receitaRepository.delete(receita);
    }

    public Receita updateReceita(String id, Receita receita) {

        return receita;
    }
}
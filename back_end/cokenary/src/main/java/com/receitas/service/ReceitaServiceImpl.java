package com.receitas.service;

import com.receitas.model.Receita;
import com.receitas.repository.ReceitaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReceitaServiceImpl extends ReceitaService {

    private final ReceitaRepository receitaRepository;

    public ReceitaServiceImpl(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    @Override
    public List<Receita> listarTodas() {
        return receitaRepository.findAll();
    }

    @Override
    public Receita buscarPorId(Long id) {
        return receitaRepository.findById(id).orElse(null);
    }

    @Override
    public Receita salvar(Receita receita) {
        return receitaRepository.save(receita);
    }

    @Override
    public boolean existePorId(Long id) {
        return receitaRepository.existsById(id);
    }

    @Override
    public void deletar(Long id) {
        receitaRepository.deleteById(id);
    }
}
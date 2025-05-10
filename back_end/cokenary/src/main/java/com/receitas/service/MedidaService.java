package com.receitas.service;

import com.receitas.exception.ResourceNotFoundException;
import com.receitas.model.Medida;
import com.receitas.repository.MedidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MedidaService {

    private final MedidaRepository medidaRepository;

    @Autowired
    public MedidaService(MedidaRepository medidaRepository) {
        this.medidaRepository = medidaRepository;
    }

    @Transactional(readOnly = true)
    public List<Medida> listarTodas() {
        return medidaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Medida buscarPorId(Integer id) {
        return medidaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medida não encontrada com o ID: " + id));
    }

    @Transactional
    public Medida salvar(Medida medida) {
        validarMedida(medida);
        return medidaRepository.save(medida);
    }

    @Transactional
    public void deletar(Integer id) {
        if (!medidaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Medida não encontrada com o ID: " + id);
        }
        medidaRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Medida> buscarPorDescricao(String descricao) {
        return medidaRepository.findByDescricaoContainingIgnoreCase(descricao);
    }

    private void validarMedida(Medida medida) {
        if (medida.getDescricao() == null || medida.getDescricao().trim().isEmpty()) {
            throw new IllegalArgumentException("Descrição da medida é obrigatória");
        }
        if (medida.getDescricao().length() > 45) {
            throw new IllegalArgumentException("Descrição não pode exceder 45 caracteres");
        }
    }
}
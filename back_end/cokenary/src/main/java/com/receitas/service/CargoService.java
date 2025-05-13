package com.receitas.service;

import com.receitas.model.Cargo;
import com.receitas.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    // Incluir Cargo (0001)
    public Cargo incluir(Cargo cargo) {
        if (cargoRepository.existsByNome(cargo.getNome())) {
            throw new RuntimeException("Já existe um cargo com este nome");
        }
        return cargoRepository.save(cargo);
    }

    // Alterar Cargo (0002)
    public Cargo alterar(Long id, Cargo cargoAtualizado) {
        return cargoRepository.findById(id)
                .map(cargo -> {
                    if (!cargo.getNome().equals(cargoAtualizado.getNome()) &&
                            cargoRepository.existsByNome(cargoAtualizado.getNome())) {
                        throw new RuntimeException("Já existe um cargo com este nome");
                    }
                    cargo.setNome(cargoAtualizado.getNome());
                    cargo.setDescricao(cargoAtualizado.getDescricao());
                    return cargoRepository.save(cargo);
                })
                .orElseThrow(() -> new RuntimeException("Cargo não encontrado"));
    }

    // Consultar Cargo (0003)
    public List<Cargo> listarTodos() {
        return cargoRepository.findAll();
    }

    public Optional<Cargo> buscarPorId(Long id) {
        return cargoRepository.findById(id);
    }

    // Excluir Cargo (0004)
    @Transactional
    public void excluir(Long id) {
        Cargo cargo = cargoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cargo não encontrado"));

        if (!cargo.getFuncionarios().isEmpty()) {
            throw new RuntimeException("Não é possível excluir o cargo pois existem funcionários vinculados");
        }

        cargoRepository.delete(cargo);
    }
}
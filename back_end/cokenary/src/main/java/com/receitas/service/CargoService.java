package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.CargoDTO;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;
import com.receitas.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;


    // Consultar Cargo (0003)
    public ResponseJson listarTodos() {
        //Buscando dados do cargo
        List<Cargo> cargoEncontrados = cargoRepository.findAll();
        List<CargoDTO> listaCargo = new ArrayList<>(); //Inicializando lista de funcionárioDTO

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < cargoEncontrados.size(); i++) {
            CargoDTO cargo = new CargoDTO(
                    cargoEncontrados.get(i).getId(),
                    cargoEncontrados.get(i).getNome(),
                    cargoEncontrados.get(i).getDescricao(),
                    cargoEncontrados.get(i).getData_inicio(),
                    cargoEncontrados.get(i).getData_fim(),
                    cargoEncontrados.get(i).getIndAtivo()

            );
            listaCargo.add(cargo);//Adiciona na lista DTO
        }
        return new ResponseJson(HttpStatus.OK, "Cargos listados com sucesso!", listaCargo);
    }

    // Incluir Cargo (0001)
    public ResponseJson incluir(Cargo cargo) {
        if (cargoRepository.existsByNome(cargo.getNome())) {
            throw new RuntimeException("Já existe um cargo com este nome");
        }
        Cargo cargoSalvo =  cargoRepository.save(cargo);
        return new ResponseJson(HttpStatus.OK, "Cargos listados com sucesso!", cargoSalvo);
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
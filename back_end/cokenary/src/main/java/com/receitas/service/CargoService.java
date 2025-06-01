package com.receitas.service;


import com.receitas.dto.CargoDTO;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Cargo;
import com.receitas.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    public List<CargoDTO> listAll() {

        //Buscando cargos
        List<Cargo> listaCargos = cargoRepository.findAll();
        List<CargoDTO> listaCargosDTO = new ArrayList<>();

        //Convertendo lista de cargos para cargoDTO
        for (int i = 0; i < listaCargos.size(); i++) {
            listaCargosDTO.add(new CargoDTO(listaCargos.get(i).getId(), listaCargos.get(i).getNome()));
        }

        return listaCargosDTO;
    }

    public CargoDTO listById(Long id) {

        //Buscando cargo com o nome passado
        Optional<Cargo> cargoEncontrada = cargoRepository.findById(id);

        //Validando se nome da cargo já existe
        if (cargoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("O cargo de ID (" + id + ") não foi encontrado");
        }

        //Retornando cargo no formato DTO
        return new CargoDTO(cargoEncontrada.get().getId(), cargoEncontrada.get().getNome());
    }

    public CargoDTO save(Cargo cargo) {

        //Buscando cargo informado
        Optional<Cargo> cargoEncontrada = cargoRepository.findByNome(cargo.getNome());

        //Validando se nome da cargo já existe
        if (cargoEncontrada.isPresent()) {
            throw new RegistroExistsException("O cargo (" + cargo.getNome() + ") já existe");
        }

        //Salvando na base de dados
        Cargo cargoSalvo = cargoRepository.save(cargo);

        //Retornando cargo no formato DTO
        return new CargoDTO(cargoSalvo.getId(), cargoSalvo.getNome());
    }


    public CargoDTO update(Long id, Cargo cargo) {

        //Buscando cargo
        Optional<Cargo> cargoEncontrado = cargoRepository.findById(id);

        //Validando se cargo existe
        if (cargoEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O cargo de ID (" + id + ") não foi encontrado");
        }

        //Alterando cargo encontrada
        cargoEncontrado.get().setNome(cargo.getNome());

        //Salvando cargo modificado
        Cargo cargoSalva = cargoRepository.save(cargoEncontrado.get());

        //Retornando no formato DTO
        return new CargoDTO(cargoSalva.getId(), cargoSalva.getNome());
    }

    public Boolean delete(Long id) {

        //Buscando cargo
        Optional<Cargo> cargoEncontrado = cargoRepository.findById(id);

        //Validando se cargo existe
        if (cargoEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O cargo de ID (" + id + ") não foi encontrado");
        }

        cargoRepository.deleteById(id);

        return true;
    }
}
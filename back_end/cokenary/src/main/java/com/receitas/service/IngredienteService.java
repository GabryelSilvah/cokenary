package com.receitas.service;


import com.receitas.dto.IngredienteDTO;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Ingrediente;
import com.receitas.repository.IngredienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IngredienteService {

    @Autowired
    private IngredienteRepository ingredienteRepository;


    public List<IngredienteDTO> listAll() {

        //Buscando ingredientes
        List<Ingrediente> listaIngredientes = ingredienteRepository.findAll();
        List<IngredienteDTO> listaIngredientesDTO = new ArrayList<>();

        //Convertendo para ingredientesDTO
        for (int i = 0; i < listaIngredientes.size(); i++) {
            listaIngredientesDTO.add(
                    new IngredienteDTO(listaIngredientes.get(i).getId(), listaIngredientes.get(i).getNome())
            );

        }

        return listaIngredientesDTO;
    }


    public IngredienteDTO listById(Long id) {

        //Buscando ingredientes
        Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(id);

        //Validando ingredites foi encontrado
        if (ingredienteEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O ingredite de ID (" + id + ") não foi encontrado");
        }

        //Retornando ingredientes no formato DTO
        return new IngredienteDTO(ingredienteEncontrado.get().getId(), ingredienteEncontrado.get().getNome());
    }


    public IngredienteDTO save(Ingrediente ingrediente) {
        //Buscando ingrediente com o nome passado
        Optional<Ingrediente> ingredienteEncontrada = ingredienteRepository.findByName(ingrediente.getNome());

        //Validando se nome da ingrediente já existe
        if (ingredienteEncontrada.isPresent()) {
            throw new RegistroExistsException("A ingrediente (" + ingrediente.getNome() + ") já existe");
        }

        //Salvando na base de dados
        Ingrediente ingredienteSalva = ingredienteRepository.save(ingrediente);

        //Retornando ingrediente no formato DTO
        return new IngredienteDTO(
                ingredienteSalva.getId(),
                ingredienteSalva.getNome()
        );
    }

    public IngredienteDTO update(Long id, Ingrediente ingrediente) {

        //Buscando ingrediente
        Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(id);

        //Validando se ingrediente existe
        if (ingredienteEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O ingrediente de ID (" + id + ") não foi encontrado");
        }

        //Alterando ingrediente encontrada
        ingredienteEncontrado.get().setNome(ingrediente.getNome());

        //Salvando ingrediente modificada
        Ingrediente ingredienteSalvo = ingredienteRepository.save(ingredienteEncontrado.get());

        //Retornando no formato DTO
        return new IngredienteDTO(ingredienteSalvo.getId(), ingredienteSalvo.getNome());
    }

    public Boolean delete(Long id) {

        //Buscando ingrediente
        Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(id);

        //Validando se ingrediente foi encontrado
        if (ingredienteEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O ingrediente de ID (" + id + ") não foi encontrada");
        }

        ingredienteRepository.deleteById(id);

        return true;
    }

}

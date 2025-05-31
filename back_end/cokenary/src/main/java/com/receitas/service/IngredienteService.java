package com.receitas.service;

import com.receitas.dto.CategoriaDTO;
import com.receitas.dto.IngredienteDTO;
import com.receitas.exception.CategoriaExistsException;
import com.receitas.model.Categoria;
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


    public List<CategoriaDTO> listAll() {

        //Buscando ingredientes
        List<Ingrediente> listaIngredientes = ingredienteRepository.findAll();
        List<CategoriaDTO> listaIngredientesDTO = new ArrayList<>();

        //Convertendo lista de categorias para categoriasDTO
        for (int i = 0; i < listaIngredientes.size(); i++) {
            listaIngredientesDTO.add(
                    new CategoriaDTO(listaIngredientes.get(i).getId(), listaIngredientes.get(i).getNome())
            );

        }

        return listaIngredientesDTO;
    }


    public IngredienteDTO listById(Long id) {

        //Buscando categoria com o nome passado
        Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(id);

        //Validando se nome da categoria já existe
        if (ingredienteEncontrado.isEmpty()) {
            throw new CategoriaExistsException("O ingredite de ID (" + id + ") não foi encontrado");
        }

        //Retornando categoria no formato DTO
        return new IngredienteDTO(ingredienteEncontrado.get().getId(), ingredienteEncontrado.get().getNome());
    }


    public IngredienteDTO save(Ingrediente ingrediente) {
        //Buscando ingrediente com o nome passado
        Optional<Ingrediente> ingredienteEncontrada = ingredienteRepository.findByName(ingrediente.getNome());

        //Validando se nome da ingrediente já existe
        if (ingredienteEncontrada.isPresent()) {
            throw new CategoriaExistsException("A ingrediente (" + ingrediente.getNome() + ") já existe");
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
            throw new CategoriaExistsException("O ingrediente de ID (" + id + ") não foi encontrado");
        }

        //Alterando ingrediente encontrada
        ingredienteEncontrado.get().setNome(ingrediente.getNome());

        //Salvando ingrediente modificada
        Ingrediente ingredienteSalvo = ingredienteRepository.save(ingredienteEncontrado.get());

        //Retornando no formato DTO
        return new IngredienteDTO(ingredienteSalvo.getId(), ingredienteSalvo.getNome());
    }

    public Boolean delete(Long id) {

        //Buscando categoria
        Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(id);

        //Validando se ingrediente existe
        if (ingredienteEncontrado.isEmpty()) {
            throw new CategoriaExistsException("O ingrediente de ID (" + id + ") não foi encontrada");
        }

        ingredienteRepository.deleteById(id);

        return true;
    }

}

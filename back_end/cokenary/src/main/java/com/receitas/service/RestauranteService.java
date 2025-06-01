package com.receitas.service;

import com.receitas.dto.RestauranteDTO;
import com.receitas.exception.RestauranteExistsException;
import com.receitas.exception.RestauranteNotFoundException;
import com.receitas.model.Restaurante;
import com.receitas.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RestauranteService {

    @Autowired
    private RestauranteRepository restauranteRepository;

    public List<RestauranteDTO> listAll() {
        List<Restaurante> listaRestaurantes = restauranteRepository.findAll();
        List<RestauranteDTO> listaRestaurantesDTO = new ArrayList<>();

        for (Restaurante restaurante : listaRestaurantes) {
            listaRestaurantesDTO.add(
                    new RestauranteDTO(
                            restaurante.getIdRestaurante(),
                            restaurante.getNome(),
                            restaurante.getContato(),
                            restaurante.getTelefone()
                    )
            );
        }

        return listaRestaurantesDTO;
    }

    public RestauranteDTO listById(Long id) {
        Optional<Restaurante> restauranteEncontrado = restauranteRepository.findById(id);

        if (restauranteEncontrado.isEmpty()) {
            throw new RestauranteNotFoundException("O restaurante de ID (" + id + ") não foi encontrado");
        }

        Restaurante restaurante = restauranteEncontrado.get();
        return new RestauranteDTO(
                restaurante.getIdRestaurante(),
                restaurante.getNome(),
                restaurante.getContato(),
                restaurante.getTelefone()
        );
    }

    public RestauranteDTO save(Restaurante restaurante) {
        // Verifica se já existe um restaurante com este nome
        if (restauranteRepository.existsByNome(restaurante.getNome())) {
            throw new RestauranteExistsException("O restaurante (" + restaurante.getNome() + ") já existe");
        }

        Restaurante restauranteSalvo = restauranteRepository.save(restaurante);

        return new RestauranteDTO(
                restauranteSalvo.getIdRestaurante(),
                restauranteSalvo.getNome(),
                restauranteSalvo.getContato(),
                restauranteSalvo.getTelefone()
        );
    }

    public RestauranteDTO update(Long id, Restaurante restaurante) {
        Optional<Restaurante> restauranteEncontrado = restauranteRepository.findById(id);

        if (restauranteEncontrado.isEmpty()) {
            throw new RestauranteNotFoundException("O restaurante de ID (" + id + ") não foi encontrado");
        }

        // Verifica se o novo nome já existe para outro restaurante
        Optional<Restaurante> restauranteComMesmoNome = restauranteRepository.findByNome(restaurante.getNome());
        if (restauranteComMesmoNome.isPresent() &&
                !restauranteComMesmoNome.get().getIdRestaurante().equals(id)) {
            throw new RestauranteExistsException("Já existe outro restaurante com o nome (" + restaurante.getNome() + ")");
        }

        Restaurante restauranteExistente = restauranteEncontrado.get();
        restauranteExistente.setNome(restaurante.getNome());
        restauranteExistente.setContato(restaurante.getContato());
        restauranteExistente.setTelefone(restaurante.getTelefone());

        Restaurante restauranteSalvo = restauranteRepository.save(restauranteExistente);

        return new RestauranteDTO(
                restauranteSalvo.getIdRestaurante(),
                restauranteSalvo.getNome(),
                restauranteSalvo.getContato(),
                restauranteSalvo.getTelefone()
        );
    }

    public Boolean delete(Long id) {
        Optional<Restaurante> restauranteEncontrado = restauranteRepository.findById(id);

        if (restauranteEncontrado.isEmpty()) {
            throw new RestauranteNotFoundException("O restaurante de ID (" + id + ") não foi encontrado");
        }

        // Verifica se há referências vinculadas
        Restaurante restaurante = restauranteEncontrado.get();
        if (restaurante.getReferencias() != null && !restaurante.getReferencias().isEmpty()) {
            throw new RuntimeException("Não é possível excluir o restaurante pois existem referências vinculadas");
        }

        restauranteRepository.deleteById(id);
        return true;
    }
}
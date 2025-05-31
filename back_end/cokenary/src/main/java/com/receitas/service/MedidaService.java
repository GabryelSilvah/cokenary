package com.receitas.service;

import com.receitas.dto.MedidaDTO;
import com.receitas.exception.CategoriaExistsException;
import com.receitas.model.Medida;
import com.receitas.repository.MedidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MedidaService {

    @Autowired
    private MedidaRepository medidaRepository;

    public List<MedidaDTO> listAll() {

        //Buscando ingredientes
        List<Medida> listaMedidas = medidaRepository.findAll();
        List<MedidaDTO> listaMedidasDTO = new ArrayList<>();

        //Convertendo lista de categorias para categoriasDTO
        for (int i = 0; i < listaMedidas.size(); i++) {
            listaMedidasDTO.add(
                    new MedidaDTO(listaMedidas.get(i).getId_med(), listaMedidas.get(i).getNome_med())
            );

        }

        return listaMedidasDTO;
    }

    public MedidaDTO listById(Long id) {

        //Buscando categoria com o nome passado
        Optional<Medida> medidaEncontrado = medidaRepository.findById(id);

        //Validando se nome da categoria já existe
        if (medidaEncontrado.isEmpty()) {
            throw new CategoriaExistsException("A medidada de ID (" + id + ") não foi encontrada");
        }

        //Retornando categoria no formato DTO
        return new MedidaDTO(medidaEncontrado.get().getId_med(), medidaEncontrado.get().getNome_med());
    }

    public MedidaDTO save(Medida medida) {
        //Buscando medida com o nome passado
        Optional<Medida> medidaEncontrada = medidaRepository.findByName(medida.getNome_med());

        //Validando se nome da medida já existe
        if (medidaEncontrada.isPresent()) {
            throw new CategoriaExistsException("A Medida (" + medida.getNome_med() + ") já existe");
        }

        //Salvando na base de dados
        Medida medidaSalva = medidaRepository.save(medida);

        //Retornando medida no formato DTO
        return new MedidaDTO(
                medidaSalva.getId_med(),
                medidaSalva.getNome_med()
        );
    }

    public MedidaDTO update(Long id, Medida medida) {

        //Buscando medida
        Optional<Medida> medidaEncontrada = medidaRepository.findById(id);

        //Validando se medida existe
        if (medidaEncontrada.isEmpty()) {
            throw new CategoriaExistsException("A medida de ID (" + id + ") não foi encontrada");
        }

        //Alterando medida encontrada
        medidaEncontrada.get().setNome_med(medida.getNome_med());

        //Salvando medida modificada
        Medida medidaSalva = medidaRepository.save(medidaEncontrada.get());

        //Retornando no formato DTO
        return new MedidaDTO(medidaSalva.getId_med(), medidaSalva.getNome_med());
    }


}

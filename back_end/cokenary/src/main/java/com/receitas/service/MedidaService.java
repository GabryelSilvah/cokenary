package com.receitas.service;

import com.receitas.dto.MedidaDTO;
import com.receitas.model.Medida;
import com.receitas.repository.MedidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}

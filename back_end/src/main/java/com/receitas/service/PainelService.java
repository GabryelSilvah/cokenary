package com.receitas.service;

import com.receitas.dto.PainelDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PainelService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public PainelDTO listarContagem() {

        int numeroRegistros = avaliacaoRepository.countRegistro();


        return new PainelDTO(
                0, 0, 0, 0, 0, 0, 0, numeroRegistros
        );
    }

}

package com.receitas.service;

import com.receitas.dto.AvaliacaoDTO;
import com.receitas.model.Avaliacao;
import com.receitas.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;


    public List<AvaliacaoDTO> listAll() {

        //Buscando avaliações
        List<Avaliacao> listaAvaliacao = avaliacaoRepository.findAll();
        List<AvaliacaoDTO> listaAvalicacaoDTO = new ArrayList<>();

        //Convertendo lista de avaliações para categoriasDTO
        for (int i = 0; i < listaAvaliacao.size(); i++) {
            listaAvalicacaoDTO.add(
                    new AvaliacaoDTO(
                            listaAvaliacao.get(i).getId(),
                            listaAvaliacao.get(i).getDegustador_id().getNome(),
                            listaAvaliacao.get(i).getCozinheiro_id().getNome(),
                            listaAvaliacao.get(i).getNome_receita_id().getNomeReceita(),
                            listaAvaliacao.get(i).getData_avaliada(),
                            listaAvaliacao.get(i).getNota_avalicao()
                    )
            );

        }

        return listaAvalicacaoDTO;
    }
}

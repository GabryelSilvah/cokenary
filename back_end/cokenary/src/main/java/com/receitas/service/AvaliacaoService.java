package com.receitas.service;

import com.receitas.dto.AvaliacaoDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Avaliacao;
import com.receitas.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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


    public AvaliacaoDTO listById(Long id) {

        //Buscando avaliação com o nome passado
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findById(id);

        //Validando se nome da avaliação  existe
        if (avaliacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A avaliação de ID (" + id + ") não foi encontrada");
        }

        //Retornando avaliação no formato DTO
        return new AvaliacaoDTO(
                avaliacaoEncontrada.get().getId(),
                avaliacaoEncontrada.get().getDegustador_id().getNome(),
                avaliacaoEncontrada.get().getCozinheiro_id().getNome(),
                avaliacaoEncontrada.get().getNome_receita_id().getNomeReceita(),
                avaliacaoEncontrada.get().getData_avaliada(),
                avaliacaoEncontrada.get().getNota_avalicao()
        );
    }

    public AvaliacaoDTO save(Avaliacao avaliacao) {

        //Buscando avaliação com o nome passado
        Optional<Avaliacao> categoriaEncontrada = avaliacaoRepository.findByName(avaliacao.getNome_receita_id().getNomeReceita());

        //Validando se nome da avaliação já existe
        if (categoriaEncontrada.isPresent()) {
            throw new RegistroNotFoundException("A avaliação da receita (" + avaliacao.getNome_receita_id().getNomeReceita() + ") já existe");
        }

        //Salvando na base de dados
        Avaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacao);

        //Retornando avaliação no formato DTO
        return new AvaliacaoDTO(
                avaliacaoSalva.getId(),
                avaliacaoSalva.getDegustador_id().getNome(),
                avaliacaoSalva.getCozinheiro_id().getNome(),
                avaliacaoSalva.getNome_receita_id().getNomeReceita(),
                avaliacaoSalva.getData_avaliada(),
                avaliacaoSalva.getNota_avalicao()
        );
    }

    public AvaliacaoDTO update(Long id, Avaliacao avaliacao) {

        //Buscando avaliação
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findById(id);

        //Validando se avaliação existe
        if (avaliacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A avaliação de ID (" + id + ") não foi encontrada");
        }

        //Alterando avaliação encontrada
        avaliacaoEncontrada.get().setDegustador_id(avaliacao.getDegustador_id());
        avaliacaoEncontrada.get().setCozinheiro_id(avaliacao.getCozinheiro_id());
        avaliacaoEncontrada.get().setNome_receita_id(avaliacao.getNome_receita_id());
        avaliacaoEncontrada.get().setData_avaliada(avaliacao.getData_avaliada());
        avaliacaoEncontrada.get().setNota_avalicao(avaliacao.getNota_avalicao());

        //Salvando categoria modificada
        Avaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacaoEncontrada.get());

        //Retornando no formato DTO
        return new AvaliacaoDTO(
                avaliacaoSalva.getId(),
                avaliacaoSalva.getDegustador_id().getNome(),
                avaliacaoSalva.getCozinheiro_id().getNome(),
                avaliacaoSalva.getNome_receita_id().getNomeReceita(),
                avaliacaoSalva.getData_avaliada(),
                avaliacaoSalva.getNota_avalicao()
        );
    }

    public Boolean delete(Long id) {

        //Buscando avaliação
        Optional<Avaliacao> categoriaEncontrada = avaliacaoRepository.findById(id);

        //Validando se avaliação existe
        if (categoriaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A avaliação de ID (" + id + ") não foi encontrada");
        }

        avaliacaoRepository.deleteById(id);

        return true;
    }
}

package com.receitas.service;

import com.receitas.dto.AvaliacaoDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Avaliacao;
import com.receitas.model.Funcionario;
import com.receitas.model.Receita;
import com.receitas.repository.AvaliacaoRepository;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;


    public List<AvaliacaoDTO> listAll() {

        //Buscando avaliações
        List<Avaliacao> listaAvaliacao = avaliacaoRepository.findAll();
        List<AvaliacaoDTO> listaAvalicacaoDTO = new ArrayList<>();

        //Validando se foi encontrado avaliações
        if (!listaAvaliacao.isEmpty()) {

            //Convertendo lista de avaliações para categoriasDTO
            for (int i = 0; i < listaAvaliacao.size(); i++) {

                AvaliacaoDTO avaliacaoDTO = new AvaliacaoDTO(
                        listaAvaliacao.get(i).getId(),
                        listaAvaliacao.get(i).getFk_degustador().getNome(),
                        listaAvaliacao.get(i).getFk_receita().getCozinheiro_id().getNome(),
                        listaAvaliacao.get(i).getFk_receita().getNomeReceita(),
                        listaAvaliacao.get(i).getData_avaliada(),
                        listaAvaliacao.get(i).getNota_avaliacao()
                );

                //Adicionando na lista
                listaAvalicacaoDTO.add(avaliacaoDTO);

            }
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
                avaliacaoEncontrada.get().getFk_degustador().getNome(),
                avaliacaoEncontrada.get().getFk_receita().getCozinheiro_id().getNome(),
                avaliacaoEncontrada.get().getFk_receita().getNomeReceita(),
                avaliacaoEncontrada.get().getData_avaliada(),
                avaliacaoEncontrada.get().getNota_avaliacao()
        );
    }

    public AvaliacaoDTO save(Avaliacao avaliacao) {

        //Validando se já existe avaliação para essa receita feita por esse degustador
        Optional<Avaliacao> categoriaEncontrada = avaliacaoRepository.findByName(avaliacao.getFk_receita().getNomeReceita());
        if (categoriaEncontrada.isPresent()) {
            throw new RegistroNotFoundException("A avaliação da receita (" + avaliacao.getFk_receita().getNomeReceita() + ") já existe");
        }


        //Validando se funcionário degustador existe
        Optional<Funcionario> degustadorEncontrado = funcionarioRepository.findById(avaliacao.getFk_degustador().getId_func());
        if (degustadorEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O degustador de ID (" + avaliacao.getFk_degustador().getId_func() + ") não foi encontrado");
        }



        //Validando se receita existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(avaliacao.getFk_receita().getId_receita());
        if (receitaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A receita de ID (" + avaliacao.getFk_receita().getId_receita() + ") não foi encontrada");
        }


        //Validando se degustador já fez avaliação dessa receita
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findByDegustador(avaliacao.getFk_degustador().getId_func(), avaliacao.getFk_receita().getId_receita());
        if (avaliacaoEncontrada.isPresent()) {
            throw new RegistroNotFoundException("O degustador de ID (" + avaliacao.getFk_degustador().getId_func() + ") já avaliou a receita de ID(" + avaliacao.getFk_receita().getId_receita() + ")");
        }


        //Salvando na base de dados
        Avaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacao);


        //Retornando avaliação no formato DTO
        return new AvaliacaoDTO(
                avaliacaoSalva.getId(),
                degustadorEncontrado.get().getNome(),
                receitaEncontrada.get().getCozinheiro_id().getNome(),
                receitaEncontrada.get().getNomeReceita(),
                avaliacaoSalva.getData_avaliada(),
                avaliacaoSalva.getNota_avaliacao()
        );
    }

    public AvaliacaoDTO update(Long id, Avaliacao avaliacao) {

        //Buscando avaliação
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findById(id);
        if (avaliacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("Avaliação de ID (" + id + ") não foi encontrada");
        }

        //Validando se já existe avaliação para essa receita feita por esse degustador
        Optional<Avaliacao> categoriaEncontrada = avaliacaoRepository.findByName(avaliacao.getFk_receita().getNomeReceita());
        if (categoriaEncontrada.isPresent()) {
            throw new RegistroNotFoundException("A avaliação da receita (" + avaliacao.getFk_receita().getNomeReceita() + ") já existe");
        }


        //Validando se funcionário degustador existe
        Optional<Funcionario> degustadorEncontrado = funcionarioRepository.findById(avaliacao.getFk_degustador().getId_func());
        if (degustadorEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O degustador de ID (" + avaliacao.getFk_degustador().getId_func() + ") não foi encontrado");
        }


        //Validando se receita existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(avaliacao.getFk_receita().getId_receita());
        if (receitaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A receita de ID (" + avaliacao.getFk_receita().getId_receita() + ") não foi encontrada");
        }

        //Alterando avaliação encontrada
        avaliacaoEncontrada.get().setFk_degustador(avaliacao.getFk_degustador());
        avaliacaoEncontrada.get().setFk_receita(avaliacao.getFk_receita());
        avaliacaoEncontrada.get().setData_avaliada(avaliacao.getData_avaliada());
        avaliacaoEncontrada.get().setNota_avaliacao(avaliacao.getNota_avaliacao());

        //Salvando categoria modificada
        Avaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacaoEncontrada.get());


        //Retornando avaliação no formato DTO
        return new AvaliacaoDTO(
                avaliacaoSalva.getId(),
                degustadorEncontrado.get().getNome(),
                receitaEncontrada.get().getCozinheiro_id().getNome(),
                receitaEncontrada.get().getNomeReceita(),
                avaliacaoSalva.getData_avaliada(),
                avaliacaoSalva.getNota_avaliacao()
        );
    }

    public Boolean delete(Long id) {

        //Validando se avaliação existe
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findById(id);
        if (avaliacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A avaliação de ID (" + id + ") não foi encontrada");
        }

        avaliacaoRepository.deleteById(id);

        return true;
    }
}

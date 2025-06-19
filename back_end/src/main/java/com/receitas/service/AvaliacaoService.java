package com.receitas.service;

import com.receitas.dto.AvaliacaoDTO;
import com.receitas.dto.FuncionarioSaidaDTO;
import com.receitas.dto.ReceitaFullDTO;
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
import java.util.Date;
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
                        new FuncionarioSaidaDTO(listaAvaliacao.get(i).getFk_degustador().getId_func(), listaAvaliacao.get(i).getFk_degustador().getNome()),
                        new FuncionarioSaidaDTO(listaAvaliacao.get(i).getFk_receita().getCozinheiro_id().getId_func(), listaAvaliacao.get(i).getFk_receita().getCozinheiro_id().getNome()),
                        new ReceitaFullDTO(listaAvaliacao.get(i).getFk_receita().getId_receita(), listaAvaliacao.get(i).getFk_receita().getNomeReceita()),
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
                new FuncionarioSaidaDTO(avaliacaoEncontrada.get().getFk_degustador().getId_func(), avaliacaoEncontrada.get().getFk_degustador().getNome()),
                new FuncionarioSaidaDTO(avaliacaoEncontrada.get().getFk_receita().getCozinheiro_id().getId_func(), avaliacaoEncontrada.get().getFk_receita().getCozinheiro_id().getNome()),
                new ReceitaFullDTO(avaliacaoEncontrada.get().getFk_receita().getId_receita(), avaliacaoEncontrada.get().getFk_receita().getNomeReceita()),
                avaliacaoEncontrada.get().getData_avaliada(),
                avaliacaoEncontrada.get().getNota_avaliacao(),
                avaliacaoEncontrada.get().getData_alteracao()
        );
    }

    public AvaliacaoDTO save(AvaliacaoDTO avaliacaoDTO) {

        //Validando se já existe avaliação para essa receita feita por esse degustador
        Optional<Avaliacao> categoriaEncontrada = avaliacaoRepository.findByName(avaliacaoDTO.getReceita().getNomeReceita());
        if (categoriaEncontrada.isPresent()) {
            throw new RegistroNotFoundException("A avaliação da receita (" + avaliacaoDTO.getReceita().getNomeReceita() + ") já existe");
        }


        //Validando se receita existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(avaliacaoDTO.getReceita().getId_receita());
        if (receitaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A receita de ID (" + avaliacaoDTO.getReceita().getId_receita() + ") não foi encontrada");
        }


        //Validando se funcionário degustador existe
        Optional<Funcionario> degustadorEncontrado = funcionarioRepository.findById(avaliacaoDTO.getDegustador().getId_func());
        if (degustadorEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O degustador de ID (" + avaliacaoDTO.getDegustador().getId_func() + ") não foi encontrado");
        }


        //Validando se degustador já fez avaliação dessa receita
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findByDegustador(avaliacaoDTO.getDegustador().getId_func(), avaliacaoDTO.getReceita().getId_receita());
        if (avaliacaoEncontrada.isPresent()) {
            throw new RegistroNotFoundException("O degustador de ID (" + avaliacaoDTO.getDegustador().getId_func() + ") já avaliou a receita de ID(" + avaliacaoDTO.getReceita().getId_receita() + ")");
        }

        //Salvando na base de dados
        Avaliacao novaAvaliacao = new Avaliacao(new Funcionario(avaliacaoDTO.getDegustador().getId_func()), new Receita(avaliacaoDTO.getReceita().getId_receita()), new Date(), avaliacaoDTO.getNota_avaliacao());
        Avaliacao avaliacaoSalva = avaliacaoRepository.save(novaAvaliacao);


        //Retornando avaliação no formato DTO
        return new AvaliacaoDTO(
                avaliacaoSalva.getId(),
                new FuncionarioSaidaDTO(degustadorEncontrado.get().getId_func(), degustadorEncontrado.get().getNome()),
                new FuncionarioSaidaDTO(receitaEncontrada.get().getCozinheiro_id().getId_func(), receitaEncontrada.get().getCozinheiro_id().getNome()),
                new ReceitaFullDTO(receitaEncontrada.get().getId_receita(), receitaEncontrada.get().getNomeReceita()),
                avaliacaoSalva.getData_avaliada(),
                avaliacaoSalva.getNota_avaliacao()
        );
    }

    public AvaliacaoDTO update(Long id, AvaliacaoDTO avaliacaoDTO) {

        //Buscando avaliação
        Optional<Avaliacao> avaliacaoEncontrada = avaliacaoRepository.findById(id);
        if (avaliacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("Avaliação de ID (" + id + ") não foi encontrada");
        }

        //Alterando avaliação encontrada
        avaliacaoEncontrada.get().setNota_avaliacao(avaliacaoDTO.getNota_avaliacao());
        avaliacaoEncontrada.get().setData_alteracao(new Date());


        //Salvando categoria modificada
        Avaliacao avaliacaoAlterada = avaliacaoRepository.save(avaliacaoEncontrada.get());


        //Retornando avaliação no formato DTO
        return new AvaliacaoDTO(
                avaliacaoAlterada.getId(),
                new FuncionarioSaidaDTO(avaliacaoEncontrada.get().getFk_degustador().getId_func(), avaliacaoEncontrada.get().getFk_degustador().getNome()),
                new FuncionarioSaidaDTO(avaliacaoEncontrada.get().getFk_receita().getCozinheiro_id().getId_func(), avaliacaoEncontrada.get().getFk_receita().getCozinheiro_id().getNome()),
                new ReceitaFullDTO(avaliacaoEncontrada.get().getFk_receita().getId_receita(), avaliacaoEncontrada.get().getFk_receita().getNomeReceita()),
                avaliacaoAlterada.getData_avaliada(),
                avaliacaoAlterada.getNota_avaliacao(),
                avaliacaoAlterada.getData_alteracao()
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

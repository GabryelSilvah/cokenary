package com.receitas.service;

import com.receitas.dto.FuncionarioSaidaDTO;
import com.receitas.dto.MetricasDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Funcionario;
import com.receitas.model.Metricas;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.MetricasRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MetricasService {

    @Autowired
    private MetricasRepository metricasRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public List<MetricasDTO> listAll() {
        List<Metricas> metricasEncontradas = metricasRepository.findAll();
        List<MetricasDTO> listaMetricasDTO = new ArrayList<>();

        for (int i = 0; i < metricasEncontradas.size(); i++) {

            listaMetricasDTO.add(new MetricasDTO(
                    metricasEncontradas.get(i).getId_metrica(),
                    metricasEncontradas.get(i).getQuantidade_receitas(),
                    metricasEncontradas.get(i).getQuantidade_livros(),
                    metricasEncontradas.get(i).getMedia_avaliacoes(),
                    new FuncionarioSaidaDTO(metricasEncontradas.get(i).getFk_funcionario().getId_func(), metricasEncontradas.get(i).getFk_funcionario().getNome())
            ));
        }


        return listaMetricasDTO;
    }

    public MetricasDTO listById(Long id_metrica) {

        //Validando se métrica existe
        Optional<Metricas> metricasEncontrdas = metricasRepository.findById(id_metrica);
        if (metricasEncontrdas.isEmpty()) {
            throw new RegistroNotFoundException("Métrica de ID (" + id_metrica + ") não foi encontrada");
        }

        return new MetricasDTO(
                metricasEncontrdas.get().getId_metrica(),
                metricasEncontrdas.get().getQuantidade_receitas(),
                metricasEncontrdas.get().getQuantidade_livros(),
                metricasEncontrdas.get().getMedia_avaliacoes(),
                new FuncionarioSaidaDTO(metricasEncontrdas.get().getFk_funcionario().getId_func(), metricasEncontrdas.get().getFk_funcionario().getNome()));
    }

    public MetricasDTO save(MetricasDTO metricasDTO) {

        //Validando se funcionário existe
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(metricasDTO.getFk_funcionario().getId_func());
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Funcionário de ID (" + metricasDTO.getFk_funcionario().getId_func() + ") não foi encontrado");
        }

        Metricas novaMetrica = new Metricas(metricasDTO);
        Metricas metricaSalva = metricasRepository.save(novaMetrica);


        return new MetricasDTO(
                metricaSalva.getId_metrica(),
                metricaSalva.getQuantidade_receitas(),
                metricaSalva.getQuantidade_livros(),
                metricaSalva.getMedia_avaliacoes(),
                new FuncionarioSaidaDTO(metricaSalva.getFk_funcionario().getId_func(), metricaSalva.getFk_funcionario().getNome())
        );
    }

    public MetricasDTO update(Long id_metrica, MetricasDTO metricasDTO) {

        //Validando se metrica existe
        Optional<Metricas> metricaEncontrada = metricasRepository.findById(id_metrica);
        if (metricaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A métrica de ID (" + id_metrica + ") não foi encontrada");
        }

        //Validando se funcionário existe
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(metricasDTO.getFk_funcionario().getId_func());
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Funcionário de ID (" + metricasDTO.getFk_funcionario().getId_func() + ") não foi encontrado");
        }

        //Salvando alterações
        metricaEncontrada.get().setQuantidade_receitas(metricasDTO.getQuantidade_receitas());
        metricaEncontrada.get().setQuantidade_livros(metricasDTO.getQuantidade_livros());
        metricaEncontrada.get().setMedia_avaliacoes(metricasDTO.getMedia_avaliacoes());
        Metricas metricaAlterada = metricasRepository.save(metricaEncontrada.get());


        return new MetricasDTO(
                metricaAlterada.getId_metrica(),
                metricaAlterada.getQuantidade_receitas(),
                metricaAlterada.getQuantidade_livros(),
                metricaAlterada.getMedia_avaliacoes(),
                new FuncionarioSaidaDTO(metricaAlterada.getFk_funcionario().getId_func(), metricaAlterada.getFk_funcionario().getNome())
        );
    }

    public Boolean delete(Long id_metrica) {

        //Validando se metrica existe
        Optional<Metricas> metricaEncontrada = metricasRepository.findById(id_metrica);
        if (metricaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A métrica de ID (" + id_metrica + ") não foi encontrada");
        }

        metricasRepository.deleteById(id_metrica);

        return true;
    }


    public Boolean deleteByFuncionario(Long fk_funcionario) {
        metricasRepository.deleteByFkFuncionario(fk_funcionario);
        return true;
    }
}

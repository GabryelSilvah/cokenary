package com.receitas.service;

import com.receitas.dto.ReferenciaDTO;
import com.receitas.exception.FuncionarioNotFoundException;
import com.receitas.exception.ReferenciaNotFoundException;
import com.receitas.exception.RestauranteNotFoundException;
import com.receitas.model.Funcionario;
import com.receitas.model.Referencia;
import com.receitas.model.Restaurante;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.ReferenciaRepository;
import com.receitas.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReferenciaService {

    @Autowired
    private ReferenciaRepository referenciaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private RestauranteRepository restauranteRepository;

    public List<ReferenciaDTO> listAll() {
        List<Referencia> listaReferencias = referenciaRepository.findAll();
        List<ReferenciaDTO> listaReferenciasDTO = new ArrayList<>();

        for (Referencia referencia : listaReferencias) {
            listaReferenciasDTO.add(
                    new ReferenciaDTO(
                            referencia.getId(),
                            referencia.getFuncionarioId().getNome(),
                            referencia.getRestauranteId().getNome(),
                            referencia.getData_inicio(),
                            referencia.getData_fim()
                    )
            );
        }

        return listaReferenciasDTO;
    }

    public ReferenciaDTO listById(Long id) {
        Optional<Referencia> referenciaEncontrada = referenciaRepository.findById(id);

        if (referenciaEncontrada.isEmpty()) {
            throw new ReferenciaNotFoundException("A referência de ID (" + id + ") não foi encontrada");
        }

        Referencia referencia = referenciaEncontrada.get();
        return new ReferenciaDTO(
                referencia.getId(),
                referencia.getFuncionarioId().getNome(),
                referencia.getRestauranteId().getNome(),
                referencia.getData_inicio(),
                referencia.getData_fim()
        );
    }

    public ReferenciaDTO save(Referencia referencia) {
        // Verificar se o funcionário existe
        Optional<Funcionario> funcionario = funcionarioRepository.findById(
                referencia.getFuncionarioId().getId_func()
        );
        if (funcionario.isEmpty()) {
            throw new FuncionarioNotFoundException(
                    "Funcionário de ID (" + referencia.getFuncionarioId().getId_func() + ") não encontrado"
            );
        }

        // Verificar se o restaurante existe
        Optional<Restaurante> restaurante = restauranteRepository.findById(
                referencia.getRestauranteId().getIdRestaurante()
        );
        if (restaurante.isEmpty()) {
            throw new RestauranteNotFoundException(
                    "Restaurante de ID (" + referencia.getRestauranteId().getIdRestaurante() + ") não encontrado"
            );
        }

        // Definir as entidades completas
        referencia.setFuncionarioId(funcionario.get());
        referencia.setRestauranteId(restaurante.get());

        Referencia referenciaSalva = referenciaRepository.save(referencia);

        return new ReferenciaDTO(
                referenciaSalva.getId(),
                referenciaSalva.getFuncionarioId().getNome(),
                referenciaSalva.getRestauranteId().getNome(),
                referenciaSalva.getData_inicio(),
                referenciaSalva.getData_fim()
        );
    }

    public ReferenciaDTO update(Long id, Referencia referencia) {
        Optional<Referencia> referenciaEncontrada = referenciaRepository.findById(id);

        if (referenciaEncontrada.isEmpty()) {
            throw new ReferenciaNotFoundException("A referência de ID (" + id + ") não foi encontrada");
        }

        // Verificar se o funcionário existe
        Optional<Funcionario> funcionario = funcionarioRepository.findById(
                referencia.getFuncionarioId().getId_func()
        );
        if (funcionario.isEmpty()) {
            throw new FuncionarioNotFoundException(
                    "Funcionário de ID (" + referencia.getFuncionarioId().getId_func() + ") não encontrado"
            );
        }

        // Verificar se o restaurante existe
        Optional<Restaurante> restaurante = restauranteRepository.findById(
                referencia.getRestauranteId().getIdRestaurante()
        );
        if (restaurante.isEmpty()) {
            throw new RestauranteNotFoundException(
                    "Restaurante de ID (" + referencia.getRestauranteId().getIdRestaurante() + ") não encontrado"
            );
        }

        Referencia referenciaExistente = referenciaEncontrada.get();
        referenciaExistente.setFuncionarioId(funcionario.get());
        referenciaExistente.setRestauranteId(restaurante.get());
        referenciaExistente.setData_inicio(referencia.getData_inicio());
        referenciaExistente.setData_fim(referencia.getData_fim());

        Referencia referenciaSalva = referenciaRepository.save(referenciaExistente);

        return new ReferenciaDTO(
                referenciaSalva.getId(),
                referenciaSalva.getFuncionarioId().getNome(),
                referenciaSalva.getRestauranteId().getNome(),
                referenciaSalva.getData_inicio(),
                referenciaSalva.getData_fim()
        );
    }

    public Boolean delete(Long id) {
        Optional<Referencia> referenciaEncontrada = referenciaRepository.findById(id);

        if (referenciaEncontrada.isEmpty()) {
            throw new ReferenciaNotFoundException("A referência de ID (" + id + ") não foi encontrada");
        }

        referenciaRepository.deleteById(id);
        return true;
    }

    public List<ReferenciaDTO> listByFuncionario(Long funcionarioId) {
        List<Referencia> referencias = referenciaRepository.findByFuncionarioId(funcionarioId);
        List<ReferenciaDTO> referenciasDTO = new ArrayList<>();

        for (Referencia referencia : referencias) {
            referenciasDTO.add(
                    new ReferenciaDTO(
                            referencia.getId(),
                            referencia.getFuncionarioId().getNome(),
                            referencia.getRestauranteId().getNome(),
                            referencia.getData_inicio(),
                            referencia.getData_fim()
                    )
            );
        }

        return referenciasDTO;
    }

    public List<ReferenciaDTO> listByRestaurante(Long restauranteId) {
        List<Referencia> referencias = referenciaRepository.findByRestauranteId(restauranteId);
        List<ReferenciaDTO> referenciasDTO = new ArrayList<>();

        for (Referencia referencia : referencias) {
            referenciasDTO.add(
                    new ReferenciaDTO(
                            referencia.getId(),
                            referencia.getFuncionarioId().getNome(),
                            referencia.getRestauranteId().getNome(),
                            referencia.getData_inicio(),
                            referencia.getData_fim()
                    )
            );
        }

        return referenciasDTO;
    }
}
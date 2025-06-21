package com.receitas.service;

import com.receitas.dto.PainelDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PainelService {


    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;


    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public PainelDTO listarContagem() {

        int numeroRegistrosReceitas = receitaRepository.countRegistro();
        int numeroRegistrosRestaurantes = restauranteRepository.countRegistro();
        int numeroRegistrosFuncionarios = funcionarioRepository.countRegistro();
        int numeroRegistrosCargos = cargoRepository.countRegistro();
        int numeroRegistrosIngredientes = ingredienteRepository.countRegistro();
        int numeroRegistrosCategorias = categoriaRepository.countRegistro();
        int numeroRegistrosLivros = livroRepository.countRegistro();
        int numeroRegistrosAvaliacaoes = avaliacaoRepository.countRegistro();


        return new PainelDTO(
                numeroRegistrosReceitas,
                numeroRegistrosRestaurantes,
                numeroRegistrosFuncionarios,
                numeroRegistrosCargos,
                numeroRegistrosIngredientes,
                numeroRegistrosCategorias,
                numeroRegistrosLivros,
                numeroRegistrosAvaliacaoes
        );
    }

}

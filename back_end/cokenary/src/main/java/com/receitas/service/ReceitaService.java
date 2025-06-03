package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.dto.ReceitaDTO;
import com.receitas.exception.*;
import com.receitas.model.*;
import com.receitas.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private IngredienteRepository ingredienteRepository;

    @Autowired
    private Receitas_and_ingredintesRepository receitasAndIngredintesRepository;

    @Autowired
    private MedidaRepository medidaRepository;

    public List<ReceitaDTO> listAll() {

        List<Receita> receitas = receitaRepository.findAll();
        List<ReceitaDTO> receitasDTOList = new ArrayList<>(); //Inicializando lista de funcionárioDTO


        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < receitas.size(); i++) {
            List<Ingredientes_receita> receitasAndIngredientesEncontrada = receitasAndIngredintesRepository.findByIdJoin(receitas.get(i).getId_receita());

            ReceitaDTO receitaDTO = new ReceitaDTO(
                    receitas.get(i).getId_receita(),
                    receitas.get(i).getNomeReceita(),
                    receitas.get(i).getCategoria_id().getNome_categoria(),
                    receitas.get(i).getCozinheiro_id().getNome(),
                    receitas.get(i).getModo_preparo(),
                    receitas.get(i).getData_criacao(),
                    receitasAndIngredientesEncontrada
            );


            receitasDTOList.add(receitaDTO);//Adiciona na lista DTO
        }
        return receitasDTOList;
    }

    public ReceitaDTO listById(Long id) {

        //Buscando receita pelo ID
        Optional<Receita> receitaEncontrada = receitaRepository.findById(id);

        //Validando se algum receita foi encontrado
        if (receitaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("Falha, receita de ID (" + id + ") não foi encontrado");
        }

        //Buscando lista de ingredientes da receita
        List<Ingredientes_receita> receitasAndIngredientesEncontrada = receitasAndIngredintesRepository.findByIdJoin(id);


        return new ReceitaDTO(
                receitaEncontrada.get().getId_receita(),
                receitaEncontrada.get().getNomeReceita(),
                receitaEncontrada.get().getCategoria_id().getNome_categoria(),
                receitaEncontrada.get().getCozinheiro_id().getNome(),
                receitaEncontrada.get().getModo_preparo(),
                receitaEncontrada.get().getData_criacao(),
                receitasAndIngredientesEncontrada
        );
    }

    @Transactional
    public ReceitaDTO save(Receita receitaRecebida) {

        //Validando se o nome da receita já existe
        Optional<Receita> receitaNomeEncontrada = receitaRepository.findByNomeReceita(receitaRecebida.getNomeReceita());
        if (receitaNomeEncontrada.isPresent()) {
            throw new ReceitaNameExistsException("Falha, o nome da receita inserido já existe (" + receitaRecebida.getNomeReceita() + ")");
        }

        //Buscando funcinário/cozinheiro inserido
        Optional<Funcionario> funcionario = funcionarioRepository.findById(receitaRecebida.getCozinheiro_id().getId_func());

        //Validando se o funcionário/cozinheiro existe
        if (funcionario.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário de ID(" + receitaRecebida.getCozinheiro_id().getId_func() + ") não encontrado");
        }

        //Validando se funcionário inserirdo possui o cargo de cozinheiro
        if (!funcionario.get().getCargo().getNome().equals("Cozinheiro")) {
            throw new CozinheiroException("Funcionário de ID(" + receitaRecebida.getCozinheiro_id().getId_func() + ") não possui cargo de cozinheiro");
        }

        //Buscando categoria inserida
        Optional<Categoria> categoria = categoriaRepository.findById(receitaRecebida.getCategoria_id().getId_cat());

        //Validando se categoria existe
        if (categoria.isEmpty()) {
            throw new CategoriaNotFoundException("Categoria de ID(" + receitaRecebida.getCategoria_id().getId_cat() + ") não foi encontrada");
        }

        //Salvando receita
        Receita receitaSalva = receitaRepository.save(receitaRecebida);

        //Salvando ingredientes
        for (int i = 0; i < receitaRecebida.getIngredientes_id().size(); i++) {

            //Validando se medida existe
            Optional<Medida> medidaEncontrada = medidaRepository.findById(receitaRecebida.getIngredientes_id().get(i).getMedida_id().getId_med());
            if (medidaEncontrada.isEmpty()) {
                throw new RegistroNotFoundException("Medida de ID(" + receitaRecebida.getIngredientes_id().get(i).getMedida_id().getId_med() + ") não foi encontrada");
            }

            //Validando se ingredinte existe
            Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(receitaRecebida.getIngredientes_id().get(i).getIngrediente_id().getId_ingred());
            if (ingredienteEncontrado.isEmpty()) {
                throw new RegistroNotFoundException("Ingrediente de ID(" + receitaRecebida.getIngredientes_id().get(i).getIngrediente_id().getId_ingred() + ") não foi encontrado");
            }

            //Setando o número de ID da receita que vai receber a lista de ingredientes
            receitaRecebida.getIngredientes_id().get(i).setReceita_id(new Receita(receitaSalva.getId_receita()));
            receitasAndIngredintesRepository.save(receitaRecebida.getIngredientes_id().get(i));
        }

        //Declaranco lista para armazenar lista de ingredientes da receita
        List<Ingrediente> listaIngredientes = new ArrayList<>();
        List<Ingredientes_receita> receitasAndIngredientesEncontrada = receitasAndIngredintesRepository.findByIdJoin(receitaSalva.getId_receita());


        //Convertendo em DTO para enviar na request
        return new ReceitaDTO(
                receitaSalva.getId_receita(),
                receitaSalva.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaSalva.getModo_preparo(),
                receitaSalva.getData_criacao(),
                receitasAndIngredientesEncontrada
        );
    }

    @Transactional
    public ReceitaDTO update(Long id, Receita receitaRecebida) {

        //Pesquisando receita pelo ID e validando se foi encontrada
        Optional<Receita> receitaEncontrada = receitaRepository.findByIdJoin(id);
        if (receitaEncontrada.isEmpty()) {
            throw new ReceitaNotFoundException("Falha, nunhuma receita encontrada com esse ID (" + id + ")");
        }

        //Validando se o nome da receita já existe na tabela
        Optional<Receita> receitaNomeEncontrada = receitaRepository.findByNomeReceita(receitaRecebida.getNomeReceita());
        if (receitaNomeEncontrada.isPresent() && !Objects.equals(receitaNomeEncontrada.get().getNomeReceita(), receitaRecebida.getNomeReceita())) {
            throw new ReceitaNameExistsException("Falha, o nome da receita inserido já existe (" + receitaRecebida.getNomeReceita() + ")");
        }

        //Buscando categoria inserida
        Optional<Categoria> categoria = categoriaRepository.findById(receitaRecebida.getCategoria_id().getId_cat());

        //Validando se categoria existe
        if (categoria.isEmpty()) {
            throw new CategoriaNotFoundException("Categoria de ID(" + receitaRecebida.getCategoria_id().getId_cat() + ") não foi encontrada");
        }

        //Buscando funcinário/cozinheiro inserido
        Optional<Funcionario> funcionario = funcionarioRepository.findById(receitaRecebida.getCozinheiro_id().getId_func());

        //Validando se o funcionário/cozinheiro existe
        if (funcionario.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário de ID(" + receitaRecebida.getCozinheiro_id().getId_func() + ") não encontrado");
        }

        //Validando se funcionário inserirdo possui o cargo de cozinheiro
        if (!funcionario.get().getCargo().getNome().equals("Cozinheiro")) {
            throw new CozinheiroException("Funcionário de ID(" + receitaRecebida.getCozinheiro_id().getId_func() + ") não possui cargo de cozinheiro");
        }


        //Setando  na receita encontrado informações recebebidas para alteração
        Receita receitaInsert = receitaEncontrada.get();

        receitaInsert.setNomeReceita(receitaRecebida.getNomeReceita());
        receitaInsert.setData_criacao(receitaRecebida.getData_criacao());
        receitaInsert.setCategoria_id(receitaRecebida.getCategoria_id());
        receitaInsert.setCozinheiro_id(receitaRecebida.getCozinheiro_id());
        receitaInsert.setModo_preparo(receitaRecebida.getModo_preparo());

        //Salvando alteração
        Receita receitaAlterada = receitaRepository.save(receitaInsert);

        List<Ingredientes_receita> receitasAndIngredientesEncontrada = receitasAndIngredintesRepository.findByIdJoin(id);

        //Salvando ingredientes
        for (int i = 0; i < receitaRecebida.getIngredientes_id().size(); i++) {

            //Validando se medida existe
            Optional<Medida> medidaEncontrada = medidaRepository.findById(receitaRecebida.getIngredientes_id().get(i).getMedida_id().getId_med());
            if (medidaEncontrada.isEmpty()) {
                throw new RegistroNotFoundException("Medida de ID(" + receitaRecebida.getIngredientes_id().get(i).getMedida_id().getId_med() + ") não foi encontrada");
            }

            //Validando se ingredinte existe
            Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(receitaRecebida.getIngredientes_id().get(i).getIngrediente_id().getId_ingred());
            if (ingredienteEncontrado.isEmpty()) {
                throw new RegistroNotFoundException("Ingrediente de ID(" + receitaRecebida.getIngredientes_id().get(i).getIngrediente_id().getId_ingred() + ") não foi encontrado");
            }

            //Setando o número de ID da receita que vai receber a lista de ingredientes
            receitaRecebida.getIngredientes_id().get(i).setReceita_id(new Receita(receitaAlterada.getId_receita()));

           Receitas_and_ingredientes receita_and_ingred_insert = (Receitas_and_ingredientes)receitaInsert.getIngredientes_id().get(i);
            receitasAndIngredintesRepository.save(receita_and_ingred_insert);
        }



        //Convertendo em DTO para enviar na request
        return new ReceitaDTO(
                receitaAlterada.getId_receita(),
                receitaAlterada.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaAlterada.getModo_preparo(),
                receitaAlterada.getData_criacao(),
                receitasAndIngredientesEncontrada
        );
    }

    public boolean delete(Long id) {

        //Verificando se funcionário existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(id);
        if (receitaEncontrada.isEmpty()) {
            throw new ResourceNotFoundException("Falha, nenhum receita encontrado com esse ID (" + id + ")");
        }

        //Excluindo fuuncionário
        receitaRepository.delete(receitaEncontrada.get());
        return true;
    }

}

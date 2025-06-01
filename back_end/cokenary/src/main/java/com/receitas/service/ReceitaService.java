package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.ReceitaDTO;
import com.receitas.exception.*;
import com.receitas.model.Categoria;
import com.receitas.model.Funcionario;
import com.receitas.model.Ingrediente;
import com.receitas.model.Receita;
import com.receitas.repository.CategoriaRepository;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.IngredienteRepository;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

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

    public ResponseJson listAll() {

        List<Receita> receitas = receitaRepository.findAll();
        List<ReceitaDTO> receitasDTOList = new ArrayList<>(); //Inicializando lista de funcionárioDTO

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < receitas.size(); i++) {
            ReceitaDTO receitaDTO = new ReceitaDTO(
                    receitas.get(i).getId_receita(),
                    receitas.get(i).getNomeReceita(),
                    receitas.get(i).getCategoria_id().getNome_categoria(),
                    receitas.get(i).getCozinheiro_id().getNome(),
                    receitas.get(i).getModo_preparo(),
                    receitas.get(i).getData_criacao(),
                    receitas.get(i).getIngredientes_id()
            );


            receitasDTOList.add(receitaDTO);//Adiciona na lista DTO
        }
        return new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso!", receitasDTOList);
    }

    public ResponseJson save(Receita receitaRecebida) {

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

        //Declaranco lista para armazenar lista de ingredientes da receita
        List<Ingrediente> listaIngredientes = new ArrayList<>();

        //Buscando cada ingrediente pelo ID retornado
        for (int i = 0; i < receitaSalva.getIngredientes_id().size(); i++) {
            Optional<Ingrediente> ingredienteEncontrado = ingredienteRepository.findById(receitaSalva.getIngredientes_id().get(i).getId());
            if (ingredienteEncontrado.isEmpty()) {
                throw new RegistroNotFoundException("Nenhum ingrediente encontrado para o ID(" + receitaSalva.getIngredientes_id().get(i).getId() + ")");
            }

            listaIngredientes.add(ingredienteEncontrado.get());
        }

        //Convertendo em DTO para enviar na request
        ReceitaDTO receitaDTO = new ReceitaDTO(
                receitaSalva.getId_receita(),
                receitaSalva.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaSalva.getModo_preparo(),
                receitaSalva.getData_criacao(),
                listaIngredientes
        );


        return new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso!", receitaDTO);
    }

    public ResponseJson update(Long id, Receita receitaRecebida) {

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

        //Convertendo em DTO para enviar na request
        ReceitaDTO receitaDTOAlterado = new ReceitaDTO(
                receitaAlterada.getId_receita(),
                receitaAlterada.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaAlterada.getModo_preparo(),
                receitaAlterada.getData_criacao(),
                receitaAlterada.getIngredientes_id()
        );

        return new ResponseJson(HttpStatus.CREATED, "Receita atualizado com sucesso!", receitaDTOAlterado);
    }

    public ResponseJson delete(Long id) {

        //Verificando se funcionário existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(id);
        if (receitaEncontrada.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nenhum receita encontrado com esse ID (" + id + ")");
        }

        //Excluindo fuuncionário
        receitaRepository.delete(receitaEncontrada.get());
        return new ResponseJson(HttpStatus.OK, "Receita excluida com sucesso!");
    }

}

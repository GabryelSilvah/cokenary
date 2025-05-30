package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.ReceitaDTO;
import com.receitas.exception.CategoriaNotFoundException;
import com.receitas.exception.FuncionarioNotFoundException;
import com.receitas.exception.ReceitaNameExistsException;
import com.receitas.exception.ReceitaNotFoundException;
import com.receitas.model.Categoria;
import com.receitas.model.Funcionario;
import com.receitas.model.Receita;
import com.receitas.repository.CategoriaRepository;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

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
                    receitas.get(i).getModo_preparo()
            );


            receitasDTOList.add(receitaDTO);//Adiciona na lista DTO
        }
        return new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso!", receitasDTOList);
    }

    public ResponseJson save(Receita receitaRecebida) {

        Receita receitaSalva = receitaRepository.save(receitaRecebida);

        Optional<Categoria> categoria = categoriaRepository.findById(receitaRecebida.getCategoria_id().getId_cat());

        Optional<Funcionario> funcionario = funcionarioRepository.findById(receitaRecebida.getCozinheiro_id().getId_func());


        //Convertendo em DTO para enviar na request
        ReceitaDTO receitaDTO = new ReceitaDTO(
                receitaSalva.getId_receita(),
                receitaSalva.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaSalva.getModo_preparo()
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
        Receita receitaNomeExiste = receitaRepository.findByNomeReceita(receitaRecebida.getNomeReceita());
        if (!receitaNomeExiste.getId_receita().equals(id)) {
            throw new ReceitaNameExistsException("Falha, o nome da receita inserido já existe (" + receitaRecebida.getNomeReceita() + ")");
        }


        //Pesquisando categoria pelo ID e validando se foi encontrada
        Optional<Categoria> categoria = categoriaRepository.findById(receitaRecebida.getCategoria_id().getId_cat());
        if (categoria.isEmpty()) {
            throw new CategoriaNotFoundException("Falha, nenhuma categoria encontrada com o ID informado");
        }


        //Pesquisando cozinheiro/funcionario pelo ID e validando se foi encontrado
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(receitaRecebida.getCozinheiro_id().getId_func());
        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Falha, não foi encontrado nenhum funcionário(cozinheiro) com ID (" + receitaRecebida.getCozinheiro_id().getId_func() + ") informado");
        }


        Receita receitaInsert = receitaEncontrada.get();
        //Setando  na receita encontrado informações recebebidas para alteração
        receitaInsert.setNomeReceita(receitaRecebida.getNomeReceita());
        receitaInsert.setData_criacao(receitaRecebida.getData_criacao());
        receitaInsert.setCategoria_id(receitaRecebida.getCategoria_id());
        receitaInsert.setCozinheiro_id(receitaRecebida.getCozinheiro_id());
        receitaInsert.setModo_preparo(receitaRecebida.getModo_preparo());

        //Salvando alteração
        Receita receitaALterada = receitaRepository.save(receitaInsert);

        //Convertendo em DTO para enviar na request
        ReceitaDTO receitaDTOAlterado = new ReceitaDTO(
                receitaALterada.getId_receita(),
                receitaALterada.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionarioEncontrado.get().getNome(),
                receitaALterada.getModo_preparo()
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

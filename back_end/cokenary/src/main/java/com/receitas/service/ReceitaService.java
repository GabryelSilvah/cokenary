package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.dto.ReceitaDTO;
import com.receitas.model.Cargo;
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
                    receitas.get(i).getNome_receita(),
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

        ReceitaDTO receitaDTO = new ReceitaDTO(
                receitaSalva.getId_receita(),
                receitaSalva.getNome_receita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaSalva.getModo_preparo()
        );


        return new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso!", receitaDTO);
    }

    public ResponseJson update(Long id, Receita receitaRecebida) {
        Optional<Receita> receitaEncontrada = receitaRepository.findById(id);

        //Validando se foi encontrado algum funcionário com o ID informado
        if (receitaEncontrada.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nunhum funcinário encontrado com esse ID (" + id + ")");
        }

        //Pegando categoria pelo ID e validando se existe categoria com esse ID
        Optional<Categoria> categoria = categoriaRepository.findById(receitaRecebida.getCategoria_id().getId_cat());
        if (categoria.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nenhum cargo encontrado com o ID informado");
        }


        //Validando se funcionario informado existe
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(receitaRecebida.getId_receita());
        if (funcionarioEncontrado.isEmpty()) {
            return new ResponseJson(
                    HttpStatus.NOT_FOUND,
                    "Falha, não foi encontrado nenhum cargo com ID (" + receitaRecebida.getCozinheiro_id().getId_func() + ") informado"
            );
        }


        //Setando informações no funcionário encontrado
        Receita receitaInsert = receitaEncontrada.get();
        receitaInsert.setNome_receita(receitaRecebida.getNome_receita());
        receitaInsert.setData_criacao(receitaRecebida.getData_criacao());
        receitaInsert.setCategoria_id(receitaRecebida.getCategoria_id());
        receitaInsert.setCozinheiro_id(receitaRecebida.getCozinheiro_id());
        receitaInsert.setModo_preparo(receitaRecebida.getModo_preparo());

        Receita receitaALterada = receitaRepository.save(receitaInsert);

        ReceitaDTO receitaDTOAlterado = new ReceitaDTO(
                receitaALterada.getId_receita(),
                receitaALterada.getNome_receita(),
                receitaALterada.getCategoria_id().getNome_categoria(),
                receitaALterada.getCozinheiro_id().getNome(),
                receitaALterada.getModo_preparo()
        );

        return new ResponseJson(HttpStatus.CREATED, "Funcionário atualizado com sucesso!", receitaDTOAlterado);
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

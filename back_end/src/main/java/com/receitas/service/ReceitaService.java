package com.receitas.service;

import com.receitas.dto.Composicao_ReceitaDTO;
import com.receitas.dto.ReceitaFullDTO;
import com.receitas.dto.Receita_all_infor;
import com.receitas.dto.ReceitaDTO;
import com.receitas.exception.*;
import com.receitas.model.*;
import com.receitas.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    private Composicao_ReceitaRepository composicaoReceitaRepository;

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

        //Validando se o funcionário/cozinheiro existe
        Optional<Funcionario> funcionario = funcionarioRepository.findById(receitaRecebida.getCozinheiro_id().getId_func());
        if (funcionario.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário de ID(" + receitaRecebida.getCozinheiro_id().getId_func() + ") não encontrado");
        }

        //Validando se funcionário inserirdo possui o cargo de cozinheiro
        if (!funcionario.get().getCargo().getNome().equals("cozinheiro")) {
            throw new CozinheiroException("Funcionário de ID(" + receitaRecebida.getCozinheiro_id().getId_func() + ") não possui cargo de cozinheiro");
        }

        //Validando se categoria existe
        Optional<Categoria> categoria = categoriaRepository.findById(receitaRecebida.getCategoria_id().getId_cat());
        if (categoria.isEmpty()) {
            throw new CategoriaNotFoundException("Categoria de ID(" + receitaRecebida.getCategoria_id().getId_cat() + ") não foi encontrada");
        }

        //Salvando receita
        receitaRecebida.setData_criacao(new Date());
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
    public ReceitaDTO update(Long id, ReceitaFullDTO receitaRecebida) {

        //Pesquisando receita pelo ID e validando se foi encontrada
        Optional<Receita> receitaEncontrada = receitaRepository.findByIdJoin(id);
        if (receitaEncontrada.isEmpty()) {
            throw new ReceitaNotFoundException("Falha, nunhuma receita encontrada com esse ID (" + id + ")");
        }


        //Validando se o nome da receita já existe na tabela
        Optional<Receita> receitaNomeEncontrada = receitaRepository.findByNomeReceita(receitaRecebida.getNomeReceita());
        if (receitaNomeEncontrada.isPresent() && !(receitaNomeEncontrada.get().getId_receita().equals(id))) {
            throw new ReceitaNameExistsException("Falha, o nome da receita (" + receitaRecebida.getNomeReceita() + ") inserida já existe ");
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

        String nome_cozinheiro = funcionario.get().getCargo().getNome().toLowerCase();
        //Validando se funcionário inserirdo possui o cargo de cozinheiro
        if (!nome_cozinheiro.equals("cozinheiro")) {
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

        //Salvando novos ingredientes adicionados
        for (int i = 0; i < receitaRecebida.getIngredientes_id().size(); i++) {

            //Validando se já existe vinculo da receita com o ingredinte, senão, será cadastrado
            Optional<Receitas_and_ingredientes> composicaoEncontrada = receitasAndIngredintesRepository.findByReceitaAndIngrediente(
                    receitaAlterada.getId_receita(), receitaRecebida.getIngredientes_id().get(i).getIngrediente_id().getId_ingred()
            );


            if (composicaoEncontrada.isEmpty()) {

                //Criando novo objeto de publicação de livro
                Receitas_and_ingredientes novaComposicaoIngredientes = new Receitas_and_ingredientes(
                        new Medida(receitaRecebida.getIngredientes_id().get(i).getMedida_id().getId_med()),
                        new Ingrediente(receitaRecebida.getIngredientes_id().get(i).getIngrediente_id().getId_ingred()),
                        new Receita(receitaAlterada.getId_receita()),
                        receitaRecebida.getIngredientes_id().get(i).getPorcoes()
                );


                System.out.println("Ingredientes: " + novaComposicaoIngredientes.getIngrediente_id().getId_ingred());
                System.out.println("Receitas: " + novaComposicaoIngredientes.getReceita_id().getId_receita());
                System.out.println("Medidas: " + novaComposicaoIngredientes.getMedida_id().getId_med());
                System.out.println("Porção: " + novaComposicaoIngredientes.getPorcoes());


                //Salvando novo vinculo de receita com livro
                receitasAndIngredintesRepository.save(novaComposicaoIngredientes);
            }
        }

        //Excluindo receitas do livro
        for (int i = 0; i < receitaRecebida.getIngredientes_removidos().size(); i++) {
            receitasAndIngredintesRepository.deleteByReceita(receitaAlterada.getId_receita(), receitaRecebida.getIngredientes_removidos().get(i));
        }

        List<Ingredientes_receita> receitaAndIngrredientesEncontrados = receitasAndIngredintesRepository.findByIdJoin(id);

        System.out.println("Nova composição: " + receitaAndIngrredientesEncontrados.get(0).getId_composicao());
        //Convertendo em DTO para enviar na request
        return new ReceitaDTO(
                receitaAlterada.getId_receita(),
                receitaAlterada.getNomeReceita(),
                categoria.get().getNome_categoria(),
                funcionario.get().getNome(),
                receitaAlterada.getModo_preparo(),
                receitaAlterada.getData_criacao(),
                receitaAndIngrredientesEncontrados
        );
    }

    @Transactional
    public boolean delete(Long id) {

        //Validando se ID da receita existe na lista de composições da receita
        List<Receitas_and_ingredientes> listaComposicao = receitasAndIngredintesRepository.findByReita(id);
        if (listaComposicao.isEmpty()) {
            throw new RegistroNotFoundException("Nenhuma composição da receita com fk_receita (" + id + ") foi encontrado");
        }

        for (int i = 0; i < listaComposicao.size(); i++) {
            receitasAndIngredintesRepository.deleteById(listaComposicao.get(i).getId_composicao());
        }

        //Verificando se receita existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(id);
        if (receitaEncontrada.isEmpty()) {
            throw new ResourceNotFoundException("Falha, nenhum receita encontrado com esse ID (" + id + ")");
        }

        //Excluindo fuuncionário
        receitaRepository.delete(receitaEncontrada.get());
        return true;
    }

    public Receita_all_infor listByIdAllInfor(Long id) {

        //Buscando receita pelo ID
        Optional<Receita_all_infor> receitaEncontrada = receitaRepository.findByIdJoinDetails(id);


        //Validando se algum receita foi encontrado
        if (receitaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("Falha, receita de ID (" + id + ") não foi encontrado");
        }

        //Buscando lista de ingredientes da receita
        List<Composicao_ReceitaDTO> ingredientesEncontrados = composicaoReceitaRepository.findJoinAllDetails(id);


        return new Receita_all_infor(
                receitaEncontrada.get().getId_receita(),
                receitaEncontrada.get().getId_func(),
                receitaEncontrada.get().getId_cat(),
                receitaEncontrada.get().getNome_receita(),
                receitaEncontrada.get().getData_criacao(),
                receitaEncontrada.get().getCozinheiro_id(),
                receitaEncontrada.get().getCategoria_id(),
                receitaEncontrada.get().getModo_preparo(),
                ingredientesEncontrados
        );
    }

}

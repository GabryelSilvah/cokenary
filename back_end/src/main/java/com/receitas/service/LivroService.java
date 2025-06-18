package com.receitas.service;

import com.receitas.dto.*;
import com.receitas.exception.FuncionarioNotFoundException;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.*;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.LivroRepository;
import com.receitas.repository.Publicacao_livroRepository;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LivroService {
    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private Publicacao_livroRepository publicacaoLivroRepository;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;


    @Autowired
    private ReceitaService receitaService;

    @Autowired
    private Publicacao_livroService publicacaoLivroService;


    public List<LivroDTO> listAll() {

        //Buscando lista de livros
        List<Livro> livrosEncontrados = livroRepository.findAll();

        //Inicializando lista de funcionárioDTO
        List<LivroDTO> listaLivrosDTO = new ArrayList<>();

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < livrosEncontrados.size(); i++) {
            LivroDTO lisvrosDTO = new LivroDTO(
                    livrosEncontrados.get(i).getId_livro(),
                    livrosEncontrados.get(i).getTituloLivro(),
                    livrosEncontrados.get(i).getIsbn(),
                    livrosEncontrados.get(i).getFk_editor()
            );

            //Adiciona na lista DTO
            listaLivrosDTO.add(lisvrosDTO);
        }

        return listaLivrosDTO;
    }

    public LivroDTO listById(Long id) {

        //Buscando livro pelo ID
        Optional<Livro> livroEncontrada = livroRepository.findById(id);

        //Validando se o livro foi encontrado
        if (livroEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("O livro de ID (" + id + ") não foi encontrado");
        }

        List<Publicacao_livroDTO> publicacaoLivroEncontradas = publicacaoLivroRepository.findJoinAllDetails(livroEncontrada.get().getId_livro());
        List<Receita_all_infor> listaReceitasLivro = new ArrayList<>();


        for (int i = 0; i < publicacaoLivroEncontradas.size(); i++) {
            Receita_all_infor receitaEncontrada = receitaService.listByIdAllInfor(publicacaoLivroEncontradas.get(i).getFk_receita());
            listaReceitasLivro.add(receitaEncontrada);
        }
        //Retornando cargo no formato DTO
        return new LivroDTO(
                livroEncontrada.get().getId_livro(),
                livroEncontrada.get().getTituloLivro(),
                livroEncontrada.get().getIsbn(),
                livroEncontrada.get().getFk_editor(),
                listaReceitasLivro
        );

    }

    public LivroDTO save(Livro livro) {

        //Buscando livro informado
        Optional<Livro> livroEncontrado = livroRepository.findByTituloLivro(livro.getTituloLivro());

        //Buscando funcinário/editor inserido
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(livro.getFk_editor().getId_func());

        //Validando se o funcionário/editor existe
        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário/editor de ID(" + livro.getFk_editor().getId_func() + ") não encontrado");
        }


        //Validando se nome da livro já existe
        if (livroEncontrado.isPresent()) {
            throw new RegistroExistsException("O livro (" + livro.getTituloLivro() + ") já existe");
        }

        //Salvando na base de dados
        Livro livroSalvo = livroRepository.save(livro);

        //Retornando cargo no formato DTO
        return new LivroDTO(
                livroSalvo.getId_livro(),
                livroSalvo.getTituloLivro(),
                livroSalvo.getIsbn(),
                funcionarioEncontrado.get()
        );
    }

    @Transactional
    public LivroDTO saveCompleto(LivroCompletoDTO livroDTO) {

        Livro livro = new Livro(livroDTO);
        //Buscando livro informado
        Optional<Livro> livroEncontrado = livroRepository.findByTituloLivro(livro.getTituloLivro());

        //Buscando funcinário/editor inserido
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(livro.getFk_editor().getId_func());

        //Validando se o funcionário/editor existe
        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário/editor de ID(" + livro.getFk_editor().getId_func() + ") não encontrado");
        }


        //Validando se nome da livro já existe
        if (livroEncontrado.isPresent()) {
            throw new RegistroExistsException("O livro (" + livro.getTituloLivro() + ") já existe");
        }

        //Salvando na base de dados
        Livro livroSalvo = livroRepository.save(livro);

        //Salvando receitas vinculadas a esse livro
        for (int i = 0; i < livroDTO.getComposicao_receitas().size(); i++) {
            livroDTO.getComposicao_receitas().get(i).setFk_livro(new Livro(livroSalvo.getId_livro()));
            publicacaoLivroService.save(livroDTO.getComposicao_receitas().get(i));
        }


        //Retornando cargo no formato DTO
        return listById(livroSalvo.getId_livro());
    }


    public LivroDTO update(Long id, Livro livro) {

        //Buscando livro
        Optional<Livro> livroEncontrado = livroRepository.findById(id);

        //Buscando funcinário/editor inserido
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(livro.getFk_editor().getId_func());

        //Validando se o funcionário/editor existe
        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário/editor de ID(" + livro.getFk_editor().getId_func() + ") não encontrado");
        }

        //Validando se livro existe
        if (livroEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O cargo de ID (" + id + ") não foi encontrado");
        }

        //Alterando livro encontrada
        livroEncontrado.get().setTituloLivro(livro.getTituloLivro());
        livroEncontrado.get().setIsbn(livro.getIsbn());
        livroEncontrado.get().setFk_editor(livro.getFk_editor());

        //Salvando cargo modificado
        Livro livroSalvo = livroRepository.save(livroEncontrado.get());


        //Retornando cargo no formato DTO
        return new LivroDTO(
                livroEncontrado.get().getId_livro(),
                livroEncontrado.get().getTituloLivro(),
                livroEncontrado.get().getIsbn(),
                funcionarioEncontrado.get()
        );
    }

    public LivroDTO updateCompleto(Long id, LivroFullDTO livroDTO) {

        //Validando se livro existe
        Optional<Livro> livroEncontrado = livroRepository.findById(id);
        if (livroEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O livro de ID (" + id + ") não foi encontrado");
        }


        //Buscando funcinário/editor inserido
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(livroDTO.getEditor().getId_func());

        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário/editor de ID(" + livroDTO.getEditor().getId_func() + ") não encontrado");
        }


        //Alterando livro encontrada
        livroEncontrado.get().setTituloLivro(livroDTO.getTitulo_livro());
        livroEncontrado.get().setIsbn(livroDTO.getIsbn());
        livroEncontrado.get().setFk_editor(livroDTO.getEditor());

        //Salvando livro modificado
        Livro livroEditado = livroRepository.save(livroEncontrado.get());


        //Salvando novas receitas adicionadas
        for (int i = 0; i < livroDTO.getComposicao_receitas().size(); i++) {

            //Validando se já existe vinculo da receita com o livro, senão, será cadastrado
            Optional<Publicacao_livro> publicacaoEncontrada = publicacaoLivroRepository.findByFkReceitaAndLivro(
                    livroDTO.getComposicao_receitas().get(i).getId_receita(), id
            );

            if (publicacaoEncontrada.isEmpty()) {

                //Criando novo objeto de publicação de livro
                Publicacao_livro novaPubblicacao = new Publicacao_livro(
                        new Livro(id),
                        new Receita(livroDTO.getComposicao_receitas().get(i).getId_receita())
                );


                //Salvando novo vinculo de receita com livro
                publicacaoLivroService.save(novaPubblicacao);
            }
        }

        //Excluindo receitas do livro
        for (int i = 0; i < livroDTO.getReceitas_deletar().size(); i++) {
            publicacaoLivroService.deleteByReceita(livroDTO.getReceitas_deletar().get(i), livroEditado.getId_livro());
        }

        //Retornando cargo no formato DTO
        return listById(livroEditado.getId_livro());
    }

    public Boolean delete(Long id) {

        //Buscando livro
        Optional<Livro> livroEncontrado = livroRepository.findById(id);

        //Validando se o livro existe
        if (livroEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O livro de ID (" + id + ") não foi encontrado");
        }

        livroRepository.deleteById(id);

        return true;
    }

}
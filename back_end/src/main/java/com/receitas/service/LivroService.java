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
                    new FuncionarioSaidaDTO(livrosEncontrados.get(i).getFk_editor().getId_func(), livrosEncontrados.get(i).getFk_editor().getNome())
            );

            //Adiciona na lista DTO
            listaLivrosDTO.add(lisvrosDTO);
        }

        return listaLivrosDTO;
    }

    public LivroDTO listById(Long id) {

        //Validando se ID foi passado
        if(id == null){
            throw new RegistroNotFoundException("O ID do livro esperado é null");
        }

        //Validando se o livro foi encontrado
        Optional<Livro> livroEncontrado = livroRepository.findById(id);
        if (livroEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O livro de ID (" + id + ") não foi encontrado");
        }

        //Buscando lista de publicações/receitas cadastradas nesse livro
        List<Publicacao_livroDTO> publicacaoLivroEncontradas = publicacaoLivroRepository.findJoinAllDetails(id);
        List<Receita_all_infor> listaReceitasLivro = new ArrayList<>();


        //Buscando receitas
        for (int i = 0; i < publicacaoLivroEncontradas.size(); i++) {
            Receita_all_infor receitaEncontrada = receitaService.listByIdAllInfor(publicacaoLivroEncontradas.get(i).getFk_receita());
            listaReceitasLivro.add(receitaEncontrada);
        }

        System.out.println("Testando nome cargo: " + livroEncontrado.get().getFk_editor().getNome());

        //Retornando cargo no formato DTO
        return new LivroDTO(
                livroEncontrado.get().getId_livro(),
                livroEncontrado.get().getTituloLivro(),
                livroEncontrado.get().getIsbn(),
                new FuncionarioSaidaDTO(livroEncontrado.get().getFk_editor().getId_func(), livroEncontrado.get().getFk_editor().getNome()),
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
                new FuncionarioSaidaDTO(funcionarioEncontrado.get().getId_func(), funcionarioEncontrado.get().getNome())
        );
    }

    @Transactional
    public LivroDTO saveCompleto(LivroDTO livroDTO) {


        //Validando se nome da livro já existe
        Optional<Livro> livroEncontrado = livroRepository.findByTituloLivro(livroDTO.getTitulo_livro());
        if (livroEncontrado.isPresent()) {
            throw new RegistroExistsException("O livro com titulo (" + livroDTO.getTitulo_livro() + ") já existe");
        }

        //Validando se o funcionário/editor existe
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(livroDTO.getEditor().getId_func());
        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário/editor de ID(" + livroDTO.getEditor().getId_func() + ") não foi encontrado");
        }


        //Salvando na base de dados
        Livro livro = new Livro(livroDTO);
        Livro livroSalvo = livroRepository.save(livro);


        //Salvando receitas no livro
        for (int i = 0; i < livroDTO.getPublicacao_receitas_livro().size(); i++) {
            //Validando se receita existe
            Optional<Receita> receitaEncontrada = receitaRepository.findById(livroDTO.getPublicacao_receitas_livro().get(i).getId_receita());
            if (receitaEncontrada.isEmpty()) {
                throw new RegistroNotFoundException("Receita de ID (" + livroDTO.getPublicacao_receitas_livro().get(i).getId_receita() + ") não foi encontrada");
            }

            Publicacao_livro novaPublicacao = new Publicacao_livro();
            novaPublicacao.setFk_livro(new Livro(livroSalvo.getId_livro()));
            novaPublicacao.setFk_receita(new Receita(receitaEncontrada.get().getId_receita()));

            publicacaoLivroService.save(novaPublicacao);

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
                new FuncionarioSaidaDTO(funcionarioEncontrado.get().getId_func(), funcionarioEncontrado.get().getNome())
        );
    }

    @Transactional
    public LivroDTO updateCompleto(Long id, LivroDTO livroDTO) {

        //Validando se livro existe
        Optional<Livro> livroEncontrado = livroRepository.findById(id);
        if (livroEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O livro de ID (" + id + ") não foi encontrado");
        }

        System.out.println("Teste de ID update: " + livroDTO.getEditor().getId_func());

        //Buscando funcinário/editor inserido
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(livroDTO.getEditor().getId_func());
        if (funcionarioEncontrado.isEmpty()) {
            throw new FuncionarioNotFoundException("Funcionário/editor de ID(" + livroDTO.getEditor().getId_func() + ") não encontrado");
        }


        //Alterando livro encontrada
        livroEncontrado.get().setTituloLivro(livroDTO.getTitulo_livro());
        livroEncontrado.get().setIsbn(livroDTO.getIsbn());
        livroEncontrado.get().getFk_editor().setId_func(livroDTO.getEditor().getId_func());

        //Salvando livro modificado
        Livro livroEditado = livroRepository.save(livroEncontrado.get());


        //Salvando novas receitas adicionadas
        for (int i = 0; i < livroDTO.getPublicacao_receitas_livro().size(); i++) {

            //Validando se já existe vinculo da receita com o livro, senão, será cadastrado
            Optional<Publicacao_livro> publicacaoEncontrada = publicacaoLivroRepository.findByFkReceitaAndLivro(
                    livroDTO.getPublicacao_receitas_livro().get(i).getId_receita(),
                    id
            );

            if (publicacaoEncontrada.isEmpty()) {

                //Criando novo objeto de publicação de livro
                Publicacao_livro novaPubblicacao = new Publicacao_livro(
                        new Livro(id),
                        new Receita(livroDTO.getPublicacao_receitas_livro().get(i).getId_receita())
                );


                //Salvando novo vinculo de receita com livro
                publicacaoLivroService.save(novaPubblicacao);
            }
        }

        //Excluindo receitas do livro
        for (int i = 0; i < livroDTO.getReceitas_remover().size(); i++) {
            publicacaoLivroService.deleteByReceita(livroDTO.getReceitas_remover().get(i), livroEditado.getId_livro());
        }

        //Retornando cargo no formato DTO
        return listById(livroEditado.getId_livro());
    }

    @Transactional
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
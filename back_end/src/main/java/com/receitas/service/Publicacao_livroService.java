package com.receitas.service;

import com.receitas.dto.LivroDTO;
import com.receitas.dto.Publicacao_livroDTO;
import com.receitas.exception.FuncionarioNotFoundException;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Funcionario;
import com.receitas.model.Livro;
import com.receitas.model.Publicacao_livro;
import com.receitas.model.Receita;
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
public class Publicacao_livroService {

    @Autowired
    private Publicacao_livroRepository publicacaoLivroRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ReceitaRepository receitaRepository;

    public List<Publicacao_livroDTO> listAll() {

        //Buscando lista de publicacoes
        List<Publicacao_livro> publicacaesLivrosEncontradas = publicacaoLivroRepository.findAll();

        //Inicializando lista de funcionárioDTO
        List<Publicacao_livroDTO> listaPublicacoesDTO = new ArrayList<>();

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < publicacaesLivrosEncontradas.size(); i++) {
            Publicacao_livroDTO lisvrosDTO = new Publicacao_livroDTO(
                    publicacaesLivrosEncontradas.get(i).getId_publicacao(),
                    publicacaesLivrosEncontradas.get(i).getFk_livro().getId_livro(),
                    publicacaesLivrosEncontradas.get(i).getFk_receita().getId_receita()
            );

            //Adiciona na lista DTO
            listaPublicacoesDTO.add(lisvrosDTO);
        }

        return listaPublicacoesDTO;

    }


    public Publicacao_livroDTO listById(Long id) {

        //Buscando publicação pelo ID
        Optional<Publicacao_livro> publicacaoEncontrada = publicacaoLivroRepository.findById(id);

        //Validando se publicação foi encontrada
        if (publicacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A publicação de livro de ID (" + id + ") não foi encontrada");
        }

        //Retornando publicação no formato DTO
        return new Publicacao_livroDTO(
                publicacaoEncontrada.get().getId_publicacao(),
                publicacaoEncontrada.get().getFk_livro().getId_livro(),
                publicacaoEncontrada.get().getFk_receita().getId_receita()
        );

    }

    public Publicacao_livroDTO save(Publicacao_livro publicacaoLivro) {

        //Validando de livro existe
        Optional<Livro> livroEncontrado = livroRepository.findById(publicacaoLivro.getFk_livro().getId_livro());
        if (livroEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("O livro de ID (" + publicacaoLivro.getFk_livro().getId_livro() + ") não foi encontrado");
        }


        //Validando se receita existe
        Optional<Receita> receitaEncontrada = receitaRepository.findById(publicacaoLivro.getFk_receita().getId_receita());
        if (receitaEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A receita de ID (" + publicacaoLivro.getFk_receita().getId_receita() + ") não foi encontrada");
        }


        //Validando se já existe publicação da receita informada no livro declarado
        Optional<Publicacao_livro> publicacaoEncontrada = publicacaoLivroRepository.findByFkReceitaAndLivro(publicacaoLivro.getFk_receita().getId_receita(), publicacaoLivro.getFk_livro().getId_livro());
        if (publicacaoEncontrada.isPresent()) {
            throw new RegistroExistsException("Publicação de ID receita (" + publicacaoLivro.getFk_receita().getId_receita() + ") e ID livro (" + publicacaoLivro.getFk_livro().getId_livro() + ") já existe");
        }


        //Salvando na base de dados
        Publicacao_livro publicacaoSalva = publicacaoLivroRepository.save(publicacaoLivro);

        //Retornando cargo no formato DTO
        return new Publicacao_livroDTO(
                publicacaoSalva.getId_publicacao(),
                publicacaoSalva.getFk_livro().getId_livro(),
                publicacaoSalva.getFk_receita().getId_receita()
        );
    }

    public Publicacao_livroDTO update(Long id, Publicacao_livro publicacaoLivro) {

        //Buscando livro
        Optional<Publicacao_livro> publicacaoEncontrado = publicacaoLivroRepository.findById(id);


        //Validando se livro existe
        if (publicacaoEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("A publicação de livro de ID (" + id + ") não foi encontrada");
        }

        //Alterando livro encontrada
        publicacaoEncontrado.get().setFk_livro(publicacaoLivro.getFk_livro());
        publicacaoEncontrado.get().setFk_receita(publicacaoLivro.getFk_receita());

        //Salvando cargo modificado
        Publicacao_livro publicacaoSalva = publicacaoLivroRepository.save(publicacaoEncontrado.get());


        //Retornando cargo no formato DTO
        return new Publicacao_livroDTO(
                publicacaoSalva.getId_publicacao(),
                publicacaoSalva.getFk_livro().getId_livro(),
                publicacaoSalva.getFk_receita().getId_receita()
        );
    }

    public Boolean delete(Long id) {

        //Buscando publicação
        Optional<Publicacao_livro> publicacaoEncontrada = publicacaoLivroRepository.findById(id);

        //Validando se a publicação existe
        if (publicacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A publicação de libvro de ID (" + id + ") não foi encontrada");
        }

        publicacaoLivroRepository.deleteById(id);

        return true;
    }

    @Transactional
    public Boolean deleteByReceita(Long id_receita, Long id_livro) {

        //Validando se receita existe
        Optional<Publicacao_livro> publicacaoEncontrada = publicacaoLivroRepository.findByFkReceitaAndLivro(id_receita, id_livro);
        if (publicacaoEncontrada.isEmpty()) {
            throw new RegistroNotFoundException("A publicação com fk_receita (" + id_receita + ") e fk_livro (" + id_livro + ") não foi encontrada");
        }

        publicacaoLivroRepository.deleteByReceita(id_receita, id_livro);

        return true;
    }
}

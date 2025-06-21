package com.receitas.service;

import com.receitas.dto.PerfilDTO;
import com.receitas.dto.UsuarioFullDTO;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;
import com.receitas.model.Metricas;
import com.receitas.model.Usuario;
import com.receitas.repository.AvaliacaoRepository;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.repository.MetricasRepository;
import com.receitas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
public class PerfilService {


    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private MetricasRepository metricasRepository;


    public PerfilDTO listPerfilById(Long id_funcionario) {


        //Validando se funcinário existe
        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(id_funcionario);
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Funcionário de ID (" + id_funcionario + ") informado não foi encontrado");
        }

        //Validando se existe um usuário com fk_funcionario igual ao id_funcionario passado
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByFuncionario(id_funcionario);
        if (usuarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Não foi encontrado nenhum usuário com fk_funcionário (" + id_funcionario + ")");
        }

        //Validando se existem metricas desse perfil/funcionário
        Optional<Metricas> metricasEncontradas = metricasRepository.findByFk_funcionario(id_funcionario);
        if (metricasEncontradas.isEmpty()) {
            throw new RegistroNotFoundException("A métrica do funcionário de ID (" + id_funcionario + ") não foi encontrada");
        }

        return new PerfilDTO(
                usuarioEncontrado.get().getId(),
                new UsuarioFullDTO(usuarioEncontrado.get().getId(), usuarioEncontrado.get().getEmail()),
                usuarioEncontrado.get().getFk_funcionario().getCargo().getNome(),
                new Date(),
                funcionarioEncontrado.get().getImagem_perfil(),
                metricasEncontradas.get().getQuantidade_receitas(),
                metricasEncontradas.get().getQuantidade_livros(),
                metricasEncontradas.get().getMedia_avaliacoes()
        );
    }

    @Transactional
    public PerfilDTO updateName(Long id_funcionario, PerfilDTO perfilDTO) {

        //Validando se funcinário existe
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByFuncionario(id_funcionario);
        if (usuarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Usuário com fk_funcionário (" + id_funcionario + ") informado não foi encontrado");
        }

        //Validando se nome de usuário foi passado
        if (perfilDTO.getUsuario() == null) {
            throw new RegistroNotFoundException("Nome de usuário para alteração não foi informado");
        }


        //Validando se nome de usuário já existe
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(perfilDTO.getUsuario().getNome_usuario());
        if (usuarioExistente.isPresent() && !(usuarioExistente.get().getFk_funcionario().getId_func().equals(id_funcionario))) {
            throw new RegistroExistsException("O nome de usuário (" + perfilDTO.getUsuario().getNome_usuario() + ") já existe");
        }

        usuarioEncontrado.get().setEmail(perfilDTO.getUsuario().getNome_usuario());
        Usuario usuarioAlterado = usuarioRepository.save(usuarioEncontrado.get());


        Optional<Funcionario> funcionarioEncontrado = funcionarioRepository.findById(id_funcionario);
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Funcionário de ID (" + id_funcionario + ") informado não foi encontrado");
        }

        Optional<Metricas> metricasEncontradas = metricasRepository.findByFk_funcionario(id_funcionario);
        if (metricasEncontradas.isEmpty()) {
            throw new RegistroNotFoundException("A métrica do funcionário de ID (" + id_funcionario + ") não foi encontrada");
        }

        return new PerfilDTO(
                usuarioAlterado.getId(),
                new UsuarioFullDTO(usuarioAlterado.getId(), usuarioAlterado.getEmail()),
                usuarioEncontrado.get().getFk_funcionario().getCargo().getNome(),
                new Date(),
                funcionarioEncontrado.get().getImagem_perfil(),
                metricasEncontradas.get().getQuantidade_receitas(),
                metricasEncontradas.get().getQuantidade_livros(),
                metricasEncontradas.get().getMedia_avaliacoes()
        );
    }

}

package com.receitas.service;


import com.receitas.dto.AuthDTO;
import com.receitas.dto.UsuarioDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.exception.UserExitsException;
import com.receitas.exception.UserNotFoundExcetion;
import com.receitas.model.Usuario;
import com.receitas.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@CrossOrigin
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder criptografar;

    public UsuarioDTO listById(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        //Validando se usuário foi encontrado
        if (usuario.isEmpty()) {
            throw new UserNotFoundExcetion("Usuário não encontrado");
        }

        return new UsuarioDTO(
                usuario.get().getEmail(),
                usuario.get().getRole()
        );

    }

    public UsuarioDTO listByEmail(String email) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if (usuario.isEmpty()) {
            throw new UserNotFoundExcetion("Usuário não encontrado");
        }

        return new UsuarioDTO(usuario.get().getEmail(), usuario.get().getRole());
    }


    //Salvando usuário na base de dados
    public UsuarioDTO save(Usuario authDTO) {

        //Validando se já existe esse usuário cadastrado
        Optional<Usuario> usuario = usuarioRepository.findByEmail(authDTO.getEmail());
        if (usuario.isPresent()) {
            throw new UserExitsException("Usuário já existe");
        }

        //Criando hash da senha
        var senhaCripto = criptografar.encode(authDTO.getSenha());

        //Convertendo class dto em class model, depois savalndo usuário na base de dados
        Usuario model = new Usuario(authDTO.getEmail(), senhaCripto, authDTO.getRole());
        Usuario modelResponse = usuarioRepository.save(model);

        //Retornando informações do usuário salvo na base de dados
        return new UsuarioDTO(modelResponse.getEmail(), modelResponse.getRole());
    }

    public Map<String, Object> update(Long id, UsuarioDTO usuarioDto) {

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findById(id);

        //Validando se usuário foi encontrado
        if (usuarioEncontrado.isEmpty()) {
            throw new UserNotFoundExcetion();
        }

        //Dados do usuário antes da alteração
        Map<String, Object> list = new HashMap<>();
        list.put("old", new UsuarioDTO(
                usuarioEncontrado.get().getEmail(),
                usuarioEncontrado.get().getRole())
        );

        //Alterando informações do usuário
        usuarioEncontrado.get().setEmail(usuarioDto.email());
        usuarioEncontrado.get().setRole(usuarioDto.role());

        //Pesistiindo alterações no banco de dados
        Usuario usuarioEditado = usuarioRepository.save(usuarioEncontrado.get());

        //Buscando os dados alterados do usuário para exibir
        list.put("new", new UsuarioDTO(
                usuarioEditado.getEmail(),
                usuarioEditado.getRole())
        );

        return list;
    }

    public Boolean delete(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        //Validando se usuário existe
        if (usuario.isEmpty()) {
            throw new UserNotFoundExcetion("Usuário não encontrado");
        }

        //Excluir do banco de dados
        usuarioRepository.delete(usuario.get());
        return true;

    }

    public Boolean deleteByFuncionario(Long fk_funcionario) {
        usuarioRepository.deleteByFk_funcionario(fk_funcionario);
        return true;
    }


    public String listByCargo(String nome_usuario) {
        Optional<String> nomeCargoEncontrado = usuarioRepository.findByCargo(nome_usuario);
        if (nomeCargoEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Nenhum cargo encontrado para o usuário (" + nome_usuario + ")");
        }

        return nomeCargoEncontrado.get();
    }
}


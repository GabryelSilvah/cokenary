package com.receitas.service;


import com.receitas.dto.UsuarioDTO;
import com.receitas.exception.UserExitsException;
import com.receitas.exception.UserNotFoundExcetion;
import com.receitas.model.Usuario;
import com.receitas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@CrossOrigin
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder criptografar;

    public UsuarioDTO findById(Long idUser) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUser);

        if (usuario.isPresent()) {
            return new UsuarioDTO(usuario.get().getEmail(),usuario.get().getSenha(),usuario.get().getRole());
        }

        throw new UserNotFoundExcetion();
    }

    public UsuarioDTO findByEmail(String emailUser) {
        Usuario usuario = usuarioRepository.findByEmail(emailUser);

        if (usuario != null) {
            return new UsuarioDTO(usuario.getEmail(), usuario.getSenha(), usuario.getRole());
        }
        return null;
    }


    //Salvando usuário na base de dados
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {

        //Validando se já existe esse usuário cadastrado
        Usuario usuario = usuarioRepository.findByEmail(usuarioDTO.email());
        if (usuario != null) {
            throw new UserExitsException("Usuário já existe");
        }

        //Criando hash da senha
        var senhaCripto = criptografar.encode(usuarioDTO.senha());

        //Convertendo class dto em class model, depois savalndo usuário na base de dados
        Usuario model = new Usuario(usuarioDTO.email(), senhaCripto, usuarioDTO.role());
        Usuario modelResponse = usuarioRepository.save(model);

        //Retornando informações do usuário salvo na base de dados
        return new UsuarioDTO(modelResponse.getEmail(), modelResponse.getSenha(), modelResponse.getRole());
    }

    public Map<String, Object> update(Long id, UsuarioDTO usuarioDto) {

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findById(id);

        Map<String, Object> list = new HashMap<>();


        if (usuarioEncontrado.isPresent()) {
            list.put("old", new UsuarioDTO(usuarioEncontrado.get().getEmail(), usuarioEncontrado.get().getSenha(), usuarioEncontrado.get().getRole()));

            String senhaSegura = criptografar.encode(usuarioDto.senha());
            usuarioEncontrado.get().setEmail(usuarioDto.email());
            usuarioEncontrado.get().setSenha(senhaSegura);
            usuarioEncontrado.get().setRole(usuarioDto.role());

            Usuario usuarioEditado = usuarioRepository.save(usuarioEncontrado.get());


            list.put("new", new UsuarioDTO(usuarioEditado.getEmail(), usuarioEditado.getSenha(), usuarioEditado.getRole()));
            return list;
        }

        throw new UserNotFoundExcetion();
    }

    public String delete(Long id_user) {
        Optional<Usuario> usuarioModel = usuarioRepository.findById(id_user);

        if (usuarioModel.isPresent()) {
            usuarioRepository.deleteById(id_user);
            return usuarioModel.get().getEmail();
        }

        throw new UserNotFoundExcetion();

    }

}


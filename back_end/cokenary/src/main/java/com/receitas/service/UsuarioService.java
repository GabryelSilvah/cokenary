package com.receitas.service;


import com.receitas.dto.UsuarioDTO;
import com.receitas.exception.UserExitsException;
import com.receitas.exception.UserNotFoundExcetion;
import com.receitas.model.Usuario_Model;
import com.receitas.repository.In_UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Service
@CrossOrigin
public class UsuarioService {

    @Autowired
    private In_UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder criptografar;

    public Optional<Usuario_Model> findById(Long idUser) {
        Optional<Usuario_Model> usuario = usuarioRepository.findById(idUser);

     if(usuario.isPresent()){
         return usuario;
     }

        throw new UserNotFoundExcetion();
    }

    public UsuarioDTO findByEmail(String emailUser) {
        Usuario_Model usuario = usuarioRepository.findByEmail(emailUser);

        if (usuario != null) {
            return new UsuarioDTO(usuario.getEmail(), usuario.getSenha(), usuario.getRole());
        }
        return null;
    }


    //Salvando usuário na base de dados
    public UsuarioDTO save(UsuarioDTO usuarioDTO) {

        //Validando se já existe esse usuário cadastrado
        Usuario_Model usuario = usuarioRepository.findByEmail(usuarioDTO.email());
        if (usuario != null) {
            throw new UserExitsException("Usuário já existe");
        }

        //Criando hash da senha
        var senhaCripto = criptografar.encode(usuarioDTO.senha());

        //Convertendo class dto em class model, depois savalndo usuário na base de dados
        Usuario_Model model = new Usuario_Model(usuarioDTO.email(), senhaCripto, usuarioDTO.role());
        Usuario_Model modelResponse = usuarioRepository.save(model);

        //Retornando informações do usuário salvo na base de dados
        return new UsuarioDTO(modelResponse.getEmail(), modelResponse.getSenha(), modelResponse.getRole());
    }

    public UsuarioDTO update(String email, UsuarioDTO usuarioDto) {

        UsuarioDTO usuarioEncontrado = findByEmail(email);

        if (usuarioEncontrado != null) {
            Usuario_Model usuarioModel = new Usuario_Model(usuarioEncontrado);
            Usuario_Model usuarioEdit = usuarioRepository.save(usuarioModel);
            return new UsuarioDTO(usuarioEdit.getEmail(), usuarioEdit.getSenha(), usuarioEdit.getRole());
        }
        return usuarioEncontrado;
    }

    public String delete(Long id_user) {

        usuarioRepository.deleteById(id_user);
        return "Usuário deletado com sucesso";
    }
}

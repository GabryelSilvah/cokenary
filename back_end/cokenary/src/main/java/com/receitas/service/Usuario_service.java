package com.receitas.service;


import com.receitas.dto.Usuario_DTO;
import com.receitas.model.Usuario_Model;
import com.receitas.repository.In_UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class Usuario_service {

    @Autowired
    private In_UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder criptografar;

    public Usuario_DTO listUser(Usuario_DTO usuarioDto){
        Usuario_Model usuario = usuarioRepository.findByEmail(usuarioDto.email());
        return new Usuario_DTO(usuario.getEmail(),usuario.getSenha());
    }



    //Salvando usuário na base de dados
    public Usuario_DTO save(Usuario_DTO usuarioDTO) {

        Usuario_Model usuario = usuarioRepository.findByEmail(usuarioDTO.email());

        if (usuario != null) {
            throw new RuntimeException("Usuário já existe");
        }

        //Criando hash da senha
        var senhaCripto = criptografar.encode(usuarioDTO.senha());

        //Convertendo class dto em class model, depois savalndo usuário na base de dados
        Usuario_Model model = new Usuario_Model(usuarioDTO.email(), senhaCripto);
        Usuario_Model modelResponse = usuarioRepository.save(model);

        //Retornando informações do usuário salvo na base de dados
        return new Usuario_DTO(modelResponse.getEmail(), modelResponse.getSenha());
    }
}

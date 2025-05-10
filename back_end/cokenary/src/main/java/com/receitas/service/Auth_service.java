package com.receitas.service;


import com.receitas.exception.UserNotFoundExcetion;
import com.receitas.model.Usuario_Model;
import com.receitas.repository.In_UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin
public class Auth_service  implements UserDetailsService {
    @Autowired
    private In_UsuarioRepository usuarioRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario_Model usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            return usuario;
        }

        throw new UserNotFoundExcetion("Usuário não encontrado: " + email);
    }

    //Buscando o Token já criando do usuário


<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

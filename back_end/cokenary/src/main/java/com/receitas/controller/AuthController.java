package com.receitas.controller;

import com.receitas.config.ResponseToken;
import com.receitas.dto.UsuarioDTO;
import com.receitas.model.Usuario_Model;
import com.receitas.response.ResponseJson;
import com.receitas.service.In_tokeJWT;
import com.receitas.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager gerenciadorAuth;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private In_tokeJWT authService;

    @PostMapping("/auth")
    private ResponseEntity<?> autenticar(@RequestBody UsuarioDTO usuarioDto) {

        //Validadando email e senha do usuário inserido
        var userNamePass = new UsernamePasswordAuthenticationToken(usuarioDto.email(), usuarioDto.senha());
        Authentication autenticate = gerenciadorAuth.authenticate(userNamePass);

        //Pegando dados do usuário autenticado
        var usuario = (Usuario_Model) autenticate.getPrincipal();
        ResponseToken responseToken = new ResponseToken(HttpStatus.OK.value(), tokenService.createToken(usuario), usuario.getEmail());
        //Gerando Token
        return ResponseJson.build(
                "Usuário autenticado com sucesso!!",
                HttpStatus.OK,
                responseToken
        );

    }


<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

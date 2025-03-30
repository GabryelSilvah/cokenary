package com.receitas.controller;

import com.receitas.dto.Auth_DTO;
import com.receitas.service.In_AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Auth_controller {

    @Autowired
   private AuthenticationManager gerenciadorAuth;

    @Autowired
    private In_AuthService authService;

    @PostMapping("/auth")
    @ResponseStatus(HttpStatus.OK)
    private String autenticar(@RequestBody Auth_DTO authDto) {

        //Validadando email e senha do usuário inserido
        var validacaoUsuario = new UsernamePasswordAuthenticationToken(authDto.email(), authDto.senha());
        gerenciadorAuth.authenticate(validacaoUsuario);

        //Enviando token
        return authService.getToken(authDto);
    }
}

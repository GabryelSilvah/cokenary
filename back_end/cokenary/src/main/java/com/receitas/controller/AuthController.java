package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.config.ResponseToken;
import com.receitas.dto.AuthDTO;
import com.receitas.dto.UsuarioDTO;
import com.receitas.model.Usuario;
import com.receitas.service.In_tokeJWT;
import com.receitas.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    private ResponseEntity<?> autenticar(@RequestBody AuthDTO authDTO) {

        //Validadando email e senha do usuário inserido
        var userNamePass = new UsernamePasswordAuthenticationToken(authDTO.email(), authDTO.senha());
        Authentication autenticate = gerenciadorAuth.authenticate(userNamePass);

        //Pegando dados do usuário autenticado
        var usuario = (Usuario) autenticate.getPrincipal();
        ResponseToken responseToken = new ResponseToken(HttpStatus.OK.value(), tokenService.createToken(usuario), usuario.getEmail());

        //Gerando Token
        return ResponseJson.build(
                HttpStatus.OK,
                "Usuário autenticado com sucesso!!",
                responseToken
        );

    }



}


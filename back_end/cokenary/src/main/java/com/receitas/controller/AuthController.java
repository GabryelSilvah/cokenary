package com.receitas.controller;

import com.receitas.dto.UsuarioDTO;
import com.receitas.model.Usuario_Model;
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
        try {
            //Validadando email e senha do usuário inserido
            var userNamePass = new UsernamePasswordAuthenticationToken(usuarioDto.email(), usuarioDto.senha());
            Authentication autenticate = gerenciadorAuth.authenticate(userNamePass);

            var usuario = (Usuario_Model) autenticate.getPrincipal();

            //Gerando Token
            return ResponseEntity.status(HttpStatus.OK).body(tokenService.createToken(usuario));
        } catch (UsernameNotFoundException erro) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        }
    }


}

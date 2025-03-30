package com.receitas.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.receitas.dto.Auth_DTO;
import com.receitas.model.Usuario_Model;
import com.receitas.repository.In_UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class Auth_service implements In_AuthService {
    @Value("${key.private.token}")
    private String key_private_jwt;
    @Autowired
    private In_UsuarioRepository usuarioRepository;

    //
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return usuarioRepository.findByEmail(email);
    }

    //Buscando o Token já criando do usuário
    @Override
    public String getToken(Auth_DTO authDto) {
        Usuario_Model usuario = usuarioRepository.findByEmail(authDto.email());
        return this.createToken(usuario);
    }

    //Criando Token para o usuário
    @Override
    public String createToken(Usuario_Model usuario) {

        try {
            Algorithm codeJWT = Algorithm.HMAC256(key_private_jwt);

            return JWT.create()
                    .withIssuer("api-cookenary")
                    .withSubject(usuario.getEmail())
                    .withExpiresAt(this.generateTimeFinal())
                    .sign(codeJWT);
        } catch (RuntimeException erro) {
            throw new RuntimeException("Falha ao tentar criar token, mensagem: " + erro.getMessage());
        }


    }

    //Valindado o Token do usuário
    @Override
    public String validateToken(String token) {
        try {

            Algorithm codeJWT = Algorithm.HMAC256(key_private_jwt);
            return JWT.require(codeJWT)
                    .withIssuer("api-cookenary")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException erro) {
            return "";
        }

    }

    //Gerando tempo de validade do Token
    @Override
    public Instant generateTimeFinal() {
        return LocalDateTime.now()
                .plusHours(10)
                .toInstant(ZoneOffset
                        .of("-03:00"));
    }

}

package com.receitas.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.receitas.model.Usuario_Model;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;


@Service
@CrossOrigin
public class TokenService implements In_tokeJWT {
    @Value("${key.private.token}")
    private String key_private_jwt;


    //Criando Token para o usuário
    @Override
    public String createToken(Usuario_Model usuarioModel) {

        try {
            return JWT.create()
                    .withIssuer("api-cookenary")
                    .withSubject(usuarioModel.getEmail())
                    .withExpiresAt(this.generateTimeFinal())
                    .sign(Algorithm.HMAC256(key_private_jwt));
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
            return erro.getMessage();
        }

    }

    //Gerando tempo de validade do Token
    @Override
    public Instant generateTimeFinal() {
        return LocalDateTime.now()
                .plusHours(10)
                .toInstant(ZoneOffset.of("-03:00"));
    }
}
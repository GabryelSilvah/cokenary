package com.receitas.service;

import com.receitas.model.Usuario;

import java.time.Instant;


public interface In_tokeJWT {


    String createToken(Usuario usuarioModel);

    String validateToken(String token);

    Instant generateTimeFinal();



}



package com.receitas.service;

import com.receitas.model.Usuario_Model;

import java.time.Instant;


public interface In_tokeJWT {


    String createToken(Usuario_Model usuarioModel);

    String validateToken(String token);

    Instant generateTimeFinal();


}
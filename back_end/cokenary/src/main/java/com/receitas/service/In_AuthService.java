package com.receitas.service;

import com.receitas.dto.Auth_DTO;
import com.receitas.model.Usuario_Model;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.time.Instant;


public interface In_AuthService extends UserDetailsService {

    String getToken(Auth_DTO authDto);

    String createToken(Usuario_Model usuario);

    String validateToken(String token);

    Instant generateTimeFinal();


}

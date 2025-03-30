package com.receitas.security;

import com.receitas.model.Usuario_Model;
import com.receitas.repository.In_UsuarioRepository;
import com.receitas.service.In_AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestToken extends OncePerRequestFilter {

    @Autowired
    private In_AuthService authService;
    @Autowired
    private In_UsuarioRepository usuarioRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        //Pegando o token
        String token = getHeaderHttp(request);

        if (token != null) {
            String login = authService.validateToken(token);
            Usuario_Model usuario = usuarioRepository.findByEmail(login);

            var autenticacao = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(autenticacao);
        }

        filterChain.doFilter(request, response);
    }

    protected String getHeaderHttp(HttpServletRequest http) {

        var authHeader = http.getHeader("Authorization");

        //Validando se existe um auth no header
        if (authHeader == null) {
            return null;
        }

        //Bearer
        if (!authHeader.split(" ")[0].equals("Bearer")) {
            return null;
        }

        return authHeader.split(" ")[1];
    }
}

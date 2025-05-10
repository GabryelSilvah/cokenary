package com.receitas.security;

import com.receitas.model.Usuario_Model;
import com.receitas.repository.In_UsuarioRepository;
import com.receitas.service.In_tokeJWT;
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
public class FillterToken extends OncePerRequestFilter {

    @Autowired
    private In_tokeJWT authService;
    @Autowired
    private In_UsuarioRepository usuarioRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        var authHeader = request.getHeader("Authorization");

        //Validando se existe um auth no header
        if (authHeader != null) {
            String tokenHeader = authHeader.replace("Bearer ", "");
            //Pegando usuário guardado dentro do Token
            String subject = authService.validateToken(tokenHeader);
            //Buscando usuário na base de dados
            Usuario_Model usuario = usuarioRepository.findByEmail(subject);

            var autenticacao = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(autenticacao);
        }

        //Liberando acesso
        filterChain.doFilter(request, response);

    }
<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

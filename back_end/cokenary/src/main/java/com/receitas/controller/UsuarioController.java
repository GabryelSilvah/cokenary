package com.receitas.controller;


import com.receitas.dto.Usuario_DTO;
import com.receitas.service.Usuario_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    @Autowired
    private Usuario_service usuarioService;

    @GetMapping("/user")
    public Usuario_DTO show_user(@RequestBody Usuario_DTO usuarioDto) {
        return usuarioService.listUser(usuarioDto);
    }

    @PostMapping("/user")
    public Usuario_DTO register_user(@RequestBody Usuario_DTO usuarioDto) {

        return usuarioService.save(usuarioDto);
    }


}

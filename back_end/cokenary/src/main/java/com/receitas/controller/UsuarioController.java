package com.receitas.controller;

import com.receitas.dto.UsuarioDTO;
import com.receitas.exception.ArgumentsException;
import com.receitas.response.ResponseJson;
import com.receitas.service.UsuarioService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Secured("ADMIN")
    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return ResponseJson.build(
                "Usuário encontrado com sucesso!!",
                HttpStatus.OK,
                usuarioService.findById(id)
        );
    }

    @PostMapping
    public ResponseEntity<?> register_user(@Valid @RequestBody UsuarioDTO usuarioDto, BindingResult bindingResult) {
        try {
            UsuarioDTO usuario = usuarioService.save(usuarioDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        } catch (ArgumentsException erro) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro.getMessage());
        }
    }

    @Secured("ADMIN")
    @PutMapping("{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UsuarioDTO usuarioDto, @PathVariable Long id) {
        return ResponseJson.build(
                "Usuário alterado com sucesso!!",
                HttpStatus.CREATED,
                usuarioService.update(id, usuarioDto)
        );
    }

    @Secured("ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return ResponseJson.build(
                "Usuário apagado com sucesso!!",
                HttpStatus.OK,
                usuarioService.delete(id)
        );
    }
}

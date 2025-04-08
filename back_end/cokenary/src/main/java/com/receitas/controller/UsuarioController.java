package com.receitas.controller;


import com.receitas.dto.UsuarioDTO;
import com.receitas.exception.errorResponse.ErrorReponse;
import com.receitas.model.Usuario_Model;
import com.receitas.service.UsuarioService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Secured("USER")
    @GetMapping("{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Usuario_Model usuario = usuarioService.findById(id);

        if (usuario != null) {
            UsuarioDTO usuario_dto = new UsuarioDTO(usuario.getEmail(), usuario.getSenha(), usuario.getRole());
            return ResponseEntity.status(HttpStatus.OK).body(usuario_dto);
        }

        return ResponseEntity.status(HttpStatus.OK).body("Nenhum usuário encontrado.");
    }

    @PostMapping
    public ResponseEntity<?> register_user(@RequestBody UsuarioDTO usuarioDto) {

        try {
            UsuarioDTO usuario = usuarioService.save(usuarioDto);

            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);

        } catch (RuntimeException erro) {
            ErrorReponse responseError = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), erro.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseError);
        }

    }

    @Secured("ADMIN")
    @PutMapping
    public ResponseEntity<UsuarioDTO> update(@Valid @RequestBody UsuarioDTO usuarioDto, String id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.update(id, usuarioDto));
    }

    @Secured("ADMIN")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        usuarioService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário apagado com sucesso!!");
    }

}

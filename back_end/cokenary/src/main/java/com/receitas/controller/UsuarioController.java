package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.AuthDTO;
import com.receitas.dto.UsuarioDTO;
import com.receitas.service.UsuarioService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Secured("ADMIN")
    @GetMapping("/byId/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Object usuario = usuarioService.listById(id);
        return ResponseJson.build(HttpStatus.OK, "Usuário encontrado com sucesso!!", usuario);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> register_user(@Valid @RequestBody AuthDTO authDTO, BindingResult bindingResult) {
        UsuarioDTO usuario = usuarioService.save(authDTO);
        return ResponseJson.build(HttpStatus.CREATED, "Usuário cadastrado com sucesso!", usuario);
    }

    @Secured("ADMIN")
    @PutMapping("/alterar/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UsuarioDTO usuarioDto, @PathVariable Long id) {
        Map<String, Object> usuario = usuarioService.update(id, usuarioDto);
        return ResponseJson.build(HttpStatus.CREATED, "Usuário atulizado com sucesso!", usuario);
    }

    @Secured("ADMIN")
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseJson.build(HttpStatus.OK, "Usuário apagado com sucesso!!");
    }
}

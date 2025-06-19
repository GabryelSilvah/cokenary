package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.PerfilDTO;
import com.receitas.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;

    @GetMapping("/id_func/{id_funcionario}")
    public ResponseEntity<ResponseJson> exibir_perfil(@PathVariable("id_funcionario") Long id_funcionario) {
        PerfilDTO perfilDTO = perfilService.listPerfilById(id_funcionario);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Perfil encontrado com sucesso!", perfilDTO));
    }

    @PutMapping("/alterar/{id_funcionario}")
    public ResponseEntity<ResponseJson> alterar_nome_usuario(@PathVariable("id_funcionario") Long id_funcionario, PerfilDTO perfil) {
        PerfilDTO perfilDTO = perfilService.updateName(id_funcionario, perfil);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Perfil encontrado com sucesso!", perfilDTO));
    }
}

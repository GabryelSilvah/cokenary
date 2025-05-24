package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.model.Funcionario;
import com.receitas.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "http://localhost:8082")
public class FuncionarioController {
    @Autowired
    private FuncionarioService service;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> show() {
        ResponseJson serviceResponse = service.listAll();
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> show_by_id(@PathVariable Long id) {
        ResponseJson serviceResponse = service.listById(id);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> create(@RequestBody Funcionario funcionario) {
        ResponseJson serviceResponse = service.saveFuncionario(funcionario);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> update(@PathVariable("id") Long id, @RequestBody Funcionario funcionario) {
        ResponseJson serviceResponse = this.service.update(id, funcionario);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> deletar(@PathVariable("id") Long id) {
        ResponseJson serviceResponse = service.delete(id);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }
}
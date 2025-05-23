package com.receitas.controller;

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
    public ResponseEntity<List<FuncionarioDTO>> show() {
        List<FuncionarioDTO> listaFuncionarios = service.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(listaFuncionarios);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<FuncionarioDTO> show_by_id(@PathVariable Long id) {
        FuncionarioDTO listaFuncionarios = service.listById(id);
        return ResponseEntity.status(HttpStatus.OK).body(listaFuncionarios);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<FuncionarioDTO> create(@RequestBody Funcionario funcionario) {
        FuncionarioDTO funcionarioSalvo = service.saveFuncionario(funcionario);
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioSalvo);
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Funcionario funcionario) {

        Optional<Funcionario> funcionarioAtualizado = this.service.update(id, funcionario);
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioAtualizado.get());

    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<String> deletar(@PathVariable("id") Long id) {

        service.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Deletado com sucesso");

    }
}
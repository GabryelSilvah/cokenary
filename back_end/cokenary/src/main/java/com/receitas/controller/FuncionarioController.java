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

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "http://localhost:8082")
public class FuncionarioController {
    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<FuncionarioDTO> listaFuncionariosDTO = funcionarioService.listAll();
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Funcionarios listadas com sucesso!", listaFuncionariosDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        FuncionarioDTO funcionarioDTO = funcionarioService.listById(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Funcionario encontrada com sucesso!", funcionarioDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Funcionario funcionario) {
        FuncionarioDTO funcionarioDTO = funcionarioService.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Funcionario cadastrado com sucesso!", funcionarioDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Funcionario funcionario) {
        FuncionarioDTO funcionarioDTO = funcionarioService.update(id, funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Funcionario alterado com sucesso!", funcionarioDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = funcionarioService.delete(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.CREATED, "Funcionario excluido com sucesso!"));
    }
}
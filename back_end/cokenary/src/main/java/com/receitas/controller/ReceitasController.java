package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Funcionario;
import com.receitas.model.Receita;
import com.receitas.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/receitas")
public class ReceitasController {
    @Autowired
    private ReceitaService receitaService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> show() {
        ResponseJson serviceResponse = receitaService.listAll();
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastre(@RequestBody Receita receita) {
        ResponseJson serviceResponse = receitaService.save(receita);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> update(@PathVariable("id") Long id, @RequestBody Receita receita) {
        ResponseJson serviceResponse = receitaService.update(id, receita);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> deletar(@PathVariable("id") Long id) {
        ResponseJson serviceResponse = receitaService.delete(id);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

}

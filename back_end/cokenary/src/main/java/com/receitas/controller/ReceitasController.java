package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.model.Receita;
import com.receitas.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}

package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}

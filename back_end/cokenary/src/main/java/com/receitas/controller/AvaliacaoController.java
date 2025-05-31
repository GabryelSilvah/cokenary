package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.AvaliacaoDTO;
import com.receitas.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/receita/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<AvaliacaoDTO> listaAvaliacaosDTO = avaliacaoService.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Avaliações listadas com sucesso!", listaAvaliacaosDTO));
    }
}

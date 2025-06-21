package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.MedidaDTO;
import com.receitas.dto.PainelDTO;
import com.receitas.service.PainelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/painel")
public class PainelController {

    @Autowired
    private PainelService painelService;

    @GetMapping("/listar_numeros")
    public ResponseEntity<ResponseJson> listar() {
        PainelDTO painelDTO = painelService.listarContagem();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Medidas listadas com sucesso!", painelDTO));
    }
}

package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.CategoriaDTO;
import com.receitas.dto.IngredienteDTO;
import com.receitas.dto.MedidaDTO;
import com.receitas.service.MedidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/receitas/medida")
public class MedidaController {

    @Autowired
    private MedidaService medidaService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<MedidaDTO> listaMedidasDTO = medidaService.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Medidas listadas com sucesso!", listaMedidasDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        MedidaDTO medidaDTO = medidaService.listById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Medida encontrada com sucesso!", medidaDTO));
    }
}

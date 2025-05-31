package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.CategoriaDTO;
import com.receitas.dto.IngredienteDTO;
import com.receitas.service.IngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/receitas/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteService ingredienteService;


    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<CategoriaDTO> listaIngredientesDTO = ingredienteService.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Categorias listadas com sucesso!", listaIngredientesDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        IngredienteDTO ingredienteDTO = ingredienteService.listById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Categorias encontrada com sucesso!", ingredienteDTO));
    }


}

package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.IngredienteDTO;
import com.receitas.model.Ingrediente;
import com.receitas.service.IngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas/ingredientes")
public class IngredienteController {

    @Autowired
    private IngredienteService ingredienteService;


    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<IngredienteDTO> listaIngredientesDTO = ingredienteService.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Ingredientes listados com sucesso!", listaIngredientesDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        IngredienteDTO ingredienteDTO = ingredienteService.listById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Ingredientes encontrado com sucesso!", ingredienteDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Ingrediente ingrediente) {
        IngredienteDTO ingredienteDTO = ingredienteService.save(ingrediente);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "Ingrdiente cadastrado com sucesso!", ingredienteDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Ingrediente ingrediente) {
        IngredienteDTO ingredienteDTO = ingredienteService.update(id, ingrediente);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "Ingrediente alterado com sucesso!", ingredienteDTO));
    }


    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = ingredienteService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "Ingrediente excluido com sucesso!"));
    }

}

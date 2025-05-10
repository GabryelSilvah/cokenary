package com.receitas.controller;

import com.receitas.model.Ingrediente;
import com.receitas.service.IngredienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredientes")
@CrossOrigin(origins = "http://localhost:8082")
public class IngredienteController {

    private final IngredienteService ingredienteService;

    @Autowired
    public IngredienteController(IngredienteService ingredienteService) {
        this.ingredienteService = ingredienteService;
    }

    @GetMapping
    public ResponseEntity<List<Ingrediente>> listarTodos() {
        List<Ingrediente> ingredientes = ingredienteService.listarTodos();
        return ResponseEntity.ok(ingredientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> buscarPorId(@PathVariable Integer id) {
        Ingrediente ingrediente = ingredienteService.buscarPorId(id);
        return ResponseEntity.ok(ingrediente);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Ingrediente>> buscarPorNome(@RequestParam String nome) {
        List<Ingrediente> ingredientes = ingredienteService.buscarPorNome(nome);
        return ResponseEntity.ok(ingredientes);
    }

    @PostMapping
    public ResponseEntity<Ingrediente> criar(@RequestBody Ingrediente ingrediente) {
        Ingrediente novoIngrediente = ingredienteService.salvar(ingrediente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoIngrediente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        ingredienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> atualizar(
            @PathVariable Integer id,
            @RequestBody Ingrediente ingrediente) {

        ingrediente.setId(id); // Corrigido aqui
        Ingrediente ingredienteAtualizado = ingredienteService.salvar(ingrediente);
        return ResponseEntity.ok(ingredienteAtualizado);
    }
}

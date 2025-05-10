package com.receitas.controller;

import com.receitas.model.Receita;
import com.receitas.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@CrossOrigin
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    // Endpoint para listar todas as receitas
    @GetMapping
    public ResponseEntity<List<Receita>> getAllRecipes() {
        List<Receita> receitas = receitaService.listarTodas();
        return ResponseEntity.ok(receitas);
    }

    // Endpoint para buscar uma receita por ID
    @GetMapping("/{id}")
    public ResponseEntity<Receita> getRecipeById(@PathVariable Long id) {
        Receita receita = receitaService.buscarPorId(id);
        return ResponseEntity.ok(receita);
    }

    // Endpoint para criar uma nova receita
    @PostMapping
    public ResponseEntity<Receita> createRecipe(@RequestBody Receita receita) {
        System.out.println("Ingredientes recebidos: " + receita.getIngredients()); // Verifique os ingredientes
        Receita novaReceita = receitaService.salvar(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaReceita);
    }

    // Endpoint para atualizar uma receita existente
    @PutMapping("/{id}")
    public ResponseEntity<Receita> atualizarReceita(@PathVariable Long id, @RequestBody Receita receita) {
        // Verifica se a receita com o ID fornecido existe
        Receita receitaExistente = receitaService.buscarPorId(id);
        if (receitaExistente == null) {
            return ResponseEntity.notFound().build();
        }

        // Atualiza os dados da receita
        receita.setId(id); // Garante que o ID seja o mesmo
        Receita receitaAtualizada = receitaService.salvar(receita);
        return ResponseEntity.ok(receitaAtualizada);
    }

    // Endpoint para excluir uma receita
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        // Verifica se a receita com o ID fornecido existe
        Receita receitaExistente = receitaService.buscarPorId(id);
        if (receitaExistente == null) {
            return ResponseEntity.notFound().build();
        }

        receitaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
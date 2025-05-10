package com.receitas.controller;

import com.receitas.model.Medida;
import com.receitas.service.MedidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medidas")
@CrossOrigin(origins = "http://localhost:8082")
public class MedidaController {

    private final MedidaService medidaService;

    @Autowired
    public MedidaController(MedidaService medidaService) {
        this.medidaService = medidaService;
    }

    @GetMapping
    public ResponseEntity<List<Medida>> listarTodas() {
        List<Medida> medidas = medidaService.listarTodas();
        return ResponseEntity.ok(medidas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medida> buscarPorId(@PathVariable Integer id) {
        Medida medida = medidaService.buscarPorId(id);
        return ResponseEntity.ok(medida);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Medida>> buscarPorDescricao(@RequestParam String descricao) {
        List<Medida> medidas = medidaService.buscarPorDescricao(descricao);
        return ResponseEntity.ok(medidas);
    }

    @PostMapping
    public ResponseEntity<Medida> criar(@RequestBody Medida medida) {
        Medida novaMedida = medidaService.salvar(medida);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaMedida);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        medidaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medida> atualizar(
            @PathVariable Integer id,
            @RequestBody Medida medida) {

        medida.setId(id); // Aqui foi corrigido: de setIdMedida() para setId()
        Medida medidaAtualizada = medidaService.salvar(medida);
        return ResponseEntity.ok(medidaAtualizada);
    }
}

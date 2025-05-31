package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;
import com.receitas.repository.CargoRepository;
import com.receitas.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cargos")
@CrossOrigin(origins = "http://localhost:8082")
public class CargoController {

    private final CargoRepository cargoRepository;

    @Autowired
    private CargoService cargoService;

    public CargoController(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> show() {
        ResponseJson serviceResponse = cargoService.listarTodos();
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @GetMapping("/byid/{id}")
    public ResponseEntity<Cargo> buscarPorId(@PathVariable Long id) {
        Optional<Cargo> cargo = cargoRepository.findById(id);
        return cargo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> create(@RequestBody Cargo cargo) {
        ResponseJson serviceResponse = cargoService.incluir(cargo);
        return ResponseEntity.status(serviceResponse.getStatus()).body(serviceResponse);
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Cargo cargoAtualizado) {
        return null;
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!cargoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        cargoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Cargo>> listarAtivos() {
        List<Cargo> cargosAtivos = cargoRepository.findByIndAtivoTrue();
        return ResponseEntity.ok(cargosAtivos);
    }

    @GetMapping("/inativos")
    public ResponseEntity<List<Cargo>> listarInativos() {
        List<Cargo> cargosInativos = cargoRepository.findByIndAtivoFalse();
        return ResponseEntity.ok(cargosInativos);
    }
}
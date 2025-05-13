package com.receitas.controller;

import com.receitas.model.Cargo;
import com.receitas.repository.CargoRepository;
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

    public CargoController(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Cargo>> listarTodos() {
        List<Cargo> cargos = cargoRepository.findAll();
        return ResponseEntity.ok(cargos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cargo> buscarPorId(@PathVariable Long id) {
        Optional<Cargo> cargo = cargoRepository.findById(id);
        return cargo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cargo> criar(@RequestBody Cargo cargo) {
        if (cargoRepository.existsByNome(cargo.getNome())) {
            return ResponseEntity.badRequest().build();
        }

        // Set default values if not provided
        if (cargo.getDataInicio() == null) {
            cargo.setDataInicio(LocalDate.now());
        }
        if (cargo.getIndAtivo() == null) {  // Changed from isIndAtivo() to getIndAtivo()
            cargo.setIndAtivo(true);
        }

        Cargo cargoSalvo = cargoRepository.save(cargo);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(cargoSalvo.getId())
                .toUri();

        return ResponseEntity.created(location).body(cargoSalvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Cargo cargoAtualizado) {
        return cargoRepository.findById(id)
                .map(cargo -> {
                    if (!cargo.getNome().equals(cargoAtualizado.getNome())) {
                        if (cargoAtualizado.getNome() != null &&
                                !cargoAtualizado.getNome().isBlank() &&
                                cargoRepository.existsByNome(cargoAtualizado.getNome())) {

                            Map<String, String> erro = new HashMap<>();
                            erro.put("mensagem", "Já existe um cargo com este nome");
                            return ResponseEntity.badRequest().body(erro);
                        }
                    }

                    cargo.atualizarDados(
                            cargoAtualizado.getNome(),
                            cargoAtualizado.getDescricao(),
                            cargoAtualizado.getDepartamento(),
                            cargoAtualizado.getNivel(),
                            cargoAtualizado.getDataInicio(),
                            cargoAtualizado.getDataFim(),
                            cargoAtualizado.getIndAtivo()  // Changed from isIndAtivo() to getIndAtivo()
                    );

                    return ResponseEntity.ok(cargoRepository.save(cargo));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
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
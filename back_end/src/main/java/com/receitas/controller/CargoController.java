package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.CargoDTO;
import com.receitas.model.Cargo;
import com.receitas.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cargos")
@CrossOrigin(origins = "http://localhost:8082")
public class CargoController {

    @Autowired
    private CargoService cargoService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<CargoDTO> listaCargosDTO = cargoService.listAll();
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Cargos listados com sucesso!", listaCargosDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        CargoDTO cargoDTO = cargoService.listById(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Cargo encontrado com sucesso!", cargoDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Cargo cargo) {
        CargoDTO cargoDTO = cargoService.save(cargo);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Cargo cadastrado com sucesso!", cargoDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Cargo cargo) {
        CargoDTO cargoDTO = cargoService.update(id, cargo);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Cargo alterado com sucesso!", cargoDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = cargoService.delete(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.CREATED, "Cargo excluido com sucesso!"));
    }


}
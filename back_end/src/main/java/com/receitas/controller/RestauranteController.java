package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.RestauranteDTO;
import com.receitas.model.Restaurante;
import com.receitas.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "http://localhost:8082")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<RestauranteDTO> listaRestaurantesDTO = restauranteService.listAll();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Restaurantes listados com sucesso!", listaRestaurantesDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscarPorId(@PathVariable("id") Long id) {
        RestauranteDTO restauranteDTO = restauranteService.listById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Restaurante encontrado com sucesso!", restauranteDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Restaurante restaurante) {
        RestauranteDTO restauranteDTO = restauranteService.save(restaurante);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseJson(HttpStatus.CREATED, "Restaurante cadastrado com sucesso!", restauranteDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Restaurante restaurante) {
        RestauranteDTO restauranteDTO = restauranteService.update(id, restaurante);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Restaurante alterado com sucesso!", restauranteDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = restauranteService.delete(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Restaurante excluído com sucesso!"));
    }
}
package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.ReferenciaDTO;
import com.receitas.model.Referencia;
import com.receitas.service.ReferenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/referencias")
@CrossOrigin(origins = "http://localhost:8082")
public class ReferenciaController {

    @Autowired
    private ReferenciaService referenciaService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<ReferenciaDTO> listaReferenciasDTO = referenciaService.listAll();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Referências listadas com sucesso!", listaReferenciasDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscarPorId(@PathVariable("id") Long id) {
        ReferenciaDTO referenciaDTO = referenciaService.listById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Referência encontrada com sucesso!", referenciaDTO));
    }

    @GetMapping("/funcionario/{funcionarioId}")
    public ResponseEntity<ResponseJson> listarPorFuncionario(@PathVariable("funcionarioId") Long funcionarioId) {
        List<ReferenciaDTO> listaReferenciasDTO = referenciaService.listByFuncionario(funcionarioId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Referências do funcionário listadas com sucesso!", listaReferenciasDTO));
    }

    @GetMapping("/restaurante/{restauranteId}")
    public ResponseEntity<ResponseJson> listarPorRestaurante(@PathVariable("restauranteId") Long restauranteId) {
        List<ReferenciaDTO> listaReferenciasDTO = referenciaService.listByRestaurante(restauranteId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Referências do restaurante listadas com sucesso!", listaReferenciasDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Referencia referencia) {
        ReferenciaDTO referenciaDTO = referenciaService.save(referencia);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseJson(HttpStatus.CREATED, "Referência cadastrada com sucesso!", referenciaDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Referencia referencia) {
        ReferenciaDTO referenciaDTO = referenciaService.update(id, referencia);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Referência alterada com sucesso!", referenciaDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = referenciaService.delete(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseJson(HttpStatus.OK, "Referência excluída com sucesso!"));
    }
}
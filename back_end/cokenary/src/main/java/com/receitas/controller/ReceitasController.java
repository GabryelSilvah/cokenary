package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.Receita_all_infor;
import com.receitas.dto.ReceitaDTO;
import com.receitas.model.Receita;
import com.receitas.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitasController {
    @Autowired
    private ReceitaService receitaService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<ReceitaDTO> receitasDTOS = receitaService.listAll();
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso", receitasDTOS));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> listar_por_id(@PathVariable("id") Long id) {
        ReceitaDTO receitasDTOS = receitaService.listById(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso", receitasDTOS));
    }

    @GetMapping("/byIdAllInfor/{id}")
    public ResponseEntity<ResponseJson> listar_por_id_allInfor(@PathVariable("id") Long id) {
        Receita_all_infor receitasDTOS = receitaService.listByIdAllInfor(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso", receitasDTOS));
    }


    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Receita receita) {
        ReceitaDTO receitaDTO = receitaService.save(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Receita cadastrada com sucesso!", receitaDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> update(@PathVariable("id") Long id, @RequestBody Receita receita) {
        ReceitaDTO receitaDTO = receitaService.update(id, receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Receita alterada com sucesso", receitaDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> deletar(@PathVariable("id") Long id) {
        boolean responseService = receitaService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Receita excluida com sucesso"));
    }

}

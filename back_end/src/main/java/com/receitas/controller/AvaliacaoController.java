package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.AvaliacaoDTO;
import com.receitas.dto.ReceitaFullDTO;
import com.receitas.model.Avaliacao;
import com.receitas.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<AvaliacaoDTO> listaAvaliacaosDTO = avaliacaoService.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Avaliações listadas com sucesso!", listaAvaliacaosDTO));
    }

    @GetMapping("/listar-nao-avaliadas/{id}")
    public ResponseEntity<ResponseJson> receitas_nao_avaliadas(@PathVariable("id") Long id_avaliador) {
        List<ReceitaFullDTO> listaAvaliacaosDTO = avaliacaoService.listReceitasNaoAvaliadas(id_avaliador);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Receitas não avaliadas listadas com sucesso!", listaAvaliacaosDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        AvaliacaoDTO avaliacaoDTO = avaliacaoService.listById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Avaliação encontrada com sucesso!", avaliacaoDTO));
    }

    @GetMapping("/byDegustador/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_degustador(@PathVariable("id") Long id) {
        List<AvaliacaoDTO> avaliacaoDTO = avaliacaoService.listByAvaliador(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "Avaliação encontrada com sucesso!", avaliacaoDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody AvaliacaoDTO avaliacao) {
        AvaliacaoDTO avaliacaoDTO = avaliacaoService.save(avaliacao);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "Avaliação cadastrada com sucesso!", avaliacaoDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody AvaliacaoDTO avaliacao) {
        AvaliacaoDTO avaliacaoDTO = avaliacaoService.update(id, avaliacao);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "Avaliação alterada com sucesso!", avaliacaoDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = avaliacaoService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "Avaliação excluido com sucesso!"));
    }

}

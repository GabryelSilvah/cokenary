package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.Publicacao_livroDTO;
import com.receitas.model.Publicacao_livro;
import com.receitas.service.Publicacao_livroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicaes_livros")
public class Publicao_livroController {

    @Autowired
    private Publicacao_livroService publicacaoLivroService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<Publicacao_livroDTO> publicacaoLivroDTOS = publicacaoLivroService.listAll();
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Publicações dos livros listadas com sucesso!", publicacaoLivroDTOS));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        Publicacao_livroDTO publicacaoLivroDTO = publicacaoLivroService.listById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK, "A publicação do livro encontrada com sucesso!", publicacaoLivroDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Publicacao_livro publicacaoLivro) {
        Publicacao_livroDTO publicacaoLivroDTO = publicacaoLivroService.save(publicacaoLivro);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "A publicação do livro cadastrada com sucesso!", publicacaoLivroDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Publicacao_livro publicacaoLivro) {
        Publicacao_livroDTO publicacaoLivroDTO = publicacaoLivroService.update(id, publicacaoLivro);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "A publicação do livro alterada com sucesso!", publicacaoLivroDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = publicacaoLivroService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.CREATED, "A publicação do livro foi excluida com sucesso!"));
    }
}

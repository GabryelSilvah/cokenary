package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.CategoriaDTO;
import com.receitas.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/receitas/categoria")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;


    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<CategoriaDTO> listaCategoriasDTO = categoriaService.listAll();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseJson(HttpStatus.OK,"Categorias listadas com sucesso", listaCategoriasDTO));
    }
}

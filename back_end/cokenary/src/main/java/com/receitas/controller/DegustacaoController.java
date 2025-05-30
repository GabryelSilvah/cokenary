package com.receitas.controller;

import com.receitas.service.DegustacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/degustacao")
public class DegustacaoController {

    @Autowired
    private DegustacaoService degustacaoService;
}

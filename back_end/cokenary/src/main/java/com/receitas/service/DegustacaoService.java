package com.receitas.service;

import com.receitas.repository.DegustacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DegustacaoService {

    @Autowired
    private DegustacaoRepository degustacaoRepository;
}

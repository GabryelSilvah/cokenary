package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.ReceitaDTO;
import com.receitas.model.Receita;
import com.receitas.repository.ReceitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public ResponseJson listAll() {

        List<Receita> receitas = receitaRepository.findAll();
        List<ReceitaDTO> receitasDTOList = new ArrayList<>(); //Inicializando lista de funcionárioDTO

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < receitas.size(); i++) {
            ReceitaDTO receitaDTO = new ReceitaDTO(
                    receitas.get(i).getId_receita(),
                    receitas.get(i).getNome_receita(),
                    receitas.get(i).getCategoria_id().getNome_categoria(),
                    receitas.get(i).getCozinheiro_id().getNome(),
                    receitas.get(i).getModo_preparo()
            );
            receitasDTOList.add(receitaDTO);//Adiciona na lista DTO
        }
        return new ResponseJson(HttpStatus.OK, "Receitas listadas com sucesso!", receitasDTOList);
    }
}

package com.receitas.service;

import com.receitas.dto.CategoriaDTO;
import com.receitas.model.Categoria;
import com.receitas.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaDTO> listAll() {

        //Buscando categorias
        List<Categoria> listaCategorias = categoriaRepository.findAll();
        List<CategoriaDTO> listaCategoriasDTO = new ArrayList<>();

        //Convertendo lista de categorias para categoriasDTO
        for (int i = 0; i < listaCategorias.size(); i++) {
            listaCategoriasDTO.add(
                    new CategoriaDTO(listaCategorias.get(i).getId_cat(), listaCategorias.get(i).getNome_categoria())
            );

        }

        return listaCategoriasDTO;
    }
}

package com.receitas.service;

import com.receitas.dto.CategoriaDTO;
import com.receitas.exception.CategoriaExistsException;
import com.receitas.model.Categoria;
import com.receitas.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public CategoriaDTO save(Categoria categoria) {
        //Buscando categoria com o nome passado
        Optional<Categoria> categoriaEncontrada = categoriaRepository.findByName(categoria.getNome_categoria());

        //Validando se nome da categoria já existe
        if (categoriaEncontrada.isPresent()) {
            throw new CategoriaExistsException("A categoria (" + categoria.getNome_categoria() + ") já existe");
        }

        //Salvando na base de dados
        Categoria categoriaSalva = categoriaRepository.save(categoria);

        //Retornando categoria no formato DTO
        return new CategoriaDTO(
                categoriaSalva.getId_cat(),
                categoriaSalva.getNome_categoria()
        );

    }

}

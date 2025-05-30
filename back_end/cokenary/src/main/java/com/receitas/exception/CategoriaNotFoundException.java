package com.receitas.exception;

public class CategoriaNotFoundException extends RuntimeException {

    public CategoriaNotFoundException() {
        super("Categoria não encontrada");
    }

    public CategoriaNotFoundException(String message) {
        super(message);
    }

}


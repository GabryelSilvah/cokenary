package com.receitas.exception;

public class CategoriaExistsException extends RuntimeException {

    public CategoriaExistsException() {
        super("Nome da categoria já existe");
    }

    public CategoriaExistsException(String message) {
        super(message);
    }

}


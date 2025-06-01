package com.receitas.exception;

public class RestauranteExistsException extends RuntimeException {

    public RestauranteExistsException() {
        super("Restaurante já existe com este nome");
    }

    public RestauranteExistsException(String message) {
        super(message);
    }
}


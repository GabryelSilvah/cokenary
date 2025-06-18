package com.receitas.exception;

public class RestauranteNotFoundException extends RuntimeException {

    public RestauranteNotFoundException() {
        super("Restaurante não encontrado");
    }

    public RestauranteNotFoundException(String message) {
        super(message);
    }
}

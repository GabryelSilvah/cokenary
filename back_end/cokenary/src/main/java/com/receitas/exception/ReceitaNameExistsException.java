package com.receitas.exception;

public class ReceitaNameExistsException extends RuntimeException {

    public ReceitaNameExistsException() {
        super("Já uma receita associada a esse nome");
    }

    public ReceitaNameExistsException(String message) {
        super(message);
    }

}


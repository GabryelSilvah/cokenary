package com.receitas.exception;

public class CozinheiroException extends RuntimeException {

    public CozinheiroException() {
        super("Nenhum cozinheiro encontrado");
    }

    public CozinheiroException(String message) {
        super(message);
    }

}


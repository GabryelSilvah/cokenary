package com.receitas.exception;

public class RegistroNotFoundException extends RuntimeException {

    public RegistroNotFoundException() {
        super("Registo não encontrada na base de dados");
    }

    public RegistroNotFoundException(String message) {
        super(message);
    }

}


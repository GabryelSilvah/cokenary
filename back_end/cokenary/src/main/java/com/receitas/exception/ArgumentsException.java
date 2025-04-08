package com.receitas.exception;

public class ArgumentsException extends RuntimeException {

    public ArgumentsException() {
        super("Insira todos os campos necessarios(email, senha, role)");
    }

    public ArgumentsException(String message) {
        super(message);
    }
}


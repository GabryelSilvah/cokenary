package com.receitas.exception;

public class FuncionarioNotFoundException extends RuntimeException {

    public FuncionarioNotFoundException() {
        super("Funcionário não encontrado");
    }

    public FuncionarioNotFoundException(String message) {
        super(message);
    }

}


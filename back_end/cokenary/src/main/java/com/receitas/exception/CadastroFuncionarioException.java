package com.receitas.exception;

public class CadastroFuncionarioException extends RuntimeException {

    public CadastroFuncionarioException() {
        super("Falha ao tentar cadastrar funcionário");
    }

    public CadastroFuncionarioException(String message) {
        super(message);
    }

}


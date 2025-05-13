package com.receitas.exception;

public class UserExitsException extends RuntimeException {

    public UserExitsException() {
        super("Usuário já existe");
    }

    public UserExitsException(String message) {
        super(message);
    }

}


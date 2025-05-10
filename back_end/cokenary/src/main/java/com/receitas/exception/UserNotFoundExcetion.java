package com.receitas.exception;

public class UserNotFoundExcetion extends RuntimeException {

    public UserNotFoundExcetion() {
        super("Usuário não encontrado");
    }

    public UserNotFoundExcetion(String message) {
        super(message);
    }
}
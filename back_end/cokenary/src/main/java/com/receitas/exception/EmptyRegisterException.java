package com.receitas.exception;

public class EmptyRegisterException extends RuntimeException {

    public EmptyRegisterException() {
        super("Alguma informação não foi inserida");
    }

    public EmptyRegisterException(String message) {
        super(message);
    }

}


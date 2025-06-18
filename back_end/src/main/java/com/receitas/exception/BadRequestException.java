package com.receitas.exception;

public class BadRequestException extends RuntimeException {

    public BadRequestException() {
        super("Alguma informação foi inserida de forma incorreta");
    }

    public BadRequestException(String message) {
        super(message);
    }

}


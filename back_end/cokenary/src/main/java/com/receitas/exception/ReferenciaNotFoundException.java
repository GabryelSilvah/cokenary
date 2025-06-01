package com.receitas.exception;

public class ReferenciaNotFoundException extends RuntimeException {

    public ReferenciaNotFoundException() {
        super("Referência não encontrada");
    }

    public ReferenciaNotFoundException(String message) {
        super(message);
    }
}

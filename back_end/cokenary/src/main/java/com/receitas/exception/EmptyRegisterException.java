package com.receitas.exception;

public class EmptyRegisterException extends RuntimeException {

    public EmptyRegisterException() {
        super("Alguma informação não foi inserida");
    }

    public EmptyRegisterException(String message) {
        super(message);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

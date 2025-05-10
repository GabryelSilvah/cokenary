package com.receitas.exception;

public class UserExitsException extends RuntimeException {

    public UserExitsException() {
        super("Usuário já existe");
    }

    public UserExitsException(String message) {
        super(message);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

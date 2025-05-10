package com.receitas.exception;

public class ArgumentsException extends RuntimeException {

    public ArgumentsException() {
        super("Insira todos os campos necessarios(email, senha, role)");
    }

    public ArgumentsException(String message) {
        super(message);
    }
<<<<<<< HEAD
}
=======
}

>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

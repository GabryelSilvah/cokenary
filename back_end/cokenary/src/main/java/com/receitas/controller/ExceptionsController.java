package com.receitas.controller;

import com.receitas.exception.*;
import com.receitas.exception.errorResponse.ErrorReponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class ExceptionsController {

    /*
    * Essa classe serve para padronizar o formato da messagem de erro enviado
    * no formato json.
    * Exemplo de resposta json:
    *
    *   "status": 400,
    *   "message": "Falha, o nome da receita inserido já existe (Sorvete limao 74)",
    *   "timeStamp": "2025-05-30T04:46:52.621628800Z"
    *
    * */

    //Usuário não encontrado
    @ExceptionHandler(UserNotFoundExcetion.class)
    public ResponseEntity<?> userNotFoundHandler(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorReponse);
    }

    //Envio de informações incompletas
    @ExceptionHandler(EmptyRegisterException.class)
    public ResponseEntity<?> emptyRegisterHandler(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorReponse);
    }

    //Nome de usuário já existe
    @ExceptionHandler(UserExitsException.class)
    public ResponseEntity<?> userExitsrHandler(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }

    //Receita não encontrada
    @ExceptionHandler(ReceitaNotFoundException.class)
    public ResponseEntity<?> receitaNotFound(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorReponse);
    }

    //Nome da receita inserido já existe na base de dados
    @ExceptionHandler(ReceitaNameExistsException.class)
    public ResponseEntity<?> receitaNameExists(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }

    //Categoria não existe
    @ExceptionHandler(CategoriaNotFoundException.class)
    public ResponseEntity<?> categoriaNotFound(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorReponse);
    }

    //Categoria já existe
    @ExceptionHandler(CategoriaExistsException.class)
    public ResponseEntity<?> categoriaExists(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }

    //Funcionário não existe
    @ExceptionHandler(FuncionarioNotFoundException.class)
    public ResponseEntity<?> funcionarioNotFound(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorReponse);
    }


    @ExceptionHandler(RegistroNotFoundException.class)
    public ResponseEntity<?> registroNotFound(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorReponse);
    }

    @ExceptionHandler(RegistroExistsException.class)
    public ResponseEntity<?> registroExists(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }

    @ExceptionHandler(CozinheiroException.class)
    public ResponseEntity<?> cozinheiroException(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }

    //Erros ocasionados por dados ou estrutura incorretos do cliente
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> badRequestException(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }


}




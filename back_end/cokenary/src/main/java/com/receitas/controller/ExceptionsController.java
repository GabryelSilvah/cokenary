package com.receitas.controller;

import com.receitas.exception.EmptyRegisterException;
import com.receitas.exception.UserExitsException;
import com.receitas.exception.UserNotFoundExcetion;
import com.receitas.exception.errorResponse.ErrorReponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class ExceptionsController {

    @ExceptionHandler(UserNotFoundExcetion.class)
    public ResponseEntity<?> userNotFoundHandler(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.NOT_FOUND.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorReponse);
    }

    @ExceptionHandler(EmptyRegisterException.class)
    public ResponseEntity<?> emptyRegisterHandler(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorReponse);
    }

    @ExceptionHandler(UserExitsException.class)
    public ResponseEntity<?> userExitsrHandler(Exception exception) {
        ErrorReponse errorReponse = new ErrorReponse(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorReponse);
    }

}
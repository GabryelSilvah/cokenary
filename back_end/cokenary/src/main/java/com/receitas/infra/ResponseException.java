package com.receitas.infra;

import com.receitas.config.ResponseJson;
import com.receitas.exception.UserExitsException;
import com.receitas.exception.UserNotFoundExcetion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ResponseException extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserNotFoundExcetion.class)
    public ResponseEntity<?> userNotFound(UserNotFoundExcetion excetion) {
        return ResponseJson.build(HttpStatus.NOT_FOUND, excetion.getMessage());
    }

    @ExceptionHandler(UserExitsException.class)
    public ResponseEntity<?> userNotFound(UserExitsException excetion) {
        return ResponseJson.build(HttpStatus.BAD_REQUEST, excetion.getMessage());
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> userNotFound(Exception excetion) {
        return ResponseJson.build(HttpStatus.BAD_GATEWAY, excetion.getMessage());
    }


}

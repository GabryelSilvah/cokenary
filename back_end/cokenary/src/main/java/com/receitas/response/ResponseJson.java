package com.receitas.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

public class ResponseJson {

    public static ResponseEntity<Object> build(String message, HttpStatus status, Object objectResponse) {
        Map<String, Object> response = new HashMap<>();
        response.put("message",message);
        response.put("status",status.value());
        response.put("data",objectResponse);

        return ResponseEntity.status(status).body(response);

    }


    public static Map<String, Object>  buildNotResponseEntity(String message, HttpStatus status, Object objectResponse) {
        Map<String, Object> response = new HashMap<>();
        response.put("message",message);
        response.put("status",status.value());
        response.put("data",objectResponse);

        //return ResponseEntity.status(status).body(response);
        return response;
    }

}


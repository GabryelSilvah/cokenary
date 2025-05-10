package com.receitas.config;

public class ResponseToken {

    private int status;

    private String token;
    private String email;

    public ResponseToken(int status, String token, String email){
        this.status = status;
        this.token = token;
        this.email = email;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
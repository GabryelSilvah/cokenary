package com.receitas.config;

public class ResponseToken {

    private int status;

    private String token;
    private String email;

    private String cargo_usuario;

    private Long id_funcionario;

    public ResponseToken(int status, String token, String email, String cargo_usuario, Long id_funcionario){
        this.status = status;
        this.token = token;
        this.email = email;
        this.cargo_usuario = cargo_usuario;
        this.id_funcionario = id_funcionario;
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

    public String getCargo_usuario() {
        return cargo_usuario;
    }

    public void setCargo_usuario(String cargo_usuario) {
        this.cargo_usuario = cargo_usuario;
    }

    public Long getId_funcionario() {
        return id_funcionario;
    }

    public void setId_funcionario(Long id_funcionario) {
        this.id_funcionario = id_funcionario;
    }
}

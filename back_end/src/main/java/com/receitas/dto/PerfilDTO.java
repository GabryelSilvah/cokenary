package com.receitas.dto;

import java.util.Date;

public class PerfilDTO {

    private Long id_funcionario;
    private UsuarioFullDTO usuario;
    private String cargo_usuario;
    private Date data_admisao;
    private String foto_usuario;
    private int numero_receitas_feitas;
    private int numero_livros_publicados;
    private double media_avaliacoes;


    //Construtor
    public PerfilDTO() {
    }

    public PerfilDTO(UsuarioFullDTO usuario) {
        this.usuario = usuario;
    }

    public PerfilDTO(Long id_funcionario) {
        this.id_funcionario = id_funcionario;
    }

    public PerfilDTO(UsuarioFullDTO nome_usuario, String cargo_usuario, Date data_admisao, String foto_usuario, int numero_receitas_feitas, int numero_livros_publicados) {
        this.usuario = nome_usuario;
        this.cargo_usuario = cargo_usuario;
        this.data_admisao = data_admisao;
        this.foto_usuario = foto_usuario;
        this.numero_receitas_feitas = numero_receitas_feitas;
        this.numero_livros_publicados = numero_livros_publicados;
    }


    public PerfilDTO(Long id_funcionario, UsuarioFullDTO nome_usuario, String cargo_usuario, Date data_admisao, String foto_usuario, int numero_receitas_feitas, int numero_livros_publicados, double media_avaliacoes) {
        this.id_funcionario = id_funcionario;
        this.usuario = nome_usuario;
        this.cargo_usuario = cargo_usuario;
        this.data_admisao = data_admisao;
        this.foto_usuario = foto_usuario;
        this.numero_receitas_feitas = numero_receitas_feitas;
        this.numero_livros_publicados = numero_livros_publicados;
        this.media_avaliacoes = media_avaliacoes;
    }

    //Gets e sets


    public Long getId_funcionario() {
        return id_funcionario;
    }

    public void setId_funcionario(Long id_funcionario) {
        this.id_funcionario = id_funcionario;
    }

    public UsuarioFullDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioFullDTO usuario) {
        this.usuario = usuario;
    }

    public String getCargo_usuario() {
        return cargo_usuario;
    }

    public void setCargo_usuario(String cargo_usuario) {
        this.cargo_usuario = cargo_usuario;
    }

    public Date getData_admisao() {
        return data_admisao;
    }

    public void setData_admisao(Date data_admisao) {
        this.data_admisao = data_admisao;
    }

    public String getFoto_usuario() {
        return foto_usuario;
    }

    public void setFoto_usuario(String foto_usuario) {
        this.foto_usuario = foto_usuario;
    }

    public int getNumero_receitas_feitas() {
        return numero_receitas_feitas;
    }

    public void setNumero_receitas_feitas(int numero_receitas_feitas) {
        this.numero_receitas_feitas = numero_receitas_feitas;
    }

    public int getNumero_livros_publicados() {
        return numero_livros_publicados;
    }

    public void setNumero_livros_publicados(int numero_livros_publicados) {
        this.numero_livros_publicados = numero_livros_publicados;
    }

    public double getMedia_avaliacoes() {
        return media_avaliacoes;
    }

    public void setMedia_avaliacoes(double media_avaliacoes) {
        this.media_avaliacoes = media_avaliacoes;
    }
}

package com.receitas.model;

import com.receitas.dto.AuthDTO;
import com.receitas.dto.Funcionario_usuarioDTO;
import com.receitas.dto.UsuarioDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Informe um email")
    private String email;
    @NotNull(message = "Informe uma senha")
    private String senha;

    @NotNull(message = "Informe uma Role")
    @ManyToOne
    @JoinColumn(name = "role")
    private Cargo role;

    @OneToOne
    @JoinColumn(name = "fk_funcionario")
    private Funcionario fk_funcionario;


    //Construtores
    public Usuario() {

    }

    public Usuario(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public Usuario(String email, String senha, Cargo role) {
        this.email = email;
        this.senha = senha;
        this.role = role;
    }

    public Usuario(AuthDTO authDTO) {
        this.email = authDTO.getEmail();
        this.senha = authDTO.getSenha();
        this.role = authDTO.getRole();
    }

    public Usuario(UsuarioDTO usuarioDTO) {
        this.email = usuarioDTO.email();
        this.role = usuarioDTO.role();
    }

    public Usuario(Funcionario_usuarioDTO funcionarioUsuarioDTO, Long id_funcionarios) {
        this.email = funcionarioUsuarioDTO.getNome_usuario();
        this.senha = funcionarioUsuarioDTO.getSenha_usuarios();
        this.role = funcionarioUsuarioDTO.getCargo();
        this.fk_funcionario = new Funcionario(id_funcionarios);
    }

    //Gets e Sets
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Cargo getRole() {
        return role;
    }

    public void setRole(Cargo role) {
        this.role = role;
    }

    public Funcionario getFk_funcionario() {
        return fk_funcionario;
    }

    public void setFk_funcionario(Funcionario fk_funcionario) {
        this.fk_funcionario = fk_funcionario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.emptyList();
        //return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public String getPassword() {
        return this.getSenha();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
package com.receitas.controller;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.dto.FuncionarioChegadaDTO;
import com.receitas.dto.FuncionarioSaidaDTO;
import com.receitas.dto.Funcionario_usuarioDTO;
import com.receitas.model.Funcionario;
import com.receitas.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "http://localhost:3000")
public class FuncionarioController {
    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/listar")
    public ResponseEntity<ResponseJson> listar() {
        List<Funcionario_usuarioDTO> listaFuncionariosDTO = funcionarioService.listAll();
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Funcionarios listadas com sucesso!", listaFuncionariosDTO));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<ResponseJson> buscar_pelo_id(@PathVariable("id") Long id) {
        Funcionario_usuarioDTO funcionarioDTO = funcionarioService.listById(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Funcionario encontrado com sucesso!", funcionarioDTO));
    }

    @GetMapping("/byCargo/{nome_cargo}")
    public ResponseEntity<ResponseJson> buscar_pelo_nome_cargo(@PathVariable("nome_cargo") String nome_cargo) {
        List<FuncionarioSaidaDTO> funcionarioDTO = funcionarioService.listByCargo(nome_cargo);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.OK, "Funcionarios encontrados com sucesso!", funcionarioDTO));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<ResponseJson> cadastrar(@RequestBody Funcionario_usuarioDTO funcionario) {
        Funcionario_usuarioDTO funcionarioDTO = funcionarioService.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Funcionario cadastrado com sucesso!", funcionarioDTO));
    }

    @PostMapping("/v2/cadastrar")
    public ResponseEntity<ResponseJson> cadastrarCompleto(@RequestBody FuncionarioChegadaDTO funcionario) {
        System.out.println("Testando chegada");
        FuncionarioDTO funcionarioDTO = funcionarioService.saveFull(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Funcionario cadastrado com sucesso!", funcionarioDTO));
    }

    @PutMapping("/alterar/{id}")
    public ResponseEntity<ResponseJson> alterar(@PathVariable("id") Long id, @RequestBody Funcionario funcionario) {
        FuncionarioDTO funcionarioDTO = funcionarioService.update(id, funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseJson(HttpStatus.CREATED, "Funcionario alterado com sucesso!", funcionarioDTO));
    }

    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<ResponseJson> excluir(@PathVariable("id") Long id) {
        Boolean responseDelete = funcionarioService.delete(id);
        return ResponseEntity.ok().body(new ResponseJson(HttpStatus.CREATED, "Funcionario excluido com sucesso!"));
    }
}
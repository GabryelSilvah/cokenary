package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.exception.BadRequestException;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;
import com.receitas.repository.CargoRepository;
import com.receitas.repository.FuncionarioRepository;
import com.receitas.util.FotoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcioRepository;

    @Autowired
    private CargoRepository cargoRepository;

    public List<FuncionarioDTO> listAll() {

        //Buscando dados do funcionário
        List<Funcionario> funcionariosEncontrados = funcioRepository.findAllJoin();

        //Inicializando lista de funcionárioDTO
        List<FuncionarioDTO> listaFuncionariosDTO = new ArrayList<>();

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < funcionariosEncontrados.size(); i++) {
            FuncionarioDTO funcionario = new FuncionarioDTO(
                    funcionariosEncontrados.get(i).getId_func(),
                    funcionariosEncontrados.get(i).getNome(),
                    funcionariosEncontrados.get(i).getRg(),
                    funcionariosEncontrados.get(i).getDt_adm(),
                    funcionariosEncontrados.get(i).getSalario(),
                    funcionariosEncontrados.get(i).getCargo().getNome(),
                    funcionariosEncontrados.get(i).getImagem_perfil()
            );

            //Adiciona na lista DTO
            listaFuncionariosDTO.add(funcionario);
        }

        return listaFuncionariosDTO;
    }

    public FuncionarioDTO listById(Long id) {

        //Buscando funcionário pelo ID
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);

        //Validando se algum funcionário foi encontrado
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Funcionário de ID (" + id + ") não foi encontrado");
        }

        return new FuncionarioDTO(
                funcionarioEncontrado.get().getId_func(),
                funcionarioEncontrado.get().getNome(),
                funcionarioEncontrado.get().getRg(),
                funcionarioEncontrado.get().getDt_adm(),
                funcionarioEncontrado.get().getSalario(),
                funcionarioEncontrado.get().getCargo().getNome(),
                funcionarioEncontrado.get().getImagem_perfil()
        );
    }

    public FuncionarioDTO save(Funcionario funcionario) {

        //Validando se já existe um funcionário com esse nome
        Funcionario funcionarioEncontrado = funcioRepository.findByNome(funcionario.getNome());
        if (funcionarioEncontrado != null) {
            throw new RegistroExistsException("Falha, já existe um funcionário com esse nome");
        }

        //Buscando cargo
        Optional<Cargo> cargoEncontrado = cargoRepository.findById(funcionario.getCargo().getId());

        //Validando se cargo existe
        if (cargoEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Falha, o cargo com ID (" + funcionario.getCargo().getId() + ") não foi informado");
        }

        //Convertendo rg para String, para conta os caracteres
        String rgString = funcionario.getRg().toString();

        //Validando se rg foi inserido de forma correta
        if (!(rgString.length() >= 7 && rgString.length() <= 9)) {
            throw new BadRequestException("O número de rg deve possuir entre 7 e 9 dígitos, sem caracteres especiais. Foram informados (" + rgString.length() + ") dígitos");
        }

        //Cadastrando funcionário no sistema
        Funcionario funcionarioSalvo = funcioRepository.save(funcionario);


        //Transformando em DTO
        return new FuncionarioDTO(
                funcionarioSalvo.getId_func(),
                funcionarioSalvo.getNome(),
                funcionarioSalvo.getRg(),
                funcionarioSalvo.getDt_adm(),
                funcionarioSalvo.getSalario(),
                cargoEncontrado.get().getNome(),
                funcionarioSalvo.getImagem_perfil()
        );
    }

    public FuncionarioDTO update(Long id, Funcionario funcionario) {

        //Buscando funcionário
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);

        //Validando se foi encontrado algum funcionário com o ID informado
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Falha, funcionário com (" + id + ") não foi encontrado");
        }

        //Buscando cargo
        Optional<Cargo> cargoEncontrado = cargoRepository.findById(funcionario.getCargo().getId());


        //Validando se cargo existe
        if (cargoEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Falha, o cargo com ID (" + funcionario.getCargo().getId() + ") não foi informado");
        }

        //Setando informações no funcionário encontrado
        Funcionario funcionarioInsert = funcionarioEncontrado.get();
        funcionarioInsert.setNome(funcionario.getNome());
        funcionarioInsert.setRg(funcionario.getRg());
        funcionarioInsert.setDt_adm(funcionario.getDt_adm());
        funcionarioInsert.setSalario(funcionario.getSalario());
        funcionarioInsert.setCargo(funcionario.getCargo());

        //Salvando no banco as alterações
        Funcionario funcionarioAlterado = funcioRepository.save(funcionarioInsert);


        //Convertendo em DTO para enviar na request
        return new FuncionarioDTO(
                funcionarioAlterado.getId_func(),
                funcionarioAlterado.getNome(),
                funcionarioAlterado.getRg(),
                funcionarioAlterado.getDt_adm(),
                funcionarioAlterado.getSalario(),
                cargoEncontrado.get().getNome(),
                funcionarioAlterado.getImagem_perfil()
        );

    }

    public Boolean delete(Long id) {

        //Verificando se funcionário existe
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Falha, funcionário com ID (" + id + ") não foi encontrado");
        }

        //Excluindo fuuncionário
        funcioRepository.delete(funcionarioEncontrado.get());
        return true;
    }

    public String salvarFotoFuncionario(MultipartFile arquivo, Long id) {

        return "";
    }

}
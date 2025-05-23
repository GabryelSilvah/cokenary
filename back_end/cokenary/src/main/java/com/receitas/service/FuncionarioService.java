package com.receitas.service;

import com.receitas.dto.FuncionarioDTO;
import com.receitas.exception.CadastroFuncionarioException;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;
import com.receitas.repository.CargoRepository;
import com.receitas.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<FuncionarioDTO> funcionariosDTO = new ArrayList<>(); //Inicializando lista de funcionárioDTO

        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < funcionariosEncontrados.size(); i++) {
            FuncionarioDTO funcionario = new FuncionarioDTO(
                    funcionariosEncontrados.get(i).getNome(),
                    funcionariosEncontrados.get(i).getRg(),
                    funcionariosEncontrados.get(i).getDt_adm(),
                    funcionariosEncontrados.get(i).getSalario(),
                    funcionariosEncontrados.get(i).getCargo().getNome()
            );
            funcionariosDTO.add(funcionario);//Adiciona na lista DTO
        }
        return funcionariosDTO;
    }

    public FuncionarioDTO listById(Long id) {

        //Buscando funcionário pelo ID
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);

        //Validando se algum funcionário foi encontrado, e transformando em DTO
        if (funcionarioEncontrado.isPresent()) {

            return new FuncionarioDTO(
                    funcionarioEncontrado.get().getNome(),
                    funcionarioEncontrado.get().getRg(),
                    funcionarioEncontrado.get().getDt_adm(),
                    funcionarioEncontrado.get().getSalario(),
                    funcionarioEncontrado.get().getCargo().getNome()
            );
        }

        return null;
    }

    public FuncionarioDTO saveFuncionario(Funcionario funcionario) {

        //Validando se já existe um funcionário com esse nome
        Funcionario funcionarioEncontrado = funcioRepository.findByNome(funcionario.getNome());
        if (funcionarioEncontrado != null) {
            throw new CadastroFuncionarioException("Falha, já existe um funcionário com esse nome");
        }

        //Validando se foi passado o ID do cargo
        if (funcionario.getCargo().getId() == null) {
            throw new CadastroFuncionarioException("Falha, o ID do cargo não foi informado");
        }

        //Pegando cargo pelo ID e validando se existe cargo com esse ID
        Optional<Cargo> cargo = cargoRepository.findById(funcionario.getCargo().getId());
        if (cargo.isEmpty()) {
            throw new CadastroFuncionarioException("Falha, nenhum cargo encontrado com o ID informado");
        }

        //Cadastrando funcionário no sistema
        Funcionario funcionarioSalvo = funcioRepository.save(funcionario);

        //Validando se funcionário foi salvo
        if (funcionarioSalvo == null) {
            throw new CadastroFuncionarioException("Falha, ocorreu uma falha ao tentar salvar o funcionário");
        }

        //Transformando em DTO
        return new FuncionarioDTO(
                funcionarioSalvo.getNome(),
                funcionarioSalvo.getRg(),
                funcionarioSalvo.getDt_adm(),
                funcionarioSalvo.getSalario(),
                cargo.get().getNome()
        );
    }

    public Optional<Funcionario> update(Long id, Funcionario funcionario) {
        Optional<Funcionario> funcionarioExiste = funcioRepository.findById(id);

        //Se existir um usuário com o ID informado,
        //então setamos os novos dados no objeto retornado da busca.
        //Com os dados setados a alteração é feita no banco
       if (funcionarioExiste.isPresent()) {
            Funcionario funcionarioInsert = funcionarioExiste.get();
            funcionarioInsert.setNome(funcionario.getNome());
            funcionarioInsert.setRg(funcionario.getRg());
            funcionarioInsert.setDt_adm(funcionario.getDt_adm());
            funcionarioInsert.setSalario(funcionario.getSalario());
            funcionarioInsert.setCargo(funcionario.getCargo());
            Funcionario funcionarioSalvo = funcioRepository.save(funcionarioInsert);
            return Optional.of(funcionarioSalvo);
        }
        return Optional.empty();
    }

    public String delete(Long id) {

        //Verificando se funcionário existe
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);
        if (funcionarioEncontrado.isEmpty()) {
            throw new CadastroFuncionarioException("Falha, nenhum funcionário encontrado com esse ID");
        }

        //Excluindo fuuncionário
        funcioRepository.delete(funcionarioEncontrado.get());
        return "";
    }
}
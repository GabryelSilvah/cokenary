package com.receitas.service;

import com.receitas.config.ResponseJson;
import com.receitas.dto.FuncionarioDTO;
import com.receitas.model.Cargo;
import com.receitas.model.Funcionario;
import com.receitas.repository.CargoRepository;
import com.receitas.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcioRepository;

    @Autowired
    private CargoRepository cargoRepository;

    private static final String CAMINHO_FOTO_PERFIl = "C:\\Users\\Gabryel Silvah\\Desktop\\ambiente_teste";

    public ResponseJson listAll() {

        //Buscando dados do funcionário
        List<Funcionario> funcionariosEncontrados = funcioRepository.findAllJoin();
        List<FuncionarioDTO> funcionariosDTO = new ArrayList<>(); //Inicializando lista de funcionárioDTO

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
            funcionariosDTO.add(funcionario);//Adiciona na lista DTO
        }
        return new ResponseJson(HttpStatus.OK, "Funcionários listados com sucesso!", funcionariosDTO);
    }

    public ResponseJson listById(Long id) {

        //Buscando funcionário pelo ID
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);

        //Validando se algum funcionário foi encontrado, e transformando em DTO
        if (funcionarioEncontrado.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Nenhum funcionário encontrado");
        }

        return new ResponseJson(HttpStatus.OK, "Funcionário encontrado com sucesso!",
                new FuncionarioDTO(
                        funcionarioEncontrado.get().getId_func(),
                        funcionarioEncontrado.get().getNome(),
                        funcionarioEncontrado.get().getRg(),
                        funcionarioEncontrado.get().getDt_adm(),
                        funcionarioEncontrado.get().getSalario(),
                        funcionarioEncontrado.get().getCargo().getNome(),
                        funcionarioEncontrado.get().getImagem_perfil()
                ));
    }

    public ResponseJson saveFuncionario(Funcionario funcionario) {

        //Validando se já existe um funcionário com esse nome
        Funcionario funcionarioEncontrado = funcioRepository.findByNome(funcionario.getNome());
        if (funcionarioEncontrado != null) {
            return new ResponseJson(HttpStatus.BAD_REQUEST, "Falha, já existe um funcionário com esse nome");
        }

        //Validando se foi passado o ID do cargo
        if (funcionario.getCargo().getId() == null) {
            return new ResponseJson(HttpStatus.BAD_REQUEST, "Falha, o ID do cargo não foi informado");
        }

        //Pegando cargo pelo ID e validando se existe cargo com esse ID
        Optional<Cargo> cargo = cargoRepository.findById(funcionario.getCargo().getId());
        if (cargo.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nenhum cargo encontrado com o ID informado");
        }

        //Cadastrando funcionário no sistema
        Funcionario funcionarioSalvo = funcioRepository.save(funcionario);

        //Validando se funcionário foi salvo
        if (funcionarioSalvo == null) {
            return new ResponseJson(HttpStatus.BAD_REQUEST, "Falha, ocorreu uma falha ao tentar salvar o funcionário");
        }

        //Transformando em DTO
        return new ResponseJson(HttpStatus.CREATED, "Funcionário cadastrado com sucesso", new FuncionarioDTO(
                funcionarioSalvo.getId_func(),
                funcionarioSalvo.getNome(),
                funcionarioSalvo.getRg(),
                funcionarioSalvo.getDt_adm(),
                funcionarioSalvo.getSalario(),
                cargo.get().getNome(),
                funcionarioSalvo.getImagem_perfil()
        ));
    }

    public ResponseJson update(Long id, Funcionario funcionario) {
        //Buscando funcionário
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);

        //Validando se foi encontrado algum funcionário com o ID informado
        if (funcionarioEncontrado.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nunhum funcinário encontrado com esse ID (" + id + ")");
        }


        //Pegando cargo pelo ID e validando se existe cargo com esse ID
        Optional<Cargo> cargo = cargoRepository.findById(funcionario.getCargo().getId());
        if (cargo.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nenhum cargo encontrado com o ID informado");
        }


        //Validando se cargo informado existe
        Optional<Cargo> cargoEncontrado = cargoRepository.findById(funcionario.getCargo().getId());
        if (cargoEncontrado.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, não foi encontrado nenhum cargo com ID (" + funcionario.getCargo().getId() + ") informado");
        }


        //Setando informações no funcionário encontrado
        Funcionario funcionarioInsert = funcionarioEncontrado.get();
        funcionarioInsert.setNome(funcionario.getNome());
        funcionarioInsert.setRg(funcionario.getRg());
        funcionarioInsert.setDt_adm(funcionario.getDt_adm());
        funcionarioInsert.setSalario(funcionario.getSalario());
        funcionarioInsert.setCargo(funcionario.getCargo());
        Funcionario funcionarioAlterado = funcioRepository.save(funcionarioInsert);

        //Convertendo em DTO para enviar na request
        FuncionarioDTO funcionarioDTOAlterado = new FuncionarioDTO(
                funcionarioAlterado.getId_func(),
                funcionarioAlterado.getNome(),
                funcionarioAlterado.getRg(),
                funcionarioAlterado.getDt_adm(),
                funcionarioAlterado.getSalario(),
                cargo.get().getNome(),
                funcionarioAlterado.getImagem_perfil()
        );

        return new ResponseJson(HttpStatus.CREATED, "Funcionário atualizado com sucesso!", funcionarioDTOAlterado);
    }

    public ResponseJson delete(Long id) {

        //Verificando se funcionário existe
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);
        if (funcionarioEncontrado.isEmpty()) {
            return new ResponseJson(HttpStatus.NOT_FOUND, "Falha, nenhum funcionário encontrado com esse ID (" + id + ")");
        }

        //Excluindo fuuncionário
        funcioRepository.delete(funcionarioEncontrado.get());
        return new ResponseJson(HttpStatus.OK, "Funcionário excluido com sucesso!");
    }

    public ResponseJson salvarFotoFuncionario(MultipartFile arquivo, Long id) throws IOException {
        if (arquivo == null) {
            throw new NullPointerException("Nenhuma foto de perfil enviada");
        }

        File destinoArquivo = new File(CAMINHO_FOTO_PERFIl + File.separator + arquivo.getOriginalFilename());

        if (!Objects.equals(destinoArquivo.getParent(), CAMINHO_FOTO_PERFIl)) {
            throw new SecurityException("Arquivo não suportado");
        }

        Files.copy(arquivo.getInputStream(), destinoArquivo.toPath(), StandardCopyOption.REPLACE_EXISTING);


        //Salvar caminho da imagem de perfil no banco de dados do funcionário
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);
        Funcionario funcionarioInsert = funcionarioEncontrado.get();
        funcionarioInsert.setImagem_perfil(arquivo.getOriginalFilename());
        funcioRepository.save(funcionarioInsert);


        return new ResponseJson(HttpStatus.OK, "Salvo com sucesso!");
    }

}
package com.receitas.service;

import com.receitas.dto.*;
import com.receitas.exception.BadRequestException;
import com.receitas.exception.RegistroExistsException;
import com.receitas.exception.RegistroNotFoundException;
import com.receitas.exception.UserExitsException;
import com.receitas.model.*;
import com.receitas.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcioRepository;

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private ReferenciaRepository referenciaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder criptografia;

    @Autowired
    private MetricasService metricasService;

    @Autowired
    private MetricasRepository metricasRepository;


    public List<Funcionario_usuarioDTO> listAll() {

        //Buscando dados do funcionário
        List<Funcionario> funcionariosEncontrados = funcioRepository.findAll();


        //Inicializando lista de funcionárioDTO
        List<Funcionario_usuarioDTO> listaFuncionariosDTO = new ArrayList<>();


        //Pecorrendo lista de funcionário, transformando em DTOs e adicionando na lista funcionariosDTO
        for (int i = 0; i < funcionariosEncontrados.size(); i++) {

            //Buscar usuário vinculado ao funcuinário
            Optional<Usuario> usuarioEncontrado = usuarioRepository.findByFuncionario(funcionariosEncontrados.get(i).getId_func());
            if (usuarioEncontrado.isEmpty()) {
                throw new RegistroNotFoundException("Nenhum usuário vinculado a esse funcionário de ID (" + funcionariosEncontrados.get(i).getId_func() + ")");
            }

            //Buscando lista de restaurantes
            List<Restaurante> listaRestaurantes = referenciaRepository.findByFuncionario(funcionariosEncontrados.get(i).getId_func());


            Funcionario_usuarioDTO funcionario = new Funcionario_usuarioDTO(
                    funcionariosEncontrados.get(i).getId_func(),
                    funcionariosEncontrados.get(i).getNome(),
                    funcionariosEncontrados.get(i).getRg(),
                    funcionariosEncontrados.get(i).getDt_adm(),
                    funcionariosEncontrados.get(i).getSalario(),
                    funcionariosEncontrados.get(i).getCargo(),
                    funcionariosEncontrados.get(i).getImagem_perfil(),
                    listaRestaurantes,
                    usuarioEncontrado.get().getEmail(),
                    funcionariosEncontrados.get(i).getStatusFunc(),
                    funcionariosEncontrados.get(i).getData_update()
            );

            //Adiciona na lista DTO
            listaFuncionariosDTO.add(funcionario);
        }

        return listaFuncionariosDTO;
    }

    public Funcionario_usuarioDTO listById(Long id) {

        //Buscando funcionário pelo ID
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);

        //Validando se algum funcionário foi encontrado
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Funcionário de ID (" + id + ") não foi encontrado");
        }

        List<Restaurante> listaRestaurantes = referenciaRepository.findByFuncionario(id);

        //Buscar usuário vinculado ao funcuinário
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByFuncionario(funcionarioEncontrado.get().getId_func());
        if (usuarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Nenhum usuário vinculado a esse funcionário de ID (" + funcionarioEncontrado.get().getId_func() + ")");
        }

        return new Funcionario_usuarioDTO(
                funcionarioEncontrado.get().getId_func(),
                funcionarioEncontrado.get().getNome(),
                funcionarioEncontrado.get().getRg(),
                funcionarioEncontrado.get().getDt_adm(),
                funcionarioEncontrado.get().getSalario(),
                funcionarioEncontrado.get().getCargo(),
                funcionarioEncontrado.get().getImagem_perfil(),
                listaRestaurantes,
                usuarioEncontrado.get().getEmail(),
                funcionarioEncontrado.get().getStatusFunc(),
                funcionarioEncontrado.get().getData_update()
        );
    }

    public List<FuncionarioSaidaDTO> listByCargo(String nome_cargo) {

        //Buscando funcionário pelo ID
        List<Funcionario> funcionariosEncontrados = funcioRepository.findByNomeCargo(nome_cargo);

        //Validando se algum funcionário foi encontrado
        if (funcionariosEncontrados.isEmpty()) {
            throw new RegistroNotFoundException("Nenhum funcioário de cargo (" + nome_cargo + ") foi encontrado");
        }

        List<FuncionarioSaidaDTO> listaFuncionarios = new ArrayList<>();

        for (int i = 0; i < funcionariosEncontrados.size(); i++) {
            listaFuncionarios.add(new FuncionarioSaidaDTO(
                    funcionariosEncontrados.get(i).getId_func(),
                    funcionariosEncontrados.get(i).getNome(),
                    funcionariosEncontrados.get(i).getRg(),
                    funcionariosEncontrados.get(i).getDt_adm(),
                    funcionariosEncontrados.get(i).getSalario(),
                    funcionariosEncontrados.get(i).getCargo().getNome(),
                    funcionariosEncontrados.get(i).getImagem_perfil()
            ));
        }

        return listaFuncionarios;
    }

    @Transactional
    public Funcionario_usuarioDTO save(Funcionario_usuarioDTO funcionario) {

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
        Funcionario novoFuncionario = new Funcionario(funcionario);
        Funcionario funcionarioSalvo = funcioRepository.save(novoFuncionario);


        //Validando se já existe esse nome de usuário cadastrado
        Optional<Usuario> usuario = usuarioRepository.findByEmail(funcionario.getNome_usuario());
        if (usuario.isPresent()) {
            throw new UserExitsException("Nome de usuário já está em uso por outra conta");
        }

        //Cadastrando usuário
        String senhaSegura = criptografia.encode(funcionario.getSenha_usuarios());
        funcionario.setSenha_usuarios(senhaSegura);
        Usuario novoUsuario = new Usuario(funcionario, funcionarioSalvo.getId_func());
        usuarioRepository.save(novoUsuario);


        //Cadastrando metricas
        MetricasDTO novaMetricaDTO = new MetricasDTO(0, 0, 0, new FuncionarioSaidaDTO(funcionarioSalvo.getId_func()));
        MetricasDTO metricaSalva = metricasService.save(novaMetricaDTO);


        //Cadastrando referência de restaurante associado ao funcionário
        for (int i = 0; i < funcionario.getListaRestaurante().size(); i++) {
            Referencia novaReferencia = new Referencia(funcionarioSalvo, funcionario.getListaRestaurante().get(i), new Date(), null);
            referenciaRepository.save(novaReferencia);
        }


        //Buscando lista de restaurantes
        List<Restaurante> listaRestaurantes = referenciaRepository.findByFuncionario(funcionarioSalvo.getId_func());


        //Buscando usuário vinculado ao funcuinário
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByFuncionario(funcionarioSalvo.getId_func());
        if (usuarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Nenhum usuário vinculado a esse funcionário de ID (" + funcionarioSalvo.getId_func() + ")");
        }

        //Transformando em DTO
        return new Funcionario_usuarioDTO(
                funcionarioSalvo.getId_func(),
                funcionarioSalvo.getNome(),
                funcionarioSalvo.getRg(),
                funcionarioSalvo.getDt_adm(),
                funcionarioSalvo.getSalario(),
                cargoEncontrado.get(),
                funcionarioSalvo.getImagem_perfil(),
                listaRestaurantes,
                usuarioEncontrado.get().getEmail(),
                funcionarioSalvo.getStatusFunc(),
                funcionarioSalvo.getData_update()
        );
    }

    @Transactional
    public FuncionarioDTO saveFull(FuncionarioChegadaDTO funcionario) {


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
        Funcionario funcionarioSalvo = funcioRepository.save(new Funcionario(funcionario));


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

    @Transactional
    public Boolean delete(Long id) {

        //Verificando se funcionário existe
        Optional<Funcionario> funcionarioEncontrado = funcioRepository.findById(id);
        if (funcionarioEncontrado.isEmpty()) {
            throw new RegistroNotFoundException("Falha, funcionário com ID (" + id + ") não foi encontrado");
        }

        //Excluindo acesso de usuário do funcionário
        //boolean respU = usuarioService.deleteByFuncionario(id);
        usuarioRepository.deleteByFk_funcionario(id);


        //Excluindo metricas de funcionário
        //boolean respM = metricasService.deleteByFuncionario(id);
        metricasRepository.deleteByFkFuncionario(id);


        //Excluindo fuuncionário
        funcioRepository.deleteByIdOn(id);

        return true;
    }

    public String salvarFotoFuncionario(MultipartFile arquivo, Long id) {

        return "";
    }

}
package com.receitas.service;

import com.receitas.dto.CargoDTO;
import com.receitas.model.Cargo;
import com.receitas.repository.CargoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")

public class CargoServiceTest {

    @InjectMocks
    private CargoService cargoService;

    @Mock
    private CargoRepository cargoRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveListarTodosOsCargos() {
        List<Cargo> cargos = List.of(
                new Cargo(1L, "Administrador"),
                new Cargo(2L, "Cozinheiro"),
                new Cargo(3L, "Degustador")
        );

        when(cargoRepository.findAll()).thenReturn(cargos);

        List<CargoDTO> resultado = cargoService.listAll();

        assertThat(resultado).hasSize(3);
        assertThat(resultado.get(0).nome()).isEqualTo("Administrador");
        System.out.print(resultado);
    }

    @Test
    void deveBuscarPorIdComSucesso() {
        Cargo cargo = new Cargo(1L, "Editor");

        when(cargoRepository.findById(1L)).thenReturn(Optional.of(cargo));

        CargoDTO dto = cargoService.listById(1L);

        assertThat(dto.nome()).isEqualTo("Editor");
        System.out.print(dto);
    }

    @Test
    void deveDeletarCargoExistente() {
        Cargo existente = new Cargo(1L, "Cozinheiro");

        when(cargoRepository.findById(1L)).thenReturn(Optional.of(existente));

        Boolean result = cargoService.delete(1L);

        verify(cargoRepository, times(1)).deleteById(1L);
        assertThat(result).isTrue();
    }
}

package com.receitas.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

public class FotoUtil {

    private String caminhoDestinoFoto;

    public String salvarFoto(MultipartFile arquivo) throws IOException {

        //Validando se existe arquivo
        if (arquivo == null) {
            throw new NullPointerException("Nenhuma foto adicionada");
        }

        //Setando caminho de destino da imagem
        File destinoArquivo = new File(caminhoDestinoFoto + File.separator + arquivo.getOriginalFilename());


        if (!Objects.equals(destinoArquivo.getParent(), caminhoDestinoFoto)) {
            throw new SecurityException("Arquivo não suportado");
        }

        //Salvando foto no diretório de destino
        Files.copy(arquivo.getInputStream(), destinoArquivo.toPath(), StandardCopyOption.REPLACE_EXISTING);

        //Retornando nome da imagem
       return  arquivo.getOriginalFilename();
    }

    public String getCaminhoDestinoFoto() {
        return caminhoDestinoFoto;
    }

    public void setCaminhoDestinoFoto(String caminhoDestinoFoto) {
        this.caminhoDestinoFoto = caminhoDestinoFoto;
    }
}

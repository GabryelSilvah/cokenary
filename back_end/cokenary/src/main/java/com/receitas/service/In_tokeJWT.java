package com.receitas.service;

import com.receitas.model.Usuario_Model;

import java.time.Instant;


public interface In_tokeJWT {


    String createToken(Usuario_Model usuarioModel);

    String validateToken(String token);

    Instant generateTimeFinal();


<<<<<<< HEAD
}
=======
}
>>>>>>> eb4a1a3f139953775bb779a85dd1629c8f97a62f

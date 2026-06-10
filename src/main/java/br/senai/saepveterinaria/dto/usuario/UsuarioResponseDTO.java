package br.senai.saepveterinaria.dto.usuario;

import br.senai.saepveterinaria.enums.RoleUsuario;

public record UsuarioResponseDTO(

        Integer idUsuario,
        String nome,
        String email,
        RoleUsuario role,
        Boolean statusUsuario

) {
}
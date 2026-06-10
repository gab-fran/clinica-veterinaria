package br.senai.saepveterinaria.dto.usuario;

import br.senai.saepveterinaria.enums.RoleUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestDTO(

        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotBlank(message = "O email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        String senha,

        @NotNull(message = "A role é obrigatória")
        RoleUsuario role

) {
}
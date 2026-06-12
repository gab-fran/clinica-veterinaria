package br.senai.saepveterinaria.dto.auth;

public record LoginRequestDTO(
        String email,
        String senha
) {
}
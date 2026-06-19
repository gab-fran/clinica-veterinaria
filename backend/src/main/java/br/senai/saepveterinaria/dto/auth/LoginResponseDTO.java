package br.senai.saepveterinaria.dto.auth;

public record LoginResponseDTO(
        String token,
        String type
) {}
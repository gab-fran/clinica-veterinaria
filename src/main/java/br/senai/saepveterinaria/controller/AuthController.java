package br.senai.saepveterinaria.controller;

import br.senai.saepveterinaria.dto.auth.LoginRequestDTO;
import br.senai.saepveterinaria.dto.auth.LoginResponseDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioRequestDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {
             return ResponseEntity.ok(new LoginResponseDTO(
                authService.login(dto),
                "Bearer"
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponseDTO> register(@RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.ok(authService.registrar(dto));
    }
}
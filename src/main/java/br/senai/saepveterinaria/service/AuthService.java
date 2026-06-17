package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.auth.LoginRequestDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioCreateDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.entity.Usuario;
import br.senai.saepveterinaria.enums.RoleUsuario;
import br.senai.saepveterinaria.exception.BusinessException;
import br.senai.saepveterinaria.mapper.UsuarioMapper;
import br.senai.saepveterinaria.repository.UsuarioRepository;
import br.senai.saepveterinaria.security.JwtService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public UsuarioResponseDTO registrar(UsuarioCreateDTO dto) {

        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new BusinessException("Já existe um usuário com este email");
        }

        Usuario usuario = usuarioMapper.toEntity(dto);

        usuario.setSenha(passwordEncoder.encode(dto.senha()));

        usuario.setRole(RoleUsuario.FUNCIONARIO);

        return usuarioMapper.toResponse(
                usuarioRepository.save(usuario)
        );
    }

    public String login(LoginRequestDTO dto) {

        Usuario usuario = usuarioRepository.findByEmailAndStatusUsuarioTrue(dto.email())
                .orElseThrow(() -> new BadCredentialsException("Credenciais inválidas"));

        if (!passwordEncoder.matches(dto.senha(), usuario.getSenha())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }

        return jwtService.generateToken(usuario);
    }

}
package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.usuario.AlterarSenhaDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioCreateDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioUpdateDTO;
import br.senai.saepveterinaria.entity.Usuario;
import br.senai.saepveterinaria.enums.RoleUsuario;
import br.senai.saepveterinaria.exception.BusinessException;
import br.senai.saepveterinaria.exception.ResourceNotFoundException;
import br.senai.saepveterinaria.mapper.UsuarioMapper;
import br.senai.saepveterinaria.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;
    private final PasswordEncoder passwordEncoder;

    public Page<UsuarioResponseDTO> listarTodos(Pageable pageable) {
        return usuarioRepository.findByStatusUsuarioTrue(pageable)
                .map(usuarioMapper::toResponse);
    }

    public UsuarioResponseDTO listarPorEmail(String email) {
        return usuarioMapper.toResponse(buscarUsuarioAtivo(email));
    }

    public UsuarioResponseDTO listarPorId(Integer id) {
        return usuarioMapper.toResponse(buscarUsuarioAtivo(id));
    }

    @Transactional
    public UsuarioResponseDTO cadastrarAdmin(
            UsuarioCreateDTO dto) {

        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new BusinessException("Já existe um usuário com este email");
        }

        Usuario usuario = usuarioMapper.toEntity(dto);

        usuario.setSenha(passwordEncoder.encode(dto.senha()));

        usuario.setRole(RoleUsuario.ADMINISTRADOR);

        return usuarioMapper.toResponse(
                usuarioRepository.save(usuario)
        );
    }

    @Transactional
    public UsuarioResponseDTO atualizar(Integer id, UsuarioUpdateDTO dto) {
        Usuario usuario = buscarUsuarioAtivo(id);

        usuarioMapper.updateEntity(dto, usuario);

        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Transactional
    public void alterarSenha(Integer id, AlterarSenhaDTO dto) {
        Usuario usuario = buscarUsuarioAtivo(id);

        if (!passwordEncoder.matches(dto.senhaAtual(), usuario.getSenha())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }

        usuario.setSenha(passwordEncoder.encode(dto.novaSenha()));
    }

    @Transactional
    public void remover(Integer id) {
        Usuario usuario = buscarUsuarioAtivo(id);
        usuario.setStatusUsuario(false);
    }

    private Usuario buscarUsuarioAtivo(Integer id) {
        return usuarioRepository.findByIdUsuarioAndStatusUsuarioTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuário não encontrado com ID: " + id));
    }

    private Usuario buscarUsuarioAtivo(String email) {
        return usuarioRepository.findByEmailAndStatusUsuarioTrue(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuário não encontrado com email: " + email));
    }
}

package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.usuario.UsuarioRequestDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.entity.Usuario;
import br.senai.saepveterinaria.exception.ResourceNotFoundException;
import br.senai.saepveterinaria.mapper.UsuarioMapper;
import br.senai.saepveterinaria.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findByStatusUsuarioTrue()
                .stream()
                .map(usuarioMapper::toResponse)
                .toList();
    }

    public UsuarioResponseDTO listarPorEmail(String email) {
        return usuarioMapper.toResponse(buscarUsuarioAtivo(email));
    }

    public UsuarioResponseDTO listarPorId(Integer id) {
        return usuarioMapper.toResponse(buscarUsuarioAtivo(id));
    }

    @Transactional
    public UsuarioResponseDTO cadastrar(UsuarioRequestDTO dto) {
        Usuario usuario = usuarioMapper.toEntity(dto);
        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Transactional
    public UsuarioResponseDTO atualizar(Integer id, UsuarioRequestDTO dto) {
        Usuario usuario = buscarUsuarioAtivo(id);

        usuarioMapper.updateEntity(dto, usuario);

        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
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

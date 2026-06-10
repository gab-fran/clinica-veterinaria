package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.produto.ProdutoResumoDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.mapper.UsuarioMapper;
import br.senai.saepveterinaria.repository.UsuarioRepository;
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
    
}

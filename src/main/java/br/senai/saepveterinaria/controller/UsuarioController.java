package br.senai.saepveterinaria.controller;

import br.senai.saepveterinaria.dto.produto.ProdutoRequestDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResponseDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioRequestDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;

import br.senai.saepveterinaria.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioResponseDTO>> buscarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.listarPorId(id));
    }

    @GetMapping("/listar/email/{email}")
    public ResponseEntity<UsuarioResponseDTO> buscarPorEmail(@PathVariable String email) {
        return ResponseEntity.ok(usuarioService.listarPorEmail(email));
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@RequestBody @Valid UsuarioRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.cadastrarAdmin(dto));
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<UsuarioResponseDTO> atualizar(@PathVariable Integer id, @RequestBody UsuarioRequestDTO dto) {
        return ResponseEntity.ok(usuarioService.atualizar(id, dto));
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<String> remover(@PathVariable Integer id) {
        usuarioService.remover(id);
        return ResponseEntity.ok("Usuário removido com sucesso!");
    }

}

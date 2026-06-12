package br.senai.saepveterinaria.controller;


import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoRequestDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResponseDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResumoDTO;
import br.senai.saepveterinaria.service.MovimentacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimentacao")
@RequiredArgsConstructor
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    @GetMapping("/listar")
    public ResponseEntity<List<MovimentacaoResumoDTO>> buscarTodos() {
        return ResponseEntity.ok(movimentacaoService.listarTodos());
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<MovimentacaoResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(movimentacaoService.listarPorId(id));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<MovimentacaoResponseDTO> cadastrar(@RequestBody @Valid MovimentacaoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(movimentacaoService.cadastrar(dto));
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<MovimentacaoResponseDTO> atualizar(@PathVariable Integer id, @RequestBody MovimentacaoRequestDTO dto) {
        return ResponseEntity.ok(movimentacaoService.atualizar(id, dto));
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<String> remover(@PathVariable Integer id) {
        movimentacaoService.remover(id);
        return ResponseEntity.ok("Movimentação removida com sucesso!");
    }
}
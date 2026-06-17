package br.senai.saepveterinaria.controller;

import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoCreateDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoUpdateDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResponseDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResumoDTO;
import br.senai.saepveterinaria.service.MovimentacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movimentacoes")
@RequiredArgsConstructor
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    @GetMapping
    public ResponseEntity<Page<MovimentacaoResumoDTO>> buscarTodos(Pageable pageable) {
        return ResponseEntity.ok(movimentacaoService.listarTodos(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovimentacaoResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(movimentacaoService.listarPorId(id));
    }

    @PostMapping
    public ResponseEntity<MovimentacaoResponseDTO> cadastrar(@RequestBody @Valid MovimentacaoCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(movimentacaoService.cadastrar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovimentacaoResponseDTO> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid MovimentacaoUpdateDTO dto
    ) {
        return ResponseEntity.ok(movimentacaoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        movimentacaoService.remover(id);
        return ResponseEntity.noContent().build();
    }
}

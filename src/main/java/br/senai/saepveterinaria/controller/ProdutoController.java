package br.senai.saepveterinaria.controller;


import br.senai.saepveterinaria.entity.Produto;
import br.senai.saepveterinaria.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @GetMapping("/listar")
    public List<Produto> listar() {
        return null;
    }

    @GetMapping("/listar/{id}")
    public Produto buscarPorId(@PathVariable Integer id) {
        return produtoService.listarPorId(id);
    }

}
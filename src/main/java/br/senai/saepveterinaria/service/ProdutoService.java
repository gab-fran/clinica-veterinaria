package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.produto.ProdutoRequestDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResponseDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResumoDTO;
import br.senai.saepveterinaria.entity.Produto;
import br.senai.saepveterinaria.exception.ResourceNotFoundException;
import br.senai.saepveterinaria.mapper.ProdutoMapper;
import br.senai.saepveterinaria.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ProdutoMapper produtoMapper;

    public List<ProdutoResumoDTO> listarTodos() {
        return produtoRepository.findByStatusProdutoTrue()
                .stream()
                .map(produtoMapper::toResumo)
                .toList();
    }

    public ProdutoResponseDTO listarPorId(Integer id) {
        return produtoMapper.toResponse(buscarProdutoAtivo(id));
    }
    
    @Transactional
    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        Produto produto = produtoMapper.toEntity(dto);
        return produtoMapper.toResponse(produtoRepository.save(produto));
    }

    @Transactional
    public ProdutoResponseDTO atualizar(Integer id, ProdutoRequestDTO dto) {
        Produto produto = buscarProdutoAtivo(id);

        produtoMapper.updateEntity(dto, produto);

        return produtoMapper.toResponse(produtoRepository.save(produto));
    }

    @Transactional
    public void remover(Integer id) {
        Produto produto = buscarProdutoAtivo(id);
        produto.setStatusProduto(false);
    }

    private Produto buscarProdutoAtivo(Integer id) {
        return produtoRepository.findByIdProdutoAndStatusProdutoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Produto não encontrado com ID: " + id));
    }
}
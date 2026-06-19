package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.produto.ProdutoCreateDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResponseDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoUpdateDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResumoDTO;
import br.senai.saepveterinaria.entity.Produto;
import br.senai.saepveterinaria.exception.ResourceNotFoundException;
import br.senai.saepveterinaria.mapper.ProdutoMapper;
import br.senai.saepveterinaria.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ProdutoMapper produtoMapper;

    public Page<ProdutoResumoDTO> listarTodos(Pageable pageable) {
        return produtoRepository.findByStatusProdutoTrue(pageable)
                .map(produtoMapper::toResumo);
    }

    public ProdutoResponseDTO listarPorId(Integer id) {
        return produtoMapper.toResponse(buscarProdutoAtivo(id));
    }
    
    @Transactional
    public ProdutoResponseDTO cadastrar(ProdutoCreateDTO dto) {
        Produto produto = produtoMapper.toEntity(dto);
        return produtoMapper.toResponse(produtoRepository.save(produto));
    }

    @Transactional
    public ProdutoResponseDTO atualizar(Integer id, ProdutoUpdateDTO dto) {
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
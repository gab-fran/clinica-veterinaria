package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.produto.ProdutoRequestDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResponseDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResumoDTO;
import br.senai.saepveterinaria.entity.Produto;
import br.senai.saepveterinaria.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public List<ProdutoResumoDTO> listarTodos() {
        return produtoRepository.findByStatusProdutoTrue().stream().map(this::converterParaResumoDTO).toList();
    }

    public ProdutoResponseDTO listarPorId(Integer id) {
        return null;
    }


    private Produto converterParaEntidade(ProdutoRequestDTO dto) {
        return Produto.builder()
                .nome(dto.getNome())
                .marca(dto.getMarca())
                .tipo(dto.getTipo())
                .quantidadeEstoque(dto.getQuantidadeEstoque())
                .estoqueMinimo(dto.getEstoqueMinimo())
                .validade(dto.getValidade())
                .pesoKg(dto.getPesoKg())
                .dosagem(dto.getDosagem())
                .unidadeMedida(dto.getUnidadeMedida())
                .build();
    }

    private ProdutoResponseDTO converterParaDTO(Produto produto) {
        return ProdutoResponseDTO.builder()
                .idProduto(produto.getIdProduto())
                .nome(produto.getNome())
                .marca(produto.getMarca())
                .tipo(produto.getTipo())
                .quantidadeEstoque(produto.getQuantidadeEstoque())
                .estoqueMinimo(produto.getEstoqueMinimo())
                .validade(produto.getValidade())
                .pesoKg(produto.getPesoKg())
                .dosagem(produto.getDosagem())
                .unidadeMedida(produto.getUnidadeMedida())
                .build();
    }

    private ProdutoResumoDTO converterParaResumoDTO(Produto produto) {
        return ProdutoResumoDTO.builder()
                .idProduto(produto.getIdProduto())
                .nome(produto.getNome())
                .marca(produto.getMarca())
                .quantidadeEstoque(produto.getQuantidadeEstoque())
                .build();
    }
}
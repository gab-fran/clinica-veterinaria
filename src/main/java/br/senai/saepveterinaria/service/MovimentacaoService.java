package br.senai.saepveterinaria.service;

import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoCreateDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResponseDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResumoDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoUpdateDTO;
import br.senai.saepveterinaria.entity.MovimentacaoEstoque;
import br.senai.saepveterinaria.entity.Produto;
import br.senai.saepveterinaria.entity.Usuario;
import br.senai.saepveterinaria.enums.TipoMovimentacao;
import br.senai.saepveterinaria.exception.BusinessException;
import br.senai.saepveterinaria.exception.ResourceNotFoundException;
import br.senai.saepveterinaria.mapper.MovimentacaoMapper;
import br.senai.saepveterinaria.repository.MovimentacaoRepository;
import br.senai.saepveterinaria.repository.ProdutoRepository;
import br.senai.saepveterinaria.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final MovimentacaoMapper movimentacaoMapper;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public Page<MovimentacaoResumoDTO> listarTodos(Pageable pageable) {
        return movimentacaoRepository.findByStatusMovimentacaoTrue(pageable)
                .map(movimentacaoMapper::toResumo);
    }

    public MovimentacaoResponseDTO listarPorId(Integer id) {
        return movimentacaoMapper.toResponse(buscarMovimentacaoAtiva(id));
    }

    @Transactional
    public MovimentacaoResponseDTO cadastrar(MovimentacaoCreateDTO dto) {

        MovimentacaoEstoque movimentacao = movimentacaoMapper.toEntity(dto);

        Produto produto = produtoRepository.findAtivoForUpdate(dto.idProduto())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Produto não encontrado com o id: " + dto.idProduto()));

        Usuario usuario = usuarioRepository.findByIdUsuarioAndStatusUsuarioTrue(dto.idUsuario())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuário não encontrado com o id: " + dto.idUsuario()));

        atualizarEstoque(produto, dto.tipoMovimentacao(), dto.quantidade());

        movimentacao.setProduto(produto);
        movimentacao.setUsuario(usuario);

        movimentacao = movimentacaoRepository.save(movimentacao);

        return movimentacaoMapper.toResponse(movimentacao);
    }

    @Transactional
    public MovimentacaoResponseDTO atualizar(Integer id, MovimentacaoUpdateDTO dto) {

        MovimentacaoEstoque movimentacao = buscarMovimentacaoAtiva(id);

        Produto produtoAntigo = produtoRepository.findAtivoForUpdate(
                        movimentacao.getProduto().getIdProduto())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Produto não encontrado com o id: "
                                + movimentacao.getProduto().getIdProduto()));

        // Desfaz a movimentação antiga
        reverterMovimentacao(
                produtoAntigo,
                movimentacao.getTipoMovimentacao(),
                movimentacao.getQuantidade()
        );

        Produto produtoNovo = produtoRepository.findAtivoForUpdate(dto.idProduto())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Produto não encontrado com o id: " + dto.idProduto()));

        Usuario usuario = usuarioRepository.findByIdUsuarioAndStatusUsuarioTrue(dto.idUsuario())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuário não encontrado com o id: " + dto.idUsuario()));

        // Aplica a nova movimentação
        atualizarEstoque(
                produtoNovo,
                dto.tipoMovimentacao(),
                dto.quantidade()
        );

        movimentacaoMapper.updateEntity(dto, movimentacao);

        movimentacao.setProduto(produtoNovo);
        movimentacao.setUsuario(usuario);

        movimentacao = movimentacaoRepository.save(movimentacao);

        return movimentacaoMapper.toResponse(movimentacao);
    }

    @Transactional
    public void remover(Integer id) {
        MovimentacaoEstoque movimentacaoEstoque = buscarMovimentacaoAtiva(id);
        Produto produto = produtoRepository.findAtivoForUpdate(
                        movimentacaoEstoque.getProduto().getIdProduto())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Produto não encontrado com o id: "
                                + movimentacaoEstoque.getProduto().getIdProduto()));

        reverterMovimentacao(
                produto,
                movimentacaoEstoque.getTipoMovimentacao(),
                movimentacaoEstoque.getQuantidade()
        );

        movimentacaoEstoque.setStatusMovimentacao(false);
    }

    private MovimentacaoEstoque buscarMovimentacaoAtiva(Integer id) {
        return movimentacaoRepository.findByIdMovimentacaoEstoqueAndStatusMovimentacaoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Movimentação não encontrado com ID: " + id));
    }

    private void atualizarEstoque(Produto produto,
                                  TipoMovimentacao tipo,
                                  Integer quantidade) {

        if (tipo == TipoMovimentacao.ENTRADA) {
            produto.setQuantidadeEstoque(
                    produto.getQuantidadeEstoque() + quantidade);
        }

        if (tipo == TipoMovimentacao.SAIDA) {

            if (produto.getQuantidadeEstoque() < quantidade) {
                throw new BusinessException(
                        "Quantidade insuficiente em estoque.");
            }

            produto.setQuantidadeEstoque(
                    produto.getQuantidadeEstoque() - quantidade);
        }

        produtoRepository.save(produto);
    }

    private void reverterMovimentacao(Produto produto,
                                      TipoMovimentacao tipo,
                                      Integer quantidade) {

        if (tipo == TipoMovimentacao.ENTRADA) {
            if (produto.getQuantidadeEstoque() < quantidade) {
                throw new BusinessException(
                        "Não é possível estornar a entrada: estoque atual insuficiente.");
            }

            produto.setQuantidadeEstoque(
                    produto.getQuantidadeEstoque() - quantidade);
        }

        if (tipo == TipoMovimentacao.SAIDA) {
            produto.setQuantidadeEstoque(
                    produto.getQuantidadeEstoque() + quantidade);
        }

        produtoRepository.save(produto);
    }
}
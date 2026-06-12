package br.senai.saepveterinaria.mapper;

import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoRequestDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResponseDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResumoDTO;
import br.senai.saepveterinaria.entity.MovimentacaoEstoque;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MovimentacaoMapper {

    @Mapping(target = "idMovimentacaoEstoque", ignore = true)
    @Mapping(target = "dataCriacaoMovimentacao", ignore = true)
    @Mapping(target = "dataAtualizacaoMovimentacao", ignore = true)
    @Mapping(target = "statusMovimentacao", ignore = true)
    @Mapping(target = "idProduto", ignore = true)
    @Mapping(target = "idUsuario", ignore = true)
    MovimentacaoEstoque toEntity(MovimentacaoRequestDTO dto);

    @Mapping(source = "idProduto.idProduto", target = "idProduto")
    @Mapping(source = "idProduto.nome", target = "nomeProduto")
    @Mapping(source = "idUsuario.idUsuario", target = "idUsuario")
    @Mapping(source = "idUsuario.nome", target = "nomeUsuario")
    MovimentacaoResponseDTO toResponse(MovimentacaoEstoque movimentacaoEstoque);

    @Mapping(source = "idProduto.nome", target = "nomeProduto")
    MovimentacaoResumoDTO toResumo(MovimentacaoEstoque movimentacaoEstoque);

    @Mapping(target = "idMovimentacaoEstoque", ignore = true)
    @Mapping(target = "dataCriacaoMovimentacao", ignore = true)
    @Mapping(target = "dataAtualizacaoMovimentacao", ignore = true)
    @Mapping(target = "statusMovimentacao", ignore = true)
    @Mapping(target = "idProduto", ignore = true)
    @Mapping(target = "idUsuario", ignore = true)
    void updateEntity(
            MovimentacaoRequestDTO dto,
            @MappingTarget MovimentacaoEstoque movimentacaoEstoque
    );

}
package br.senai.saepveterinaria.mapper;

import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoCreateDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResponseDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoResumoDTO;
import br.senai.saepveterinaria.dto.movimentacao.MovimentacaoUpdateDTO;
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
    @Mapping(target = "produto", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    MovimentacaoEstoque toEntity(MovimentacaoCreateDTO dto);

    @Mapping(source = "produto.idProduto", target = "idProduto")
    @Mapping(source = "produto.nome", target = "nomeProduto")
    @Mapping(source = "usuario.idUsuario", target = "idUsuario")
    @Mapping(source = "usuario.nome", target = "nomeUsuario")
    MovimentacaoResponseDTO toResponse(MovimentacaoEstoque movimentacaoEstoque);

    @Mapping(source = "produto.nome", target = "nomeProduto")
    @Mapping(source = "dataCriacaoMovimentacao", target = "dataMovimentacao")
    MovimentacaoResumoDTO toResumo(MovimentacaoEstoque movimentacaoEstoque);

    @Mapping(target = "idMovimentacaoEstoque", ignore = true)
    @Mapping(target = "dataCriacaoMovimentacao", ignore = true)
    @Mapping(target = "dataAtualizacaoMovimentacao", ignore = true)
    @Mapping(target = "statusMovimentacao", ignore = true)
    @Mapping(target = "produto", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    void updateEntity(
            MovimentacaoUpdateDTO dto,
            @MappingTarget MovimentacaoEstoque movimentacaoEstoque
    );
}

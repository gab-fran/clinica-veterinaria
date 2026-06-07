package br.senai.saepveterinaria.mapper;

import br.senai.saepveterinaria.dto.produto.ProdutoRequestDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResponseDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResumoDTO;
import br.senai.saepveterinaria.entity.Produto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    @Mapping(target = "idProduto", ignore = true)
    @Mapping(target = "statusProduto", ignore = true)
    Produto toEntity(ProdutoRequestDTO dto);

    ProdutoResponseDTO toResponse(Produto produto);

    ProdutoResumoDTO toResumo(Produto produto);

    @Mapping(target = "statusProduto", ignore = true)
    void updateEntity(ProdutoRequestDTO dto, @MappingTarget Produto produto);
}
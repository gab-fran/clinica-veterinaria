package br.senai.saepveterinaria.mapper;

import br.senai.saepveterinaria.dto.produto.ProdutoCreateDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResponseDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoUpdateDTO;
import br.senai.saepveterinaria.dto.produto.ProdutoResumoDTO;
import br.senai.saepveterinaria.entity.Produto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    @Mapping(target = "idProduto", ignore = true)
    @Mapping(target = "statusProduto", ignore = true)
    @Mapping(target = "version", ignore = true)
    Produto toEntity(ProdutoCreateDTO dto);

    ProdutoResponseDTO toResponse(Produto produto);

    ProdutoResumoDTO toResumo(Produto produto);

    @Mapping(target = "statusProduto", ignore = true)
    @Mapping(target = "version", ignore = true)
    void updateEntity(ProdutoUpdateDTO dto, @MappingTarget Produto produto);
}
package br.senai.saepveterinaria.mapper;

import br.senai.saepveterinaria.dto.produto.ProdutoRequestDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioRequestDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.entity.Produto;
import br.senai.saepveterinaria.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "statusUsuario", ignore = true)
    Usuario toEntity(UsuarioRequestDTO dto);

    UsuarioResponseDTO toResponse(Usuario usuario);

    @Mapping(target = "statusUsuario", ignore = true)
    void updateEntity(UsuarioRequestDTO dto, @MappingTarget Usuario usuario);
}

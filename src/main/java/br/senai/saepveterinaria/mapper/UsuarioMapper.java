package br.senai.saepveterinaria.mapper;

import br.senai.saepveterinaria.dto.usuario.UsuarioCreateDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioResponseDTO;
import br.senai.saepveterinaria.dto.usuario.UsuarioUpdateDTO;
import br.senai.saepveterinaria.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    @Mapping(target = "idUsuario", ignore = true)
    @Mapping(target = "statusUsuario", ignore = true)
    Usuario toEntity(UsuarioCreateDTO dto);

    UsuarioResponseDTO toResponse(Usuario usuario);

    @Mapping(target = "senha", ignore = true)
    @Mapping(target = "statusUsuario", ignore = true)
    void updateEntity(UsuarioUpdateDTO dto, @MappingTarget Usuario usuario);
}

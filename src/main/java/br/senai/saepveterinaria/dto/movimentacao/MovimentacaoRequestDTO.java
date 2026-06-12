package br.senai.saepveterinaria.dto.movimentacao;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MovimentacaoRequestDTO(

        @NotNull
        Integer idProduto,

        @NotNull
        Integer idUsuario,

        @NotNull
        TipoMovimentacao tipoMovimentacao,

        @NotNull
        @Min(1)
        Integer quantidade

) {
}
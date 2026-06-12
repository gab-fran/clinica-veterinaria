package br.senai.saepveterinaria.dto.movimentacao;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MovimentacaoRequestDTO(

        @NotNull(message = "O id do produto é obrigatório")
        Integer idProduto,

        @NotNull(message = "O id do usuário é obrigatório")
        Integer idUsuario,

        @NotNull(message = "O tipo de movimentação é obrigatório")
        TipoMovimentacao tipoMovimentacao,

        @NotNull
        @Min(value = 1, message = "A quantidade deve ser maior que zero")
        Integer quantidade

) {
}
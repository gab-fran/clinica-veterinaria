package br.senai.saepveterinaria.dto.movimentacao;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record MovimentacaoCreateDTO(
        @NotNull(message = "O id do produto é obrigatório")
        @Positive(message = "O id do produto deve ser positivo")
        Integer idProduto,

        @NotNull(message = "O id do usuário é obrigatório")
        @Positive(message = "O id do usuário deve ser positivo")
        Integer idUsuario,

        @NotNull(message = "O tipo de movimentação é obrigatório")
        TipoMovimentacao tipoMovimentacao,

        @NotNull(message = "A quantidade é obrigatória")
        @Min(value = 1, message = "A quantidade deve ser maior que zero")
        Integer quantidade
) {
}

package br.senai.saepveterinaria.dto.produto;

import br.senai.saepveterinaria.enums.TipoProduto;
import br.senai.saepveterinaria.enums.UnidadeMedida;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ProdutoCreateDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotBlank(message = "A marca é obrigatória")
        String marca,

        @NotNull(message = "O tipo é obrigatório")
        TipoProduto tipo,

        @NotNull(message = "A quantidade em estoque é obrigatória")
        @Min(value = 0, message = "A quantidade não pode ser negativa")
        Integer quantidadeEstoque,

        @NotNull(message = "O estoque mínimo é obrigatório")
        @Min(value = 0, message = "O estoque mínimo não pode ser negativo")
        Integer estoqueMinimo,

        @FutureOrPresent(message = "A validade não pode estar no passado")
        LocalDate validade,

        @DecimalMin(value = "0.0", inclusive = false, message = "O peso deve ser maior que zero")
        BigDecimal pesoKg,

        @DecimalMin(value = "0.0", inclusive = false, message = "A dosagem deve ser maior que zero")
        BigDecimal dosagem,

        UnidadeMedida unidadeMedida
) {
}

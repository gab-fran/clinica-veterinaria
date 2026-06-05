package br.senai.saepveterinaria.dto.produto;

import br.senai.saepveterinaria.enums.TipoProduto;
import br.senai.saepveterinaria.enums.UnidadeMedida;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ProdutoRequestDTO {

    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @NotBlank(message = "A marca é obrigatória")
    private String marca;

    @NotNull(message = "O tipo é obrigatório")
    private TipoProduto tipo;

    @NotNull(message = "A quantidade em estoque é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa")
    private Integer quantidadeEstoque;

    @NotNull(message = "O estoque mínimo é obrigatório")
    @Min(value = 0, message = "O estoque mínimo não pode ser negativo")
    private Integer estoqueMinimo;

    private LocalDate validade;

    private Double pesoKg;

    private Double dosagem;

    private UnidadeMedida unidadeMedida;
}
package br.senai.saepveterinaria.dto.produto;

import br.senai.saepveterinaria.enums.TipoProduto;
import br.senai.saepveterinaria.enums.UnidadeMedida;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ProdutoResponseDTO {

    private Integer idProduto;
    private String nome;
    private String marca;
    private TipoProduto tipo;
    private Integer quantidadeEstoque;
    private Integer estoqueMinimo;
    private LocalDate validade;
    private Double pesoKg;
    private Double dosagem;
    private UnidadeMedida unidadeMedida;
}
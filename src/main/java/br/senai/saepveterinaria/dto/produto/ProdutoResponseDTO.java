package br.senai.saepveterinaria.dto.produto;

import br.senai.saepveterinaria.enums.TipoProduto;
import br.senai.saepveterinaria.enums.UnidadeMedida;

import java.time.LocalDate;

public record ProdutoResponseDTO(

        Integer idProduto,
        String nome,
        String marca,
        TipoProduto tipo,
        Integer quantidadeEstoque,
        Integer estoqueMinimo,
        LocalDate validade,
        Double pesoKg,
        Double dosagem,
        UnidadeMedida unidadeMedida

) {
}
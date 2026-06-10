package br.senai.saepveterinaria.dto.produto;

import br.senai.saepveterinaria.enums.TipoProduto;

public record ProdutoResumoDTO(

        Integer idProduto,
        String nome,
        String marca,
        TipoProduto tipo,
        Integer quantidadeEstoque

) {
}
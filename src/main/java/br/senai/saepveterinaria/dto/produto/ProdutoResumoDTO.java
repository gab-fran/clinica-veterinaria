package br.senai.saepveterinaria.dto.produto;

import br.senai.saepveterinaria.enums.TipoProduto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoResumoDTO {

    private Integer idProduto;
    private String nome;
    private String marca;
    private TipoProduto tipo;
    private Integer quantidadeEstoque;
}
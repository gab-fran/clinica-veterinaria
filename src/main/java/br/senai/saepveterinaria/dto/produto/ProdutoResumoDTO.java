package br.senai.saepveterinaria.dto.produto;

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
    private Integer quantidadeEstoque;
}
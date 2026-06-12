package br.senai.saepveterinaria.dto.movimentacao;

import br.senai.saepveterinaria.enums.TipoMovimentacao;

import java.time.LocalDate;

public record MovimentacaoResumoDTO(
        Integer idMovimentacaoEstoque,
        String nomeProduto,
        TipoMovimentacao tipoMovimentacao,
        Integer quantidade,
        LocalDate dataMovimentacao
) {
}

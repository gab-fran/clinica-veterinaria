package br.senai.saepveterinaria.dto.movimentacao;

import br.senai.saepveterinaria.enums.TipoMovimentacao;

import java.time.LocalDateTime;

public record MovimentacaoResumoDTO(
        Integer idMovimentacaoEstoque,
        String nomeProduto,
        TipoMovimentacao tipoMovimentacao,
        Integer quantidade,
        LocalDateTime dataMovimentacao
) {
}

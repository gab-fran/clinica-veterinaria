package br.senai.saepveterinaria.dto.movimentacao;

import br.senai.saepveterinaria.enums.TipoMovimentacao;
import java.time.LocalDateTime;

public record MovimentacaoResponseDTO(

        Integer idMovimentacaoEstoque,
        Integer idProduto,
        String nomeProduto,
        Integer idUsuario,
        String nomeUsuario,
        TipoMovimentacao tipoMovimentacao,
        Integer quantidade,
        LocalDateTime dataCriacaoMovimentacao,
        LocalDateTime dataAtualizacaoMovimentacao,
        Boolean statusMovimentacao

) {
}
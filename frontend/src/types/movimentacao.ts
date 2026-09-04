export interface MovimentacaoCreateDTO {
    idProduto: number;
    idUsuario: number;
    tipoMovimentacao: string;
    quantidade: number;
}

export interface MovimentacaoResponseDTO {
    idMovimentacaoEstoque: number;
    idProduto: number;
    nomeProduto: string;
    idUsuario: number;
    nomeUsuario: string;
    tipoMovimentacao: string;
    quantidade: number;
    dataCriacaoMovimentacao: string;
    dataAtualizacaoMovimentacao: string;
    statusMovimentacao: boolean;
}

export interface MovimentacaoResumoDTO {
    idMovimentacaoEstoque: number;
    nomeProduto: string;
    tipoMovimentacao: string;
    quantidade: number;
    dataMovimentacao: string;
}


export interface MovimentacaoUpdateDTO {
    idProduto: number;
    idUsuario: number;
    tipoMovimentacao: string;
    quantidade: number;
}

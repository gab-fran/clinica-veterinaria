export interface ProdutoCreateDTO {
    nome: string;
    marca: string;
    tipo: string;
    quantidadeEstoque: number;
    estoqueMinimo: number;
    validade: string;
    pesoKg?: number;
    dosagem?: number;
    unidadeMedida: string;
}

export interface ProdutoResponseDTO {
    idProduto: number;
    nome: string;
    marca: string;
    tipo: string;
    quantidadeEstoque: number;
    estoqueMinimo: number;
    validade: string;
    pesoKg?: number;
    dosagem?: number;
    unidadeMedida: string;
}

export interface ProdutoResumoDTO {
    idProduto: number;
    nome: string;
    marca: string;
    tipo: string;
    quantidadeEstoque: number;
    estoqueMinimo: number;
}

export interface ProdutoUpdateDTO {
    nome: string;
    marca: string;
    tipo: string;
    quantidadeEstoque: number;
    estoqueMinimo: number;
    validade: string;
    pesoKg?: number;
    dosagem?: number;
    unidadeMedida: string;
}

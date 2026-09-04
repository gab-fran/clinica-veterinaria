export interface AlterarSenhaDTO {
    senhaAtual: string;
    novaSenha: string;
}

export interface UsuarioCreateDTO {
    nome: string;
    email: string;
    senha: string;
    role: string;
}

export interface UsuarioResponseDTO {
    idUsuario: number;
    nome: string;
    email: string;
    role: string;
    statusUsuario: boolean;
}

export interface UsuarioUpdateDTO {
    nome: string;
    email: string;
    role: string;
}

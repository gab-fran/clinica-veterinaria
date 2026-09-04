import type { ListColumn } from "../components/DynamicList/DynamicList";
import type { UsuarioResponseDTO } from "../types/usuario";
import { z } from 'zod';
import { RoleUsuario } from '../enums/roleUsuario';

export const usuarioListColumns: ListColumn<UsuarioResponseDTO>[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Cargo' },
];

export const usuarioUpdateSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um e-mail válido.'),
    role: z.enum([RoleUsuario.ADMINISTRADOR, RoleUsuario.FUNCIONARIO], {
        required_error: 'O cargo é obrigatório.',
        invalid_type_error: 'Selecione um cargo válido.',
    }),
});

export const usuarioCreateSchema = usuarioUpdateSchema.extend({
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    role: z.enum([RoleUsuario.ADMINISTRADOR, RoleUsuario.FUNCIONARIO], {
        required_error: 'O cargo é obrigatório.',
        invalid_type_error: 'Selecione um cargo válido.',
    }),
});

export const usuarioSenhaSchema = z.object({
    senhaAtual: z.string().min(1, 'A senha atual é obrigatória.'),
    novaSenha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'), 
});

export type UsuarioSenhaFormData = z.infer<typeof usuarioSenhaSchema>;
export type UsuarioUpdateFormData = z.infer<typeof usuarioUpdateSchema>;
export type UsuarioCreateFormData = z.infer<typeof usuarioCreateSchema>;
import type { ListColumn } from "../components/DynamicList/DynamicList";
import type { UsuarioResponseDTO } from "../types/usuario";
import { z } from 'zod';

export const usuarioListColumns: ListColumn<UsuarioResponseDTO>[] = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Cargo' },
];

export const usuarioUpdateSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().min(1, 'O e-mail é obrigatório.').email('Informe um e-mail válido.'),
});

export const usuarioCreateSchema = usuarioUpdateSchema.extend({
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

export type UsuarioUpdateFormData = z.infer<typeof usuarioUpdateSchema>;
export type UsuarioCreateFormData = z.infer<typeof usuarioCreateSchema>;
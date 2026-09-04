import { z } from 'zod';
import type { FieldConfig } from '../components/DynamicForm/DynamicForm';

export const loginSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').max(255, 'E-mail deve ter no máximo 255 caracteres').email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginFields: FieldConfig<LoginFormData>[] = [
    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com', required: true, maxLength: 255 },
    { name: 'password', label: 'Senha', type: 'password', placeholder: '••••••••', required: true, maxLength: 255 },
];